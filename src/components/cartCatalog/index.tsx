import { ShoppingCart } from "phosphor-react";
import { NavLink } from "react-router-dom";
import { CartButtonContainer, CartContainer } from "./styled";
import { RootState } from "../../redux/rootReducer";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { ProductsType } from "../../redux/cart/types";

export interface CartProps {
  $color: string;
  $background: string;
  showBadge?: boolean;
}

export function Cart({ $color, $background, showBadge }: CartProps) {
  const { products } = useSelector((state: RootState) => state.cart);

  const productCount = useMemo(() => {
    return products.reduce(
      (acc: number, curr: ProductsType) => acc + curr.quantity,
      0
    );
  }, [products]);

  return (
    <CartContainer>
      <NavLink to="/checkout" title="Checkout">
        <CartButtonContainer $color={$color} $background={$background}>
          <ShoppingCart size={20} weight="fill" />
        </CartButtonContainer>
        {showBadge && productCount > 0 && 
          (<span>{productCount}</span>)}
      </NavLink>
    </CartContainer>
  );
}
