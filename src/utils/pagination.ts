import {
  DEFAULT_PAGE_SIZE,
  type PaginatedResult,
  type PaginationParams,
} from "../types/pagination";

export function normalizePagination(params: PaginationParams = {}) {
  const page = Math.max(1, params.page ?? 1);
  const pageSize = Math.max(1, params.pageSize ?? DEFAULT_PAGE_SIZE);
  const from = (page - 1) * pageSize;
  const to = from + pageSize - 1;

  return { page, pageSize, from, to };
}

export function buildPaginatedResult<T>(
  data: T[],
  total: number,
  page: number,
  pageSize: number
): PaginatedResult<T> {
  return {
    data,
    total,
    page,
    pageSize,
    totalPages: Math.max(1, Math.ceil(total / pageSize)),
  };
}

export function emptyPaginatedResult<T>(
  page = 1,
  pageSize = DEFAULT_PAGE_SIZE
): PaginatedResult<T> {
  return buildPaginatedResult<T>([], 0, page, pageSize);
}
