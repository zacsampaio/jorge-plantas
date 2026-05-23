export type ProductStatus = "active" | "inactive";

export interface ProductsType {
  id: number;
  tags?: string[];
  name: string;
  description?: string;
  price: number;
  quantity: number;
  bestSeller?: boolean;
  status?: ProductStatus;
  /** Caminho no bucket Supabase `products` */
  imagePath?: string | null;
  /** URL pública resolvida (Supabase Storage ou fallback local) */
  imageUrl?: string;
}

export interface CartState {
  readonly products: ProductsType[];
}
