import { Navigate, Outlet, useLocation, useSearchParams } from "react-router-dom";
const logoImg = "/assets/logo-jorge-plantas.png";
import { useAuth } from "../../hooks/useAuth";
import { useAuthStore } from "../../stores/authStore";
import {
  CHECKOUT_PATH,
  defaultRouteForRole,
  PASSWORD_RESET_PATH,
} from "../../utils/authRedirect";
import {
  AuthCard,
  AuthLayoutContainer,
  AuthLogo,
  BackLink,
} from "./styled";

export function AuthLayout() {
  const { isAuthenticated, role } = useAuth();
  const recoveryMode = useAuthStore((state) => state.recoveryMode);
  const [searchParams] = useSearchParams();
  const location = useLocation();

  const redirect = searchParams.get("redirect");
  const returnPath = redirect ? decodeURIComponent(redirect) : null;
  const isResetPage = location.pathname === PASSWORD_RESET_PATH;
  const isAuthIndex = location.pathname === "/auth";

  // Em recuperação de senha existe sessão válida, mas ela só serve para
  // trocar a senha: o usuário fica preso nesta tela até concluir.
  if (recoveryMode && !isResetPage) {
    return <Navigate to={PASSWORD_RESET_PATH} replace />;
  }

  if (isAuthenticated && !recoveryMode) {
    return <Navigate to={returnPath ?? defaultRouteForRole(role)} replace />;
  }

  return (
    <AuthLayoutContainer>
      <AuthCard>
        <AuthLogo src={logoImg} alt="Jorge Plantas" />
        <Outlet />

        {!recoveryMode && (
          <BackLink to={isAuthIndex ? (returnPath ?? "/") : "/auth"}>
            {!isAuthIndex
              ? "← Voltar para o login"
              : returnPath === CHECKOUT_PATH
                ? "← Voltar ao checkout"
                : "← Voltar ao site"}
          </BackLink>
        )}
      </AuthCard>
    </AuthLayoutContainer>
  );
}
