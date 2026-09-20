import { getSupabaseClient } from "../../lib/supabase/client";
import { publicRestGet } from "../../lib/supabase/publicRest";
import type {
  CatalogProduct,
  CatalogProductInput,
  ProductRow,
} from "../../types/catalog";
import type { PaginatedResult, PaginationParams } from "../../types/pagination";
import type { ProductStatus } from "../../redux/cart/types";
import {
  buildPaginatedResult,
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

function buildProductsQuery(
  params: { tag?: string | null; status?: ProductStatus } = {}
): string {
  const search = new URLSearchParams();
  search.set("select", "*");
  search.set("order", "id.asc");

  if (params.status) {
    search.set("status", `eq.${params.status}`);
  }

  if (params.tag) {
    search.set("tags", `cs.{${params.tag}}`);
  }

  return `products?${search.toString()}`;
}

export async function fetchProductsPaginatedFromDb(
  params: PaginationParams & { tag?: string | null; status?: ProductStatus } = {}
): Promise<PaginatedResult<CatalogProduct>> {
  const { page, pageSize, from, to } = normalizePagination(params);
  const query = buildProductsQuery(params);

  const { data, total, error } = await publicRestGet<ProductRow[]>(query, {
    prefer: "count=exact",
    range: { from, to },
  });

  if (error) {
    console.error("Erro ao buscar produtos paginados:", error);
    throw new Error(error);
  }

  const rows = Array.isArray(data) ? data : [];
  const count = total ?? rows.length;

  return buildPaginatedResult(
    rows.map(mapRowToProduct),
    count,
    page,
    pageSize
  );
}

export interface AdminProductFilters {
  tag?: string | null;
  status?: ProductStatus;
  search?: string;
  bestSeller?: boolean;
}

/**
 * Listagem do painel administrativo.
 *
 * Vai pelo cliente autenticado, e não por publicRestGet, de propósito: a
 * policy products_select_active só expõe produtos ativos para quem lê como
 * anônimo. O admin precisa enxergar também os inativos, e isso só acontece
 * quando a consulta carrega o JWT dele e cai na policy products_admin_all.
 */
export async function fetchAdminProductsPaginatedFromDb(
  params: PaginationParams & AdminProductFilters = {}
): Promise<PaginatedResult<CatalogProduct>> {
  const { page, pageSize, from, to } = normalizePagination(params);
  const supabase = getSupabaseClient();

  if (!supabase) {
    return buildPaginatedResult<CatalogProduct>([], 0, page, pageSize);
  }

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

  if (params.bestSeller) {
    query = query.eq("best_seller", true);
  }

  // Filtra no banco, e não na página carregada: filtrar no cliente olharia
  // só os 10 itens da página atual e daria resultado errado.
  const search = params.search?.trim();
  if (search) {
    // Escapa os curingas do LIKE para o texto do usuário não virar padrão.
    const escaped = search.replace(/[%_]/g, (match) => `\\${match}`);
    query = query.ilike("name", `%${escaped}%`);
  }

  const { data, error, count } = await query.range(from, to);

  if (error) {
    console.error("Erro ao buscar produtos do painel:", error.message);
    throw new Error(error.message);
  }

  const rows = (data ?? []) as ProductRow[];

  return buildPaginatedResult(
    rows.map(mapRowToProduct),
    count ?? rows.length,
    page,
    pageSize
  );
}

export async function fetchProductsFromDb(): Promise<CatalogProduct[]> {
  const query = buildProductsQuery();
  const { data, error } = await publicRestGet<ProductRow[]>(query);

  if (error) {
    console.error("Erro ao buscar produtos:", error);
    throw new Error(error);
  }

  const rows = Array.isArray(data) ? data : [];
  return rows.map(mapRowToProduct);
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
