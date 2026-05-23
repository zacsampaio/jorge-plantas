export const CHECKOUT_PATH = "/checkout";

export function buildAuthRedirectUrl(returnPath: string = CHECKOUT_PATH): string {
  return `/auth?redirect=${encodeURIComponent(returnPath)}`;
}
