import { Package, ShoppingCart, Timer, Cactus, ArrowRight } from "phosphor-react";
import {
  HeaderHomeContainer,
  HeaderHomeItems,
  HeaderHomeTitles,
  HeroActions,
  HeroBadge,
  HeroHighlight,
  HeroPrimaryButton,
  HeroSecondaryButton,
  HeroSection,
  HeroTagline,
  ItemCart,
  ItemCoffee,
  ItemPackage,
  ItemTimer,
} from "./styled";

export function HeaderHome() {
  return (
    <HeroSection>
      <HeaderHomeContainer>
        <HeaderHomeTitles>
          <HeroBadge>Floricultura em Fortaleza · CE</HeroBadge>
          <HeroTagline>Plante histórias. Colha bem-estar.</HeroTagline>
          <h1>
            Encontre as plantas perfeitas para{" "}
            <HeroHighlight>renovar o seu ambiente!</HeroHighlight>
          </h1>
          <p>
            No Jorge Plantas, cada planta é cultivada com carinho e dedicação para
            chegar até você saudável e vibrante. Mais de 20 anos levando natureza
            para casas, eventos e jardins na região metropolitana.
          </p>
          <HeroActions>
            <HeroPrimaryButton to="/produtos">
              Ver catálogo
              <ArrowRight size={18} weight="bold" />
            </HeroPrimaryButton>
            <HeroSecondaryButton to="/sobre-nos">
              Nossa história
            </HeroSecondaryButton>
          </HeroActions>
          <HeaderHomeItems>
          <span>
            <ItemCart>
              <ShoppingCart size={16} weight="fill" />
            </ItemCart>{" "}
            Compra fácil e segura
          </span>
          <span>
            <ItemPackage>
              {" "}
              <Package size={16} weight="fill" />
            </ItemPackage>
            Embalagens que preservam a qualidade das plantas
          </span>
          <span>
            <ItemTimer>
              <Timer size={16} weight="fill" />
            </ItemTimer>
            Entrega rápida e com total cuidado
          </span>
          <span>
            <ItemCoffee>
              <Cactus size={16} weight="fill" />
            </ItemCoffee>
            Plantas sempre frescas e bem cuidadas para você
          </span>
        </HeaderHomeItems>
        </HeaderHomeTitles>
        <img src="/assets/plants-header.png" alt="Plantas decorativas Jorge Plantas" />
      </HeaderHomeContainer>
    </HeroSection>
  );
}
