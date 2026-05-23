import { useHasRole } from "../hooks/useHasRole";
import type { UserRole } from "../types/auth";

interface RoleGuardProps {
  role: UserRole | UserRole[];
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

/**
 * Role no front é apenas UX.
 * Autorização real deve vir do Supabase JWT + RLS.
 */
export function RoleGuard({ role, children, fallback = null }: RoleGuardProps) {
  const hasRole = useHasRole(role);
  return hasRole ? <>{children}</> : <>{fallback}</>;
}
