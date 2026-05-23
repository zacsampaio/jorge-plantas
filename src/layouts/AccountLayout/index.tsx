import { Outlet } from "react-router-dom";
import {
  AccountContent,
  AccountLayoutContainer,
  AccountNavLink,
  AccountSidebar,
} from "./styled";

export function AccountLayout() {
  return (
    <AccountLayoutContainer>
      <AccountSidebar aria-label="Navegação da conta">
        <AccountNavLink to="/account/orders">Meus Pedidos</AccountNavLink>
        <AccountNavLink to="/account/profile">Meu Perfil</AccountNavLink>
      </AccountSidebar>
      <AccountContent>
        <Outlet />
      </AccountContent>
    </AccountLayoutContainer>
  );
}
