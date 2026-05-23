import type { SupabaseClient } from "@supabase/supabase-js";
import {
  consumeManualSignOut,
  clearAuthState,
  handleSessionExpired,
} from "../auth/sessionManager";
import { buildSessionFromAuthUser } from "../../services/auth/authMappers";
import { useAuthStore } from "../../stores/authStore";

export function setupSupabaseAuthListener(client: SupabaseClient): () => void {
  const {
    data: { subscription },
  } = client.auth.onAuthStateChange(async (event, authSession) => {
    if (event === "SIGNED_OUT") {
      if (consumeManualSignOut()) {
        clearAuthState();
        return;
      }

      const wasAuthenticated =
        useAuthStore.getState().status === "authenticated";

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

      useAuthStore.setState({
        session,
        status: session ? "authenticated" : "unauthenticated",
      });
    }
  });

  return () => subscription.unsubscribe();
}
