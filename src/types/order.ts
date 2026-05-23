export type OrderStatus = "pending" | "confirmed" | "delivered" | "cancelled";

export interface OrderItem {
  productId: number;
  name: string;
  quantity: number;
  unitPrice: number;
}

export interface Order {
  id: string;
  userId: string;
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
  userId: string;
  items: OrderItem[];
  total: number;
  deliveryFee: number;
  paymentMethod: string;
  address: Record<string, string>;
}
