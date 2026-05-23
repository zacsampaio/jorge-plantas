import type { ProductsType } from "../redux/cart/types";
import {
  getActiveCatalogProducts,
  getCatalogProducts,
  useCatalogStore,
} from "../stores/catalogStore";

/** @deprecated Use useCatalogStore — mantido para compatibilidade durante migração */
export const products: ProductsType[] = [];

export function getBestSellerProducts(): ProductsType[] {
  return getActiveCatalogProducts().filter((product) => product.bestSeller);
}

export function getProductsByIds(ids: number[]): ProductsType[] {
  const catalog = getCatalogProducts();
  return ids
    .map((id) => catalog.find((product) => product.id === id))
    .filter((product): product is ProductsType => product !== undefined);
}

export function getProductsByTag(tag: string, limit = 4): ProductsType[] {
  return filterProductsByTag(tag).slice(0, limit);
}

export function getProductsByTagExcluding(
  tag: string,
  excludeIds: number[],
  limit = 4
): ProductsType[] {
  const excluded = new Set(excludeIds);
  return filterProductsByTag(tag)
    .filter((product) => !excluded.has(product.id))
    .slice(0, limit);
}

export function getAllProductTags(): string[] {
  const tags = getActiveCatalogProducts().flatMap(
    (product) => product.tags ?? []
  );
  return [...new Set(tags)].sort((a, b) => a.localeCompare(b, "pt-BR"));
}

export function filterProductsByTag(tag: string | null): ProductsType[] {
  const active = getActiveCatalogProducts();
  if (!tag) return active;
  return active.filter((product) => product.tags?.includes(tag));
}

export function useCatalogProducts() {
  const products = useCatalogStore((state) => state.products);
  const isLoading = useCatalogStore((state) => state.isLoading);
  const fetchProducts = useCatalogStore((state) => state.fetchProducts);
  return { products: products.filter((p) => p.status !== "inactive"), isLoading, fetchProducts };
}
