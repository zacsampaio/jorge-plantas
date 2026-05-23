import { useNavigate } from "react-router-dom";
import { UserDropdown } from "../UserDropdown";
import { useAuth } from "../../../hooks/useAuth";
import { AuthButton as AuthButtonStyled } from "./styled";

export function AuthButton() {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  if (isAuthenticated) {
    return <UserDropdown />;
  }

  return (
    <AuthButtonStyled
      type="button"
      onClick={() => navigate("/auth")}
    >
      <span className="auth-label-full">Entrar / Criar conta</span>
      <span className="auth-label-short">Entrar</span>
    </AuthButtonStyled>
  );
}
