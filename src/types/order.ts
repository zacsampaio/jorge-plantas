export type OrderStatus = "pending" | "confirmed" | "delivered" | "cancelled";

export interface OrderItem {
  productId: number;
  name: string;
  quantity: number;
  unitPrice: number;
}

/** Origem da venda: pelo site ou registrada no balcão pelo painel. */
export type OrderChannel = "online" | "balcao";

export const ORDER_CHANNEL_LABELS: Record<OrderChannel, string> = {
  online: "Site",
  balcao: "Balcão",
};

export interface Order {
  id: string;
  /** Ausente em venda de balcão, que não tem conta associada. */
  userId?: string;
  channel: OrderChannel;
  createdAt: string;
  status: OrderStatus;
  total: number;
  deliveryFee?: number;
  paymentMethod?: string;
  address?: Record<string, string>;
  items: OrderItem[];
  customerName?: string;
  customerEmail?: string;
  customerPhone?: string;
}

export interface CreateOrderInput {
  /** Pedido do site tem conta; venda de balcão não. */
  userId?: string;
  channel?: OrderChannel;
  customerName?: string;
  customerPhone?: string;
  items: OrderItem[];
  total: number;
  /** Venda de balcão não tem entrega: assume zero. */
  deliveryFee?: number;
  paymentMethod: string;
  /** Venda de balcão não tem endereço: assume objeto vazio. */
  address?: Record<string, string>;
  status?: OrderStatus;
}
