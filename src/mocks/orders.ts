import type { Order } from "../types/order";

export const mockOrders: Order[] = [
  {
    id: "ord-001",
    userId: "user-client-1",
    createdAt: "2025-05-10T14:30:00.000Z",
    status: "delivered",
    total: 90,
    items: [
      {
        productId: 1,
        name: "Samambaia com Cesta",
        quantity: 1,
        unitPrice: 50,
      },
      {
        productId: 2,
        name: "Flecha-de-Macaco",
        quantity: 2,
        unitPrice: 20,
      },
    ],
  },
  {
    id: "ord-002",
    userId: "user-client-1",
    createdAt: "2025-05-18T10:15:00.000Z",
    status: "confirmed",
    total: 35,
    items: [
      {
        productId: 5,
        name: "Cacto Mini-Palma",
        quantity: 1,
        unitPrice: 15,
      },
      {
        productId: 3,
        name: "Roseira",
        quantity: 2,
        unitPrice: 10,
      },
    ],
  },
  {
    id: "ord-003",
    userId: "user-client-1",
    createdAt: "2025-05-20T16:45:00.000Z",
    status: "pending",
    total: 20,
    items: [
      {
        productId: 2,
        name: "Flecha-de-Macaco",
        quantity: 1,
        unitPrice: 20,
      },
    ],
  },
];
