import { useCallback, useEffect, useRef, useState } from "react";
import type { PaginatedResult } from "../types/pagination";
import { DEFAULT_PAGE_SIZE } from "../types/pagination";
import { useAuthStore } from "../stores/authStore";

const SKELETON_DELAY_MS = 180;

interface UsePaginatedFetchOptions<T> {
  fetcher: (page: number, pageSize: number) => Promise<PaginatedResult<T>>;
  pageSize?: number;
  enabled?: boolean;
  resetKey?: string | number | boolean | null;
  waitForAuth?: boolean;
}

const emptyResult = <T,>(pageSize: number): PaginatedResult<T> => ({
  data: [],
  total: 0,
  page: 1,
  pageSize,
  totalPages: 1,
});

export function usePaginatedFetch<T>({
  fetcher,
  pageSize = DEFAULT_PAGE_SIZE,
  enabled = true,
  resetKey,
  waitForAuth = false,
}: UsePaginatedFetchOptions<T>) {
  const authStatus = useAuthStore((state) => state.status);
  const [page, setPage] = useState(1);
  const [result, setResult] = useState<PaginatedResult<T>>(() =>
    emptyResult(pageSize)
  );
  const [isInitialLoading, setIsInitialLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [reloadToken, setReloadToken] = useState(0);

  const fetcherRef = useRef(fetcher);
  const hasDataRef = useRef(false);
  fetcherRef.current = fetcher;

  const authReady = authStatus !== "loading" && authStatus !== "idle";
  const canFetch = enabled && (!waitForAuth || authReady);
  const waitingForAuth = waitForAuth && !authReady;

  useEffect(() => {
    setPage(1);
  }, [resetKey]);

  useEffect(() => {
    if (!canFetch) return;

    let cancelled = false;
    let skeletonTimer: ReturnType<typeof setTimeout> | undefined;

    const run = async () => {
      const showSkeleton = !hasDataRef.current;

      if (showSkeleton) {
        skeletonTimer = setTimeout(() => {
          if (!cancelled) setIsInitialLoading(true);
        }, SKELETON_DELAY_MS);
      } else {
        setIsRefreshing(true);
      }

      try {
        const data = await fetcherRef.current(page, pageSize);
        if (cancelled) return;

        setResult(data);
        setError(null);
        hasDataRef.current = data.data.length > 0;
      } catch (err) {
        if (cancelled) return;

        const message =
          err instanceof Error
            ? err.message
            : "Não foi possível carregar os dados.";
        setError(message);
        if (!hasDataRef.current) {
          setResult(emptyResult(pageSize));
        }
      } finally {
        if (cancelled) return;
        clearTimeout(skeletonTimer);
        setIsInitialLoading(false);
        setIsRefreshing(false);
      }
    };

    run();

    return () => {
      cancelled = true;
      clearTimeout(skeletonTimer);
    };
  }, [canFetch, page, pageSize, reloadToken, resetKey]);

  const setPageSafe = useCallback((nextPage: number) => {
    setPage(Math.max(1, nextPage));
  }, []);

  const reload = useCallback(() => {
    setReloadToken((token) => token + 1);
  }, []);

  return {
    data: result.data,
    total: result.total,
    totalPages: result.totalPages,
    pageSize: result.pageSize,
    page,
    setPage: setPageSafe,
    isLoading: isInitialLoading || waitingForAuth,
    isInitialLoading: isInitialLoading || waitingForAuth,
    isRefreshing,
    error,
    reload,
  };
}
