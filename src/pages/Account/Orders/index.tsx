import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../../../components/ui/Button";
import { EmptyState } from "../../../components/ui/EmptyState";
import { Pagination } from "../../../components/ui/Pagination";
import { OrderCardSkeleton } from "../../../components/ui/Skeleton";
import { useAuth } from "../../../hooks/useAuth";
import { usePaginatedFetch } from "../../../hooks/usePaginatedFetch";
import { fetchOrdersByUserIdPaginated } from "../../../services/orders/orderService";
import { DEFAULT_PAGE_SIZE } from "../../../types/pagination";
import { PageSection, PageTitle } from "../../../layouts/AccountLayout/styled";
import {
  formatCurrency,
  formatOrderDate,
  ORDER_STATUS_LABELS,
} from "../../../utils/format";
import {
  OrderCard,
  OrderDate,
  OrderInfo,
  OrdersList,
  OrderTotal,
  StatusBadge,
} from "../styled";

export function AccountOrdersPage() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const fetchPage = useCallback(
    (page: number, pageSize: number) => {
      if (!user) {
        return Promise.resolve({
          data: [],
          total: 0,
          page: 1,
          pageSize,
          totalPages: 1,
        });
      }
      return fetchOrdersByUserIdPaginated(user.id, { page, pageSize });
    },
    [user]
  );

  const {
    data: orders,
    total,
    totalPages,
    page,
    pageSize,
    setPage,
    isInitialLoading,
    isRefreshing,
  } = usePaginatedFetch({
    fetcher: fetchPage,
    pageSize: DEFAULT_PAGE_SIZE,
    enabled: !!user,
    resetKey: user?.id,
  });

  return (
    <>
      <PageTitle>Meus Pedidos</PageTitle>
      <PageSection data-refreshing={isRefreshing ? "true" : undefined}>
        {isInitialLoading && <OrderCardSkeleton />}

        {!isInitialLoading && orders.length === 0 && (
          <EmptyState
            title="Nenhum pedido ainda"
            description="Quando você fizer uma compra, seus pedidos aparecerão aqui."
            action={
              <Button onClick={() => navigate("/produtos")}>
                Ver produtos
              </Button>
            }
          />
        )}

        {!isInitialLoading && orders.length > 0 && (
          <>
            <OrdersList>
              {orders.map((order) => (
                <OrderCard key={order.id}>
                  <OrderInfo>
                    <OrderDate>{formatOrderDate(order.createdAt)}</OrderDate>
                    <StatusBadge $status={order.status}>
                      {ORDER_STATUS_LABELS[order.status]}
                    </StatusBadge>
                    <OrderTotal>{formatCurrency(order.total)}</OrderTotal>
                  </OrderInfo>
                  <Button
                    variant="ghost"
                    onClick={() => navigate(`/account/orders/${order.id}`)}
                  >
                    Detalhes
                  </Button>
                </OrderCard>
              ))}
            </OrdersList>

            <Pagination
              page={page}
              totalPages={totalPages}
              total={total}
              pageSize={pageSize}
              onPageChange={setPage}
              disabled={isInitialLoading || isRefreshing}
            />
          </>
        )}
      </PageSection>
    </>
  );
}
