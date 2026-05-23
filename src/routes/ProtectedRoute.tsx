import { Navigate, Outlet, useLocation } from "react-router-dom";
import styled from "styled-components";
import { useAuth } from "../hooks/useAuth";
import { useAuthStore } from "../stores/authStore";
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
  const location = useLocation();

  if (authStatus === "loading") {
    return <LoadingContainer>Carregando...</LoadingContainer>;
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
