import { MapPin } from "phosphor-react";
import { NavLink } from "react-router-dom";
import logoImg from "/assets/logo-jorge-plantas.png";
import {
  Localization,
  LocationAndCart,
  NavContainer,
  NavLinks,
  NavMenuLink,
} from "./styled";
import { Cart } from "../cartCatalog";

export function Header() {
  return (
    <NavContainer>
      <NavLink to="/" title="Jorge Plantas">
        <img src={logoImg} height={"40"} />
      </NavLink>
      <NavLinks>
        <NavMenuLink to="/produtos">Produtos</NavMenuLink>
        <NavMenuLink to="/sobre-nos">Sobre nós</NavMenuLink>
      </NavLinks>
      <LocationAndCart>
        <Localization> <MapPin size={'1.25rem'} weight="fill" /> Fortaleza, CE</Localization>
        <Cart $color='yellow-500' $background='yellow-100' showBadge={true}/>
      </LocationAndCart>
    </NavContainer>
  );
}
