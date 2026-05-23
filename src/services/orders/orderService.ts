import type { Order, OrderStatus, CreateOrderInput } from "../../types/order";
import type { PaginatedResult, PaginationParams } from "../../types/pagination";
import {
  createOrderInDb,
  fetchOrderFromDbById,
  fetchOrdersPaginatedFromDb,
  updateOrderStatusInDb,
} from "./orderDbService";

export async function fetchOrdersByUserIdPaginated(
  userId: string,
  params: PaginationParams = {}
): Promise<PaginatedResult<Order>> {
  return fetchOrdersPaginatedFromDb({ ...params, userId });
}

export async function fetchAllOrdersPaginated(
  params: PaginationParams = {}
): Promise<PaginatedResult<Order>> {
  return fetchOrdersPaginatedFromDb(params);
}

export async function fetchOrderById(
  orderId: string,
  userId: string
): Promise<Order | null> {
  return fetchOrderFromDbById(orderId, userId);
}

export async function createOrder(
  input: CreateOrderInput
): Promise<{ order: Order | null; error: string | null }> {
  return createOrderInDb(input);
}

export async function updateOrderStatus(
  orderId: string,
  status: OrderStatus
): Promise<{ error: string | null }> {
  return updateOrderStatusInDb(orderId, status);
}
