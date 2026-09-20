import { getSupabaseClient } from "../../lib/supabase/client";

export interface SalesSummary {
  revenue: number;
  orderCount: number;
  averageTicket: number;
  revenueOnline: number;
  revenueBalcao: number;
}

export interface TopProduct {
  productName: string;
  totalQuantity: number;
  totalRevenue: number;
}

export const EMPTY_SUMMARY: SalesSummary = {
  revenue: 0,
  orderCount: 0,
  averageTicket: 0,
  revenueOnline: 0,
  revenueBalcao: 0,
};

export interface DayPoint {
  day: string;
  revenue: number;
  orderCount: number;
}

export interface StatusSlice {
  status: string;
  orderCount: number;
  totalValue: number;
}

const iso = (date: Date) => date.toISOString().slice(0, 10);

/** Converte "últimos N dias" no intervalo de datas que as funções SQL esperam. */
export function buildPeriodRange(days: number): {
  dateFrom: string;
  dateTo: string;
} {
  const today = new Date();
  const from = new Date(today);
  from.setDate(from.getDate() - (days - 1));

  return { dateFrom: iso(from), dateTo: iso(today) };
}

/**
 * Janela imediatamente anterior, do mesmo tamanho. É contra ela que os
 * cartões comparam: "R$ 485" sozinho não diz se foi um bom período.
 */
export function buildPreviousPeriodRange(days: number): {
  dateFrom: string;
  dateTo: string;
} {
  const to = new Date();
  to.setDate(to.getDate() - days);

  const from = new Date(to);
  from.setDate(from.getDate() - (days - 1));

  return { dateFrom: iso(from), dateTo: iso(to) };
}

export async function fetchSalesSummary(
  days: number,
  range = buildPeriodRange(days)
): Promise<{ summary: SalesSummary; error: string | null }> {
  const supabase = getSupabaseClient();
  if (!supabase) {
    return { summary: EMPTY_SUMMARY, error: "Supabase não configurado." };
  }

  const { dateFrom, dateTo } = range;

  const { data, error } = await supabase.rpc("get_sales_summary", {
    date_from: dateFrom,
    date_to: dateTo,
  });

  if (error) {
    return { summary: EMPTY_SUMMARY, error: error.message };
  }

  const row = Array.isArray(data) ? data[0] : data;
  if (!row) return { summary: EMPTY_SUMMARY, error: null };

  return {
    summary: {
      revenue: Number(row.revenue ?? 0),
      orderCount: Number(row.order_count ?? 0),
      averageTicket: Number(row.average_ticket ?? 0),
      revenueOnline: Number(row.revenue_online ?? 0),
      revenueBalcao: Number(row.revenue_balcao ?? 0),
    },
    error: null,
  };
}

export async function fetchTopProducts(
  days: number
): Promise<{ products: TopProduct[]; error: string | null }> {
  const supabase = getSupabaseClient();
  if (!supabase) {
    return { products: [], error: "Supabase não configurado." };
  }

  const { dateFrom, dateTo } = buildPeriodRange(days);

  const { data, error } = await supabase.rpc("get_top_products", {
    date_from: dateFrom,
    date_to: dateTo,
  });

  if (error) {
    return { products: [], error: error.message };
  }

  const rows = (data ?? []) as Array<{
    product_name: string;
    total_quantity: number;
    total_revenue: number;
  }>;

  return {
    products: rows.map((row) => ({
      productName: row.product_name,
      totalQuantity: Number(row.total_quantity),
      totalRevenue: Number(row.total_revenue),
    })),
    error: null,
  };
}

export async function fetchSalesByDay(
  days: number
): Promise<{ points: DayPoint[]; error: string | null }> {
  const supabase = getSupabaseClient();
  if (!supabase) return { points: [], error: "Supabase não configurado." };

  const { dateFrom, dateTo } = buildPeriodRange(days);

  const { data, error } = await supabase.rpc("get_sales_by_day", {
    date_from: dateFrom,
    date_to: dateTo,
  });

  if (error) return { points: [], error: error.message };

  const rows = (data ?? []) as Array<{
    day: string;
    revenue: number;
    order_count: number;
  }>;

  return {
    points: rows.map((row) => ({
      day: row.day,
      revenue: Number(row.revenue),
      orderCount: Number(row.order_count),
    })),
    error: null,
  };
}

export async function fetchOrdersByStatus(
  days: number
): Promise<{ slices: StatusSlice[]; error: string | null }> {
  const supabase = getSupabaseClient();
  if (!supabase) return { slices: [], error: "Supabase não configurado." };

  const { dateFrom, dateTo } = buildPeriodRange(days);

  const { data, error } = await supabase.rpc("get_orders_by_status", {
    date_from: dateFrom,
    date_to: dateTo,
  });

  if (error) return { slices: [], error: error.message };

  const rows = (data ?? []) as Array<{
    status: string;
    order_count: number;
    total_value: number;
  }>;

  return {
    slices: rows.map((row) => ({
      status: row.status,
      orderCount: Number(row.order_count),
      totalValue: Number(row.total_value),
    })),
    error: null,
  };
}

/** Contas criadas no período. Lê profiles direto: a policy de admin já permite. */
export async function fetchNewCustomers(
  days: number
): Promise<{ count: number; error: string | null }> {
  const supabase = getSupabaseClient();
  if (!supabase) return { count: 0, error: "Supabase não configurado." };

  const { dateFrom } = buildPeriodRange(days);

  const { count, error } = await supabase
    .from("profiles")
    .select("id", { count: "exact", head: true })
    .gte("created_at", dateFrom);

  if (error) return { count: 0, error: error.message };

  return { count: count ?? 0, error: null };
}

/** Variação percentual contra o período anterior; null quando não há base. */
export function percentChange(current: number, previous: number): number | null {
  if (previous === 0) return null;
  return ((current - previous) / previous) * 100;
}
