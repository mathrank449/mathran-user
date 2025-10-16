import type { PageInfo } from "../../../shared/types/page";
import type { OrderStatus } from "../../resource/types/resource";

export type OrderItem = {
  id: string;
  userId: string;
  contentTitle: string;
  contentId: string;
  idempotencyKey: string;
  orderStatus: OrderStatus;
  purchasedPointAmount: number;
  createdAt: string;
  completedAt: string;
};

export interface OrderListPagination extends PageInfo {
  queryResults: OrderItem[];
}
