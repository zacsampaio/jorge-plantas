import type { AuthResult, RegisterInput, Session } from "../../types/auth";
import { getSupabaseClient, resetSupabaseClient } from "../../lib/supabase/client";
import {
  getSupabaseConfigDevHint,
  isSupabaseConfigured,
} from "../../lib/supabase/config";
import { forceSignOut } from "../../lib/auth/sessionManager";
import { PASSWORD_RESET_PATH } from "../../utils/authRedirect";
import type { IAuthService } from "./types";
import {
  buildSessionFromAuthUser,
  emailAlreadyRegisteredError,
  fetchProfileByUserId,
  mapSupabaseAuthError,
} from "./authMappers";

const LOGIN_UNAVAILABLE_MESSAGE =
  "Não foi possível conectar ao login agora. Tente novamente em instantes.";

function notConfiguredResult(): AuthResult {
  const devHint = getSupabaseConfigDevHint();
  if (import.meta.env.DEV && devHint) {
    console.error("[auth] Supabase:", devHint);
  }

  return {
    session: null,
    error: {
      code: "AUTH_NOT_CONFIGURED",
      message:
        import.meta.env.DEV && devHint
          ? devHint
          : LOGIN_UNAVAILABLE_MESSAGE,
    },
  };
}

export const supabaseAuthService: IAuthService = {
  async signIn(email: string, password: string): Promise<AuthResult> {
    const supabase = getSupabaseClient();
    if (!supabase || !isSupabaseConfigured()) {
      return notConfiguredResult();
    }

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      return { session: null, error: mapSupabaseAuthError(error, "signIn") };
    }

    if (!data.session?.user) {
      return {
        session: null,
        error: {
          code: "UNKNOWN",
          message: "Não foi possível iniciar a sessão.",
        },
      };
    }

    const session = await buildSessionFromAuthUser(
      data.session.user.id,
      data.session.access_token
    );

    if (!session) {
      return {
        session: null,
        error: {
          code: "UNKNOWN",
          message:
            "Perfil não encontrado. Verifique se a migration de profiles foi aplicada no Supabase.",
        },
      };
    }

    return { session, error: null };
  },

  async signUp(data: RegisterInput): Promise<AuthResult> {
    const supabase = getSupabaseClient();
    if (!supabase || !isSupabaseConfigured()) {
      return notConfiguredResult();
    }

    const { data: authData, error } = await supabase.auth.signUp({
      email: data.email,
      password: data.password,
      options: {
        data: {
          full_name: data.fullName,
          phone: data.phone,
        },
        emailRedirectTo: `${window.location.origin}/auth`,
      },
    });

    if (error) {
      return { session: null, error: mapSupabaseAuthError(error, "signUp") };
    }

    const authUser = authData.user;
    const authSession = authData.session;
    const userId = authSession?.user?.id ?? authUser?.id;

    // Supabase pode retornar 200 sem erro para e-mail já cadastrado (anti-enumeração)
    if (authUser?.identities?.length === 0) {
      return { session: null, error: emailAlreadyRegisteredError() };
    }

    // Conta criada no Auth — sessão só vem após confirmar e-mail (comportamento normal)
    if (userId && !authSession) {
      return {
        session: null,
        error: null,
        pendingEmailConfirmation: true,
      };
    }

    if (!userId) {
      return { session: null, error: emailAlreadyRegisteredError() };
    }

    const session = await buildSessionFromAuthUser(
      userId,
      authSession?.access_token,
      data
    );

    if (!session) {
      if (!authSession) {
        return {
          session: null,
          error: null,
          pendingEmailConfirmation: true,
        };
      }

      return {
        session: null,
        error: {
          code: "UNKNOWN",
          message:
            "Conta criada. Aguarde alguns segundos e tente entrar com seu e-mail e senha.",
        },
      };
    }

    return { session, error: null };
  },

  async signOut(): Promise<void> {
    await forceSignOut({ manual: true });
  },

  async requestPasswordReset(email: string) {
    const supabase = getSupabaseClient();
    if (!supabase || !isSupabaseConfigured()) {
      return { error: notConfiguredResult().error };
    }

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}${PASSWORD_RESET_PATH}`,
    });

    // Erro de e-mail inexistente ou de rate limit não sobe para a tela:
    // a resposta ao usuário é sempre a mesma, para não revelar quais
    // endereços possuem conta. Só falha de configuração é exibida.
    if (error) {
      const mapped = mapSupabaseAuthError(error, "requestPasswordReset");
      if (mapped.code === "AUTH_NOT_CONFIGURED") {
        return { error: mapped };
      }
    }

    return { error: null };
  },

  async updatePassword(password: string) {
    const supabase = getSupabaseClient();
    if (!supabase || !isSupabaseConfigured()) {
      return { error: notConfiguredResult().error };
    }

    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (!session) {
      return {
        error: {
          code: "VALIDATION_ERROR" as const,
          message:
            "Seu link de recuperação expirou ou já foi usado. Peça um novo para continuar.",
        },
      };
    }

    const { error } = await supabase.auth.updateUser({ password });

    if (error) {
      return { error: mapSupabaseAuthError(error, "updatePassword") };
    }

    return { error: null };
  },

  async getSession(): Promise<Session | null> {
    const supabase = getSupabaseClient();
    if (!supabase || !isSupabaseConfigured()) return null;

    const { data, error } = await supabase.auth.getSession();
    if (error || !data.session?.user) return null;

    const profile = await fetchProfileByUserId(data.session.user.id);

    if (!profile) {
      await supabase.auth.signOut({ scope: "local" });
      resetSupabaseClient();
      return null;
    }

    return {
      user: profile,
      accessToken: data.session.access_token,
    };
  },

  onAuthStateChange(callback: (session: Session | null) => void): () => void {
    const supabase = getSupabaseClient();
    if (!supabase) return () => {};

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, authSession) => {
      // Adiado pelo mesmo motivo do listener em lib/supabase/authListener.ts:
      // chamar o Supabase de dentro do callback trava o lock interno de auth.
      window.setTimeout(async () => {
        if (!authSession?.user) {
          callback(null);
          return;
        }

        const session = await buildSessionFromAuthUser(
          authSession.user.id,
          authSession.access_token
        );
        callback(session);
      }, 0);
    });

    return () => subscription.unsubscribe();
  },
};
