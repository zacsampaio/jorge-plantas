import type { CatalogProduct, CatalogProductInput } from "../../types/catalog";
import type { ProductStatus } from "../../redux/cart/types";
import {
  createProductInDb,
  deleteProductInDb,
  fetchProductsFromDb,
  fetchProductsPaginatedFromDb,
  getProductByIdFromDb,
  updateProductInDb,
  updateProductStatusInDb,
} from "./productDbService";
import type { PaginatedResult, PaginationParams } from "../../types/pagination";
import {
  deleteProductImage,
  uploadProductImage,
} from "../storage/productImageService";

export async function fetchCatalogProducts(): Promise<CatalogProduct[]> {
  return fetchProductsFromDb();
}

export async function fetchCatalogProductsPaginated(
  params: PaginationParams & { tag?: string | null; status?: ProductStatus } = {}
): Promise<PaginatedResult<CatalogProduct>> {
  return fetchProductsPaginatedFromDb(params);
}

export async function getCatalogProductById(
  id: number
): Promise<CatalogProduct | null> {
  return getProductByIdFromDb(id);
}

export async function createCatalogProduct(
  input: CatalogProductInput,
  imageFile?: File | null
): Promise<{ product: CatalogProduct | null; error: string | null }> {
  const { product, error } = await createProductInDb(input);
  if (error || !product) return { product: null, error };

  if (!imageFile) return { product, error: null };

  const upload = await uploadProductImage(product.id, imageFile);
  if (upload.error || !upload.path) {
    return { product, error: upload.error };
  }

  return updateCatalogProduct(product.id, { ...input, imagePath: upload.path });
}

export async function updateCatalogProduct(
  id: number,
  input: CatalogProductInput,
  imageFile?: File | null
): Promise<{ product: CatalogProduct | null; error: string | null }> {
  let imagePath = input.imagePath;

  if (imageFile) {
    const upload = await uploadProductImage(id, imageFile);
    if (upload.error) {
      return { product: null, error: upload.error };
    }
    imagePath = upload.path;
  }

  return updateProductInDb(id, { ...input, imagePath });
}

export async function updateCatalogProductStatus(
  id: number,
  status: ProductStatus
): Promise<{ error: string | null }> {
  return updateProductStatusInDb(id, status);
}

export async function removeCatalogProduct(
  id: number,
  imagePath?: string | null
): Promise<{ error: string | null }> {
  if (imagePath) {
    await deleteProductImage(imagePath);
  }
  return deleteProductInDb(id);
}
