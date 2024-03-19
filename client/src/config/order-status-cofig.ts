import { OrderStatus } from "@/types";

type OrderStatusInfo = {
    label: string;
    value: OrderStatus;
    progressValue: number;
}

export const ORDER_STATUS: OrderStatusInfo[] = [
  { label: "Đã đặt", value: "placed", progressValue: 0 },
  { label: "Đợi quán xác nhận", value: "paid", progressValue: 25 },
  { label: "Đang tìm tài xế", value: "inProgress", progressValue: 50 },
  { label: "Đang giao hàng", value: "outForDelivery", progressValue: 75 },
  { label: "Giao hàng thành công", value: "delivered", progressValue: 100 },
];
