import { getSupabaseClient } from "../../lib/supabase/client";
import type {
  CatalogProduct,
  CatalogProductInput,
  ProductRow,
} from "../../types/catalog";
import type { PaginatedResult, PaginationParams } from "../../types/pagination";
import type { ProductStatus } from "../../redux/cart/types";
import {
  buildPaginatedResult,
  emptyPaginatedResult,
  normalizePagination,
} from "../../utils/pagination";

function mapRowToProduct(row: ProductRow): CatalogProduct {
  const imagePath = row.image_path;
  return {
    id: row.id,
    name: row.name,
    description: row.description ?? undefined,
    price: Number(row.price),
    tags: row.tags ?? undefined,
    bestSeller: row.best_seller,
    status: row.status,
    imagePath,
    quantity: 0,
  };
}

function mapInputToRow(input: CatalogProductInput) {
  return {
    name: input.name,
    description: input.description ?? null,
    price: input.price,
    tags: input.tags ?? [],
    best_seller: input.bestSeller ?? false,
    status: input.status ?? "active",
    image_path: input.imagePath ?? null,
    updated_at: new Date().toISOString(),
  };
}

export async function fetchProductsPaginatedFromDb(
  params: PaginationParams & { tag?: string | null; status?: ProductStatus } = {}
): Promise<PaginatedResult<CatalogProduct>> {
  const { page, pageSize, from, to } = normalizePagination(params);
  const supabase = getSupabaseClient();
  if (!supabase) return emptyPaginatedResult(page, pageSize);

  let query = supabase
    .from("products")
    .select("*", { count: "exact" })
    .order("id", { ascending: true });

  if (params.status) {
    query = query.eq("status", params.status);
  }

  if (params.tag) {
    query = query.contains("tags", [params.tag]);
  }

  const { data, error, count } = await query.range(from, to);

  if (error || !data) {
    console.error("Erro ao buscar produtos paginados:", error?.message);
    return emptyPaginatedResult(page, pageSize);
  }

  return buildPaginatedResult(
    (data as ProductRow[]).map(mapRowToProduct),
    count ?? 0,
    page,
    pageSize
  );
}

export async function fetchProductsFromDb(): Promise<CatalogProduct[]> {
  const supabase = getSupabaseClient();
  if (!supabase) return [];

  const { data, error } = await supabase
    .from("products")
    .select("*")
    .order("id", { ascending: true });

  if (error || !data) {
    console.error("Erro ao buscar produtos:", error?.message);
    return [];
  }

  return (data as ProductRow[]).map(mapRowToProduct);
}

export async function createProductInDb(
  input: CatalogProductInput
): Promise<{ product: CatalogProduct | null; error: string | null }> {
  const supabase = getSupabaseClient();
  if (!supabase) {
    return { product: null, error: "Supabase não configurado." };
  }

  const { data, error } = await supabase
    .from("products")
    .insert(mapInputToRow(input))
    .select("*")
    .single();

  if (error || !data) {
    return { product: null, error: error?.message ?? "Erro ao criar produto." };
  }

  return { product: mapRowToProduct(data as ProductRow), error: null };
}

export async function updateProductInDb(
  id: number,
  input: CatalogProductInput
): Promise<{ product: CatalogProduct | null; error: string | null }> {
  const supabase = getSupabaseClient();
  if (!supabase) {
    return { product: null, error: "Supabase não configurado." };
  }

  const { data, error } = await supabase
    .from("products")
    .update(mapInputToRow(input))
    .eq("id", id)
    .select("*")
    .single();

  if (error || !data) {
    return {
      product: null,
      error: error?.message ?? "Erro ao atualizar produto.",
    };
  }

  return { product: mapRowToProduct(data as ProductRow), error: null };
}

export async function updateProductStatusInDb(
  id: number,
  status: ProductStatus
): Promise<{ error: string | null }> {
  const supabase = getSupabaseClient();
  if (!supabase) {
    return { error: "Supabase não configurado." };
  }

  const { error } = await supabase
    .from("products")
    .update({ status, updated_at: new Date().toISOString() })
    .eq("id", id);

  return { error: error?.message ?? null };
}

export async function deleteProductInDb(
  id: number
): Promise<{ error: string | null }> {
  const supabase = getSupabaseClient();
  if (!supabase) {
    return { error: "Supabase não configurado." };
  }

  const { error } = await supabase.from("products").delete().eq("id", id);

  return { error: error?.message ?? null };
}

export async function getProductByIdFromDb(
  id: number
): Promise<CatalogProduct | null> {
  const supabase = getSupabaseClient();
  if (!supabase) return null;

  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("id", id)
    .maybeSingle();

  if (error || !data) return null;
  return mapRowToProduct(data as ProductRow);
}
