import type { AuthChangeEvent, Session as SupabaseSession, SupabaseClient } from "@supabase/supabase-js";
import {
  consumeManualSignOut,
  clearAuthState,
  handleSessionExpired,
} from "../auth/sessionManager";
import { buildSessionFromAuthUser } from "../../services/auth/authMappers";
import { useAuthStore } from "../../stores/authStore";

/**
 * Trata o evento FORA do callback do supabase-js.
 *
 * O supabase-js invoca o callback de onAuthStateChange segurando um lock
 * interno de auth. Qualquer chamada ao Supabase feita de dentro dele — aqui,
 * a consulta a profiles, que precisa do access token — fica esperando esse
 * mesmo lock, que só é liberado quando o callback termina. O resultado é um
 * impasse: o callback espera a consulta, a consulta espera o callback, e
 * daí em diante toda chamada auth.* (getSession, updateUser, signIn) fica
 * pendurada para sempre.
 *
 * Adiar com setTimeout tira o trabalho da seção travada: quando ele roda, o
 * callback já retornou e o lock já foi liberado.
 */
async function handleAuthEvent(
  event: AuthChangeEvent,
  authSession: SupabaseSession | null
) {
  if (event === "SIGNED_OUT") {
    if (consumeManualSignOut()) {
      clearAuthState();
      return;
    }

    const wasAuthenticated = useAuthStore.getState().status === "authenticated";

    if (wasAuthenticated) {
      await handleSessionExpired();
    } else {
      clearAuthState();
    }
    return;
  }

  if (
    event === "SIGNED_IN" ||
    event === "TOKEN_REFRESHED" ||
    event === "USER_UPDATED"
  ) {
    if (!authSession?.user) return;

    const session = await buildSessionFromAuthUser(
      authSession.user.id,
      authSession.access_token
    );

    // Durante a recuperação de senha a sessão existe, mas não vale como
    // login: quem manda é a flag, não o evento.
    if (useAuthStore.getState().recoveryMode) return;

    useAuthStore.setState({
      session,
      status: session ? "authenticated" : "unauthenticated",
    });
  }
}

export function setupSupabaseAuthListener(client: SupabaseClient): () => void {
  const {
    data: { subscription },
  } = client.auth.onAuthStateChange((event, authSession) => {
    // O link do e-mail cria uma sessão válida ao abrir o app. Ela é marcada
    // como recuperação para que o app inteiro fique bloqueado até a troca
    // da senha — caso contrário o link seria, por si só, um login.
    // setState é síncrono e local, então pode rodar aqui dentro.
    if (event === "PASSWORD_RECOVERY") {
      useAuthStore.setState({ recoveryMode: true });
      return;
    }

    window.setTimeout(() => {
      void handleAuthEvent(event, authSession);
    }, 0);
  });

  return () => subscription.unsubscribe();
}
