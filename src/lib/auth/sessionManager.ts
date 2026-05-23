import { getSupabaseClient, resetSupabaseClient } from "../supabase/client";
import { useAuthStore } from "../../stores/authStore";
import { toast } from "../../stores/toastStore";

const SESSION_EXPIRED_MESSAGE =
  "Sua sessão expirou. Faça login novamente.";

let isHandlingExpiration = false;
let manualSignOut = false;

export function markManualSignOut() {
  manualSignOut = true;
}

export function consumeManualSignOut(): boolean {
  const value = manualSignOut;
  manualSignOut = false;
  return value;
}

function isAuthenticatedInStore(): boolean {
  return useAuthStore.getState().status === "authenticated";
}

export function clearAuthState() {
  useAuthStore.setState({
    session: null,
    status: "unauthenticated",
    error: null,
  });
}

export function isAuthErrorPayload(body: unknown): boolean {
  if (!body || typeof body !== "object") return false;

  const record = body as { message?: string; code?: string; error?: string };
  const message = `${record.message ?? ""} ${record.error ?? ""}`.toLowerCase();
  const code = String(record.code ?? "").toUpperCase();

  return (
    code === "PGRST301" ||
    message.includes("jwt") ||
    message.includes("expired") ||
    message.includes("invalid claim") ||
    message.includes("not authenticated")
  );
}

/** Só valida expiração local — rápido, não trava o bootstrap do site */
export async function purgeStaleSupabaseAuthLocal(): Promise<void> {
  const supabase = getSupabaseClient();
  if (!supabase) return;

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) return;

  const expiresAtMs = session.expires_at ? session.expires_at * 1000 : 0;
  const isExpired = expiresAtMs > 0 && expiresAtMs <= Date.now();

  if (isExpired) {
    await supabase.auth.signOut({ scope: "local" });
    resetSupabaseClient();
  }
}

export async function purgeStaleSupabaseAuth(): Promise<void> {
  await purgeStaleSupabaseAuthLocal();

  const supabase = getSupabaseClient();
  if (!supabase) return;

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) return;

  const { error } = await supabase.auth.getUser();
  if (error) {
    await supabase.auth.signOut({ scope: "local" });
    resetSupabaseClient();
  }
}

export async function recoverStaleAuthAndResetClient(
  error: { message?: string; code?: string } | null
): Promise<boolean> {
  if (!error || !isAuthErrorPayload(error)) return false;

  const supabase = getSupabaseClient();
  await supabase?.auth.signOut({ scope: "local" });
  resetSupabaseClient();
  return true;
}

/** @deprecated use purgeStaleSupabaseAuth */
export async function purgeOrphanSupabaseSession(): Promise<void> {
  await purgeStaleSupabaseAuth();
}

export async function handleSessionExpired(): Promise<void> {
  if (isHandlingExpiration || consumeManualSignOut()) {
    clearAuthState();
    return;
  }

  isHandlingExpiration = true;

  try {
    const supabase = getSupabaseClient();
    await supabase?.auth.signOut({ scope: "local" });
    clearAuthState();

    toast.error(SESSION_EXPIRED_MESSAGE);

    const redirectPath = `${window.location.pathname}${window.location.search}`;
    if (!window.location.pathname.startsWith("/auth")) {
      window.location.assign(
        `/auth?redirect=${encodeURIComponent(redirectPath)}`
      );
    }
  } finally {
    window.setTimeout(() => {
      isHandlingExpiration = false;
    }, 800);
  }
}

export async function ensureActiveSession(): Promise<boolean> {
  if (!isAuthenticatedInStore()) return true;

  const supabase = getSupabaseClient();
  if (!supabase) return true;

  const {
    data: { session },
    error,
  } = await supabase.auth.getSession();

  if (error || !session) {
    await handleSessionExpired();
    return false;
  }

  const expiresAtMs = session.expires_at ? session.expires_at * 1000 : 0;
  const expiresSoon =
    expiresAtMs > 0 && expiresAtMs - Date.now() < 60_000;

  if (!expiresSoon) return true;

  const { data, error: refreshError } = await supabase.auth.refreshSession();

  if (refreshError || !data.session) {
    await handleSessionExpired();
    return false;
  }

  return true;
}

export async function forceSignOut(options?: {
  manual?: boolean;
  showToast?: boolean;
}): Promise<void> {
  if (options?.manual) {
    markManualSignOut();
  }

  const supabase = getSupabaseClient();

  if (supabase) {
    await supabase.auth.signOut({ scope: "global" });
  }

  clearAuthState();

  if (options?.manual && options.showToast !== false) {
    toast.info("Você saiu da sua conta.");
  }
}
