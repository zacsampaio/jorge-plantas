import { Navigate, Outlet, useLocation } from "react-router-dom";
import styled from "styled-components";
import { useAuth } from "../hooks/useAuth";
import { useAuthStore } from "../stores/authStore";
import { PASSWORD_RESET_PATH } from "../utils/authRedirect";
import type { UserRole } from "../types/auth";

interface ProtectedRouteProps {
  allowedRoles?: UserRole[];
}

const LoadingContainer = styled.div`
  padding: 3rem;
  text-align: center;
  font-family: "Roboto", sans-serif;
  color: ${(props) => props.theme["gray-600"]};
`;

export function ProtectedRoute({ allowedRoles }: ProtectedRouteProps) {
  const { isAuthenticated, role } = useAuth();
  const authStatus = useAuthStore((state) => state.status);
  const recoveryMode = useAuthStore((state) => state.recoveryMode);
  const location = useLocation();

  if (authStatus === "loading") {
    return <LoadingContainer>Carregando...</LoadingContainer>;
  }

  // A sessão criada pelo link de recuperação não dá acesso a nada além da
  // própria troca de senha.
  if (recoveryMode) {
    return <Navigate to={PASSWORD_RESET_PATH} replace />;
  }

  if (!isAuthenticated) {
    const redirect = encodeURIComponent(location.pathname + location.search);
    return <Navigate to={`/auth?redirect=${redirect}`} replace />;
  }

  if (allowedRoles && role && !allowedRoles.includes(role)) {
    return <Navigate to="/account/orders" replace />;
  }

  return <Outlet />;
}
