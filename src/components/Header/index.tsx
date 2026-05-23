import { useState } from "react";
import { List, X } from "phosphor-react";
const logoImg = "/assets/logo-jorge-plantas.png";
import {
  LogoLink,
  MenuToggleButton,
  NavActions,
  NavContainer,
  NavLinks,
  NavMenuLink,
  NavTopRow,
} from "./styled";
import { CartDropdown } from "../CartDropdown";
import { AuthButton } from "../auth/AuthButton";
import { ErrorBoundary } from "../ui/ErrorBoundary";

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  function closeMenu() {
    setMenuOpen(false);
  }

  return (
    <NavContainer>
      <NavTopRow>
        <LogoLink to="/" title="Jorge Plantas" onClick={closeMenu}>
          <img src={logoImg} alt="Jorge Plantas" />
        </LogoLink>

        <NavLinks $open={menuOpen}>
          <NavMenuLink to="/produtos" onClick={closeMenu}>
            Produtos
          </NavMenuLink>
          <NavMenuLink to="/sobre-nos" onClick={closeMenu}>
            Sobre nós
          </NavMenuLink>
        </NavLinks>

        <NavActions>
          <AuthButton />
          <ErrorBoundary>
            <CartDropdown $color="yellow-500" $background="yellow-100" />
          </ErrorBoundary>
          <MenuToggleButton
            type="button"
            aria-expanded={menuOpen}
            aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
            onClick={() => setMenuOpen((prev) => !prev)}
          >
            {menuOpen ? <X size={20} weight="bold" /> : <List size={20} weight="bold" />}
          </MenuToggleButton>
        </NavActions>
      </NavTopRow>
    </NavContainer>
  );
}
