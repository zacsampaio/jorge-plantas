import { useDispatch, useSelector } from "react-redux";
import {
  CountButtonComponents,
  CountButtonQuantity,
  CountQuantity,
} from "./styled";
import { RootState } from "../../redux/rootReducer";
import { ProductsType } from "../../redux/cart/types";
import { decreaseProduct, increaseProduct } from "../../redux/cart/slice";

interface CountButtonProps {
  product: ProductsType;
}

export function CountButton({ product }: CountButtonProps) {
  const dispatch = useDispatch()
  const productInCart = useSelector((state: RootState) => 
    state.cart.products.find((p) => p.id === product.id))


  function handleAddProductToCart(e: React.MouseEvent){
    e.preventDefault();
    dispatch(increaseProduct(product))
  }

  function handleDecreaseProduct(e: React.MouseEvent){
    e.preventDefault();
    dispatch(decreaseProduct(product))
  }


  return (
    <CountButtonComponents>
      <CountButtonQuantity onClick={handleDecreaseProduct}>-</CountButtonQuantity>
      <CountQuantity>{productInCart?.quantity ?? 0}</CountQuantity>
      <CountButtonQuantity onClick={handleAddProductToCart}>+</CountButtonQuantity>
    </CountButtonComponents>
  );
}
