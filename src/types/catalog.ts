import type { ProductStatus, ProductsType } from "../redux/cart/types";

export type { ProductsType as CatalogProduct, ProductStatus };

export interface CatalogProductInput {
  name: string;
  description?: string;
  price: number;
  tags?: string[];
  bestSeller?: boolean;
  status?: ProductStatus;
  imagePath?: string | null;
}

export interface ProductRow {
  id: number;
  name: string;
  description: string | null;
  price: number;
  tags: string[] | null;
  best_seller: boolean;
  status: ProductStatus;
  image_path: string | null;
  created_at: string;
  updated_at: string;
}
