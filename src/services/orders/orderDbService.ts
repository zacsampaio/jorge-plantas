import { getSupabaseClient } from "../../lib/supabase/client";
import type { CreateOrderInput, Order, OrderStatus } from "../../types/order";
import type { PaginatedResult, PaginationParams } from "../../types/pagination";
import {
  buildPaginatedResult,
  emptyPaginatedResult,
  normalizePagination,
} from "../../utils/pagination";

interface OrderRow {
  id: string;
  user_id: string;
  status: OrderStatus;
  total: number;
  delivery_fee: number;
  payment_method: string | null;
  address: Record<string, string> | null;
  created_at: string;
  profiles?: {
    full_name: string;
    email: string;
    phone: string | null;
  } | null;
}

interface OrderItemRow {
  id: number;
  order_id: string;
  product_id: number | null;
  product_name: string;
  quantity: number;
  unit_price: number;
}

function mapRowToOrder(row: OrderRow, items: OrderItemRow[]): Order {
  return {
    id: row.id,
    userId: row.user_id,
    createdAt: row.created_at,
    status: row.status,
    total: Number(row.total),
    deliveryFee: Number(row.delivery_fee),
    paymentMethod: row.payment_method ?? undefined,
    address: row.address ?? undefined,
    customerName: row.profiles?.full_name,
    customerEmail: row.profiles?.email,
    customerPhone: row.profiles?.phone ?? undefined,
    items: items.map((item) => ({
      productId: item.product_id ?? 0,
      name: item.product_name,
      quantity: item.quantity,
      unitPrice: Number(item.unit_price),
    })),
  };
}

async function fetchOrderItemsByOrderIds(
  orderIds: string[]
): Promise<Map<string, OrderItemRow[]>> {
  const itemsByOrder = new Map<string, OrderItemRow[]>();
  if (orderIds.length === 0) return itemsByOrder;

  const supabase = getSupabaseClient();
  if (!supabase) return itemsByOrder;

  const { data: items } = await supabase
    .from("order_items")
    .select("*")
    .in("order_id", orderIds);

  for (const item of (items ?? []) as OrderItemRow[]) {
    const list = itemsByOrder.get(item.order_id) ?? [];
    list.push(item);
    itemsByOrder.set(item.order_id, list);
  }

  return itemsByOrder;
}

export async function fetchOrdersPaginatedFromDb(
  params: PaginationParams & { userId?: string } = {}
): Promise<PaginatedResult<Order>> {
  const { page, pageSize, from, to } = normalizePagination(params);
  const supabase = getSupabaseClient();
  if (!supabase) return emptyPaginatedResult(page, pageSize);

  let query = supabase
    .from("orders")
    .select("*, profiles(full_name, email, phone)", { count: "exact" })
    .order("created_at", { ascending: false });

  if (params.userId) {
    query = query.eq("user_id", params.userId);
  }

  const { data: orders, error, count } = await query.range(from, to);

  if (error) {
    console.error("Erro ao buscar pedidos paginados:", error.message);
    return emptyPaginatedResult(page, pageSize);
  }

  const orderRows = (orders ?? []) as OrderRow[];
  const itemsByOrder = await fetchOrderItemsByOrderIds(
    orderRows.map((order) => order.id)
  );

  return buildPaginatedResult(
    orderRows.map((order) =>
      mapRowToOrder(order, itemsByOrder.get(order.id) ?? [])
    ),
    count ?? 0,
    page,
    pageSize
  );
}

export async function fetchOrdersFromDbByUserId(
  userId: string
): Promise<Order[]> {
  const supabase = getSupabaseClient();
  if (!supabase) return [];

  const { data: orders, error } = await supabase
    .from("orders")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false });

  if (error || !orders?.length) return [];

  const itemsByOrder = await fetchOrderItemsByOrderIds(
    orders.map((order) => order.id)
  );

  return (orders as OrderRow[]).map((order) =>
    mapRowToOrder(order, itemsByOrder.get(order.id) ?? [])
  );
}

export async function fetchAllOrdersFromDb(): Promise<Order[]> {
  const supabase = getSupabaseClient();
  if (!supabase) return [];

  const { data: orders, error } = await supabase
    .from("orders")
    .select("*, profiles(full_name, email, phone)")
    .order("created_at", { ascending: false });

  if (error || !orders?.length) return [];

  const itemsByOrder = await fetchOrderItemsByOrderIds(
    orders.map((order) => order.id)
  );

  return (orders as OrderRow[]).map((order) =>
    mapRowToOrder(order, itemsByOrder.get(order.id) ?? [])
  );
}

export async function fetchOrderFromDbById(
  orderId: string,
  userId?: string
): Promise<Order | null> {
  const supabase = getSupabaseClient();
  if (!supabase) return null;

  let query = supabase
    .from("orders")
    .select("*, profiles(full_name, email, phone)")
    .eq("id", orderId);

  if (userId) {
    query = query.eq("user_id", userId);
  }

  const { data: order, error } = await query.maybeSingle();
  if (error || !order) return null;

  const { data: items } = await supabase
    .from("order_items")
    .select("*")
    .eq("order_id", orderId);

  return mapRowToOrder(order as OrderRow, (items ?? []) as OrderItemRow[]);
}

export async function createOrderInDb(
  input: CreateOrderInput
): Promise<{ order: Order | null; error: string | null }> {
  const supabase = getSupabaseClient();
  if (!supabase) {
    return { order: null, error: "Supabase não configurado." };
  }

  const { data: order, error: orderError } = await supabase
    .from("orders")
    .insert({
      user_id: input.userId,
      total: input.total,
      delivery_fee: input.deliveryFee,
      payment_method: input.paymentMethod,
      address: input.address,
    })
    .select("*")
    .single();

  if (orderError || !order) {
    return {
      order: null,
      error: orderError?.message ?? "Erro ao criar pedido.",
    };
  }

  const itemRows = input.items.map((item) => ({
    order_id: order.id,
    product_id: item.productId || null,
    product_name: item.name,
    quantity: item.quantity,
    unit_price: item.unitPrice,
  }));

  const { error: itemsError } = await supabase
    .from("order_items")
    .insert(itemRows);

  if (itemsError) {
    return { order: null, error: itemsError.message };
  }

  return {
    order: mapRowToOrder(order as OrderRow, itemRows as unknown as OrderItemRow[]),
    error: null,
  };
}

export async function updateOrderStatusInDb(
  orderId: string,
  status: OrderStatus
): Promise<{ error: string | null }> {
  const supabase = getSupabaseClient();
  if (!supabase) {
    return { error: "Supabase não configurado." };
  }

  const { error } = await supabase
    .from("orders")
    .update({ status, updated_at: new Date().toISOString() })
    .eq("id", orderId);

  return { error: error?.message ?? null };
}
