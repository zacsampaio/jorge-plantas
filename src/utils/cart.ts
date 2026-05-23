import type { ProductsType } from "../redux/cart/types";

export function getCartItemCount(products: ProductsType[]): number {
  return products.reduce((acc, product) => acc + product.quantity, 0);
}

export function getCartSubtotal(products: ProductsType[]): number {
  return products
    .filter((product) => product.quantity > 0)
    .reduce((acc, product) => acc + product.price * product.quantity, 0);
}
