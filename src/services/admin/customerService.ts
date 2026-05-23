import { getSupabaseClient } from "../../lib/supabase/client";
import type { PaginatedResult, PaginationParams } from "../../types/pagination";
import type { ProfileRow } from "../../types/profile";
import {
  buildPaginatedResult,
  emptyPaginatedResult,
  normalizePagination,
} from "../../utils/pagination";

export interface CustomerProfile {
  id: string;
  fullName: string;
  email: string;
  phone: string | null;
  createdAt: string;
}

function mapRow(row: ProfileRow & { created_at?: string }): CustomerProfile {
  return {
    id: row.id,
    fullName: row.full_name,
    email: row.email,
    phone: row.phone,
    createdAt: row.created_at ?? "",
  };
}

export async function fetchCustomersPaginated(
  params: PaginationParams = {}
): Promise<PaginatedResult<CustomerProfile>> {
  const { page, pageSize, from, to } = normalizePagination(params);
  const supabase = getSupabaseClient();
  if (!supabase) return emptyPaginatedResult(page, pageSize);

  const { data, error, count } = await supabase
    .from("profiles")
    .select("id, full_name, email, phone, role, created_at", { count: "exact" })
    .eq("role", "client")
    .order("full_name", { ascending: true })
    .range(from, to);

  if (error) {
    return emptyPaginatedResult(page, pageSize);
  }

  return buildPaginatedResult(
    (data ?? []).map((row) =>
      mapRow(row as ProfileRow & { created_at: string })
    ),
    count ?? 0,
    page,
    pageSize
  );
}

export async function fetchCustomers(): Promise<{
  customers: CustomerProfile[];
  error: string | null;
}> {
  const result = await fetchCustomersPaginated({ page: 1, pageSize: 1000 });
  return {
    customers: result.data,
    error: null,
  };
}
