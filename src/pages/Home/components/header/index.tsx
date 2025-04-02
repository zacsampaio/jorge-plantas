import { Package, ShoppingCart, Timer, Cactus } from "phosphor-react";
import plantsHeader from "../../../../../public/assets/plants-header.png";
import {
  HeaderHomeContainer,
  HeaderHomeItems,
  HeaderHomeTitles,
  ItemCart,
  ItemCoffee,
  ItemPackage,
  ItemTimer,
} from "./styled";

export function HeaderHome() {
  return (
    <HeaderHomeContainer>
      <HeaderHomeTitles>
        <h1>Encontre as plantas perfeitas</h1>
        <h1>para renovar o seu ambiente!</h1>
        <p>
          No Jorge Plantas, cada planta é cultivada com carinho e dedicação para
          chegar até você saudável e vibrante. Explore nosso catálogo e traga
          mais vida para sua casa, evento ou jardim!
        </p>
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
      <img src={plantsHeader} />
    </HeaderHomeContainer>
  );
}
