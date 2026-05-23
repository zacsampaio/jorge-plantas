import { ShoppingCart } from "phosphor-react";
import { CartButtonContainer, CartContainer } from "./styled";
import { RootState } from "../../redux/rootReducer";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { ProductsType } from "../../redux/cart/types";
import { useCheckoutNavigation } from "../../hooks/useCheckoutNavigation";

export interface CartProps {
  $color: string;
  $background: string;
  showBadge?: boolean;
}

export function Cart({ $color, $background, showBadge }: CartProps) {
  const { goToCheckout } = useCheckoutNavigation();
  const { products } = useSelector((state: RootState) => state.cart);

  const productCount = useMemo(() => {
    return products.reduce(
      (acc: number, curr: ProductsType) => acc + curr.quantity,
      0
    );
  }, [products]);

  return (
    <CartContainer>
      <CartButtonContainer
        type="button"
        $color={$color}
        $background={$background}
        title="Ir para o checkout"
        onClick={() => goToCheckout()}
      >
        <ShoppingCart size={20} weight="fill" />
      </CartButtonContainer>
      {showBadge && productCount > 0 && (
        <span>{productCount}</span>
      )}
    </CartContainer>
  );
}
