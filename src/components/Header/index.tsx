import { NavLink } from "react-router-dom";
import logoImg from "/assets/logo-jorge-plantas.png";
import {
  LocationAndCart,
  NavContainer,
  NavLinks,
  NavMenuLink,
} from "./styled";
import { Cart } from "../cartCatalog";
import { AuthButton } from "../auth/AuthButton";

export function Header() {
  return (
    <NavContainer>
      <NavLink to="/" title="Jorge Plantas">
        <img src={logoImg} height={"40"} alt="Jorge Plantas" />
      </NavLink>
      <NavLinks>
        <NavMenuLink to="/produtos">Produtos</NavMenuLink>
        <NavMenuLink to="/sobre-nos">Sobre nós</NavMenuLink>
      </NavLinks>
      <LocationAndCart>
        <AuthButton />
        <Cart $color="yellow-500" $background="yellow-100" showBadge={true} />
      </LocationAndCart>
    </NavContainer>
  );
}
