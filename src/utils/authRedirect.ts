import type { UserRole } from "../types/auth";

export const CHECKOUT_PATH = "/checkout";

/** Destino do link enviado por e-mail. Precisa estar na allowlist de
 * Redirect URLs do Supabase, senão o link não funciona. */
export const PASSWORD_RESET_PATH = "/auth/nova-senha";
export const FORGOT_PASSWORD_PATH = "/auth/esqueci-senha";

export function buildAuthRedirectUrl(returnPath: string = CHECKOUT_PATH): string {
  return `/auth?redirect=${encodeURIComponent(returnPath)}`;
}

/**
 * Para onde mandar alguém que acabou de entrar e não tinha destino definido.
 * Um destino explícito (o parâmetro `redirect`) sempre vence este padrão:
 * quem foi parar no login vindo do checkout volta para o checkout, mesmo
 * sendo admin.
 */
export function defaultRouteForRole(role: UserRole | null | undefined): string {
  return role === "admin" ? "/admin" : "/account/orders";
}
