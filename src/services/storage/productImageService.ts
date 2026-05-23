import { getSupabaseClient } from "../../lib/supabase/client";

const PRODUCTS_BUCKET = "products";

export function getProductImagePublicUrl(imagePath: string): string | undefined {
  const supabase = getSupabaseClient();
  if (!supabase) return undefined;

  const { data } = supabase.storage.from(PRODUCTS_BUCKET).getPublicUrl(imagePath);
  return data.publicUrl;
}

export function getLocalProductImageSrc(name: string): string {
  return `/assets/plants/${encodeURIComponent(name)}.jpg`;
}

export function getProductImageSrc(product: {
  name: string;
  imagePath?: string | null;
  imageUrl?: string;
}): string {
  if (product.imagePath) {
    const url = getProductImagePublicUrl(product.imagePath);
    if (url) return url;
  }
  return getLocalProductImageSrc(product.name);
}

export function sanitizeStorageFileName(fileName: string): string {
  return fileName
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^\w\s.\-()]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

export function buildProductImagePath(productId: number, fileName: string): string {
  const safeName = sanitizeStorageFileName(fileName);
  return `${productId}/${safeName}`;
}

export async function uploadProductImage(
  productId: number,
  file: File
): Promise<{ path: string | null; error: string | null }> {
  const supabase = getSupabaseClient();
  if (!supabase) {
    return { path: null, error: "Supabase não configurado." };
  }

  const path = buildProductImagePath(productId, file.name);

  const { error } = await supabase.storage
    .from(PRODUCTS_BUCKET)
    .upload(path, file, {
      upsert: true,
      contentType: file.type,
    });

  if (error) {
    return { path: null, error: error.message };
  }

  return { path, error: null };
}

export async function deleteProductImage(
  imagePath: string
): Promise<{ error: string | null }> {
  const supabase = getSupabaseClient();
  if (!supabase) {
    return { error: "Supabase não configurado." };
  }

  const { error } = await supabase.storage
    .from(PRODUCTS_BUCKET)
    .remove([imagePath]);

  return { error: error?.message ?? null };
}
