import { Navigate, Outlet } from "react-router-dom";
const logoImg = "/assets/logo-jorge-plantas.png";
import { useAuth } from "../../hooks/useAuth";
import {
  AuthCard,
  AuthLayoutContainer,
  AuthLogo,
  BackLink,
} from "./styled";

export function AuthLayout() {
  const { isAuthenticated } = useAuth();

  if (isAuthenticated) {
    return <Navigate to="/account/orders" replace />;
  }

  return (
    <AuthLayoutContainer>
      <AuthCard>
        <AuthLogo src={logoImg} alt="Jorge Plantas" />
        <Outlet />
        <BackLink href="/">← Voltar ao site</BackLink>
      </AuthCard>
    </AuthLayoutContainer>
  );
}
