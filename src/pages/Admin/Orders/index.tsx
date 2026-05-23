import { useCallback } from "react";
import { Alert } from "../../../components/ui/Alert";
import { EmptyState } from "../../../components/ui/EmptyState";
import { Pagination } from "../../../components/ui/Pagination";
import { Skeleton } from "../../../components/ui/Skeleton";
import {
  AdminHeader,
  AdminTitle,
  StatusSelect,
  Table,
} from "../../../layouts/AdminLayout/styled";
import { PageSection } from "../../../layouts/AccountLayout/styled";
import { usePaginatedFetch } from "../../../hooks/usePaginatedFetch";
import {
  fetchAllOrdersPaginated,
  updateOrderStatus,
} from "../../../services/orders/orderService";
import type { OrderStatus } from "../../../types/order";
import { DEFAULT_PAGE_SIZE } from "../../../types/pagination";
import {
  formatCurrency,
  formatOrderDate,
  ORDER_STATUS_LABELS,
} from "../../../utils/format";

export function AdminOrdersPage() {
  const fetchPage = useCallback(
    (page: number, pageSize: number) =>
      fetchAllOrdersPaginated({ page, pageSize }),
    []
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
    error,
    reload,
  } = usePaginatedFetch({
    fetcher: fetchPage,
    pageSize: DEFAULT_PAGE_SIZE,
  });

  const handleStatusChange = async (orderId: string, status: OrderStatus) => {
    const { error: updateError } = await updateOrderStatus(orderId, status);
    if (updateError) {
      alert(updateError);
      return;
    }
    reload();
  };

  return (
    <>
      <AdminHeader>
        <AdminTitle>Pedidos</AdminTitle>
      </AdminHeader>

      <PageSection data-refreshing={isRefreshing ? "true" : undefined}>
        {error && <Alert variant="error">{error}</Alert>}
        {isInitialLoading && <Skeleton lines={5} height="3rem" />}

        {!isInitialLoading && orders.length === 0 && (
          <EmptyState
            title="Nenhum pedido registrado"
            description="Os pedidos feitos pelos clientes aparecerão aqui."
          />
        )}

        {!isInitialLoading && orders.length > 0 && (
          <>
            <Table>
              <thead>
                <tr>
                  <th>Data</th>
                  <th>Cliente</th>
                  <th>E-mail</th>
                  <th>Total</th>
                  <th>Status</th>
                  <th>Itens</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order.id}>
                    <td>{formatOrderDate(order.createdAt)}</td>
                    <td>{order.customerName ?? "—"}</td>
                    <td>{order.customerEmail ?? "—"}</td>
                    <td>{formatCurrency(order.total)}</td>
                    <td>
                      <StatusSelect
                        value={order.status}
                        onChange={(event) =>
                          handleStatusChange(
                            order.id,
                            event.target.value as OrderStatus
                          )
                        }
                        aria-label={`Status do pedido de ${order.customerName ?? "cliente"}`}
                      >
                        {(Object.keys(ORDER_STATUS_LABELS) as OrderStatus[]).map(
                          (status) => (
                            <option key={status} value={status}>
                              {ORDER_STATUS_LABELS[status]}
                            </option>
                          )
                        )}
                      </StatusSelect>
                    </td>
                    <td>
                      {order.items
                        .map((item) => `${item.quantity}x ${item.name}`)
                        .join(", ")}
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>

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
