import { mockOrders } from "../../mocks/orders";
import type { Order } from "../../types/order";

const MOCK_DELAY_MS = 300;

function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function fetchOrdersByUserId(userId: string): Promise<Order[]> {
  await delay(MOCK_DELAY_MS);
  return mockOrders.filter((order) => order.userId === userId);
}

export async function fetchOrderById(
  orderId: string,
  userId: string
): Promise<Order | null> {
  await delay(MOCK_DELAY_MS);
  const order = mockOrders.find(
    (item) => item.id === orderId && item.userId === userId
  );
  return order ?? null;
}
