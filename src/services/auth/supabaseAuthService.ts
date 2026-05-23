import type { AuthResult, RegisterInput, Session } from "../../types/auth";
import { getSupabaseClient, isSupabaseConfigured } from "../../lib/supabase/client";
import type { IAuthService } from "./types";
import {
  buildSessionFromAuthUser,
  mapSupabaseAuthError,
} from "./authMappers";

const NOT_CONFIGURED_MESSAGE =
  "Autenticação não configurada. Verifique VITE_SUPABASE_URL e VITE_SUPABASE_ANON_KEY no .env.";

function notConfiguredResult(): AuthResult {
  return {
    session: null,
    error: {
      code: "AUTH_NOT_CONFIGURED",
      message: NOT_CONFIGURED_MESSAGE,
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
      return { session: null, error: mapSupabaseAuthError(error) };
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
      return { session: null, error: mapSupabaseAuthError(error) };
    }

    const authUser = authData.user;
    const authSession = authData.session;
    const userId = authSession?.user?.id ?? authUser?.id;

    // Conta criada no Auth — sessão só vem após confirmar e-mail (comportamento normal)
    if (userId && !authSession) {
      return {
        session: null,
        error: null,
        pendingEmailConfirmation: true,
      };
    }

    if (!userId) {
      return {
        session: null,
        error: {
          code: "VALIDATION_ERROR",
          message:
            "Este e-mail pode já estar cadastrado. Tente entrar ou use outro e-mail.",
        },
      };
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
    const supabase = getSupabaseClient();
    if (!supabase) return;
    await supabase.auth.signOut();
  },

  async getSession(): Promise<Session | null> {
    const supabase = getSupabaseClient();
    if (!supabase || !isSupabaseConfigured()) return null;

    const { data, error } = await supabase.auth.getSession();
    if (error || !data.session?.user) return null;

    return buildSessionFromAuthUser(
      data.session.user.id,
      data.session.access_token
    );
  },

  onAuthStateChange(callback: (session: Session | null) => void): () => void {
    const supabase = getSupabaseClient();
    if (!supabase) return () => {};

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (_event, authSession) => {
      if (!authSession?.user) {
        callback(null);
        return;
      }

      const session = await buildSessionFromAuthUser(
        authSession.user.id,
        authSession.access_token
      );
      callback(session);
    });

    return () => subscription.unsubscribe();
  },
};
