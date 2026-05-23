export interface ProductsType {
  id: number;
  tags?: string[];
  name: string;
  description?: string;
  price: number;
  quantity: number;
  bestSeller?: boolean;
}

export interface CartState {
  readonly products: ProductsType[];
}
