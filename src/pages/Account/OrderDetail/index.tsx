import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft } from "phosphor-react";
import { OrderCardSkeleton } from "../../../components/ui/Skeleton";
import { EmptyState } from "../../../components/ui/EmptyState";
import { Button } from "../../../components/ui/Button";
import { useAuth } from "../../../hooks/useAuth";
import { fetchOrderById } from "../../../services/orders/orderService";
import type { Order } from "../../../types/order";
import { PageSection, PageTitle } from "../../../layouts/AccountLayout/styled";
import {
  formatCurrency,
  formatOrderDate,
  ORDER_STATUS_LABELS,
} from "../../../utils/format";
import {
  BackButton,
  DetailFooter,
  DetailTable,
  StatusBadge,
} from "../styled";

export function OrderDetailPage() {
  const { orderId } = useParams<{ orderId: string }>();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [order, setOrder] = useState<Order | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    if (!user || !orderId) return;

    fetchOrderById(orderId, user.id).then((data) => {
      if (!data) {
        setNotFound(true);
      } else {
        setOrder(data);
      }
      setIsLoading(false);
    });
  }, [user, orderId]);

  if (isLoading) {
    return (
      <>
        <PageTitle>Detalhes do pedido</PageTitle>
        <PageSection>
          <OrderCardSkeleton />
        </PageSection>
      </>
    );
  }

  if (notFound || !order) {
    return (
      <>
        <PageTitle>Detalhes do pedido</PageTitle>
        <PageSection>
          <EmptyState
            title="Pedido não encontrado"
            description="Este pedido não existe ou não pertence à sua conta."
            action={
              <Button onClick={() => navigate("/account/orders")}>
                Voltar aos pedidos
              </Button>
            }
          />
        </PageSection>
      </>
    );
  }

  return (
    <>
      <BackButton type="button" onClick={() => navigate("/account/orders")}>
        <ArrowLeft size={16} weight="bold" />
        Voltar aos pedidos
      </BackButton>
      <PageTitle>Pedido #{order.id}</PageTitle>
      <PageSection>
        <p style={{ marginBottom: "1rem", fontFamily: "Roboto, sans-serif" }}>
          {formatOrderDate(order.createdAt)} ·{" "}
          <StatusBadge $status={order.status}>
            {ORDER_STATUS_LABELS[order.status]}
          </StatusBadge>
        </p>

        <DetailTable>
          <thead>
            <tr>
              <th>Item</th>
              <th>Qtd</th>
              <th>Unitário</th>
              <th>Subtotal</th>
            </tr>
          </thead>
          <tbody>
            {order.items.map((item) => (
              <tr key={item.productId}>
                <td>{item.name}</td>
                <td>{item.quantity}</td>
                <td>{formatCurrency(item.unitPrice)}</td>
                <td>
                  {formatCurrency(item.unitPrice * item.quantity)}
                </td>
              </tr>
            ))}
          </tbody>
        </DetailTable>

        <DetailFooter>Total: {formatCurrency(order.total)}</DetailFooter>
      </PageSection>
    </>
  );
}
