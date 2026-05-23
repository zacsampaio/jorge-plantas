import { useAuth } from "./useAuth";
import type { UserRole } from "../types/auth";

/**
 * Role no front é apenas UX.
 * Autorização real deve vir do Supabase JWT + RLS.
 */
export function useHasRole(requiredRole: UserRole | UserRole[]): boolean {
  const { role } = useAuth();

  if (!role) return false;

  const roles = Array.isArray(requiredRole) ? requiredRole : [requiredRole];
  return roles.includes(role);
}
