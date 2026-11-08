/** Order states, shared by the server and the account pages. */
export type OrderStatus =
  | "pending" // online payment started, not finished
  | "awaiting_transfer" // bank transfer chosen, money not yet received
  | "awaiting_cash" // cash by post chosen, not yet received
  | "paid"
  | "shipped"
  | "delivered"
  | "cancelled"
  | "failed"
  | "expired";

export const statusLabel: Record<OrderStatus, string> = {
  pending: "Awaiting payment",
  awaiting_transfer: "Awaiting bank transfer",
  awaiting_cash: "Awaiting cash",
  paid: "Paid, being prepared",
  shipped: "Shipped",
  delivered: "Delivered",
  cancelled: "Cancelled",
  failed: "Payment failed",
  expired: "Payment expired",
};

/** The four steps of a normal order, in order. */
export const progressSteps = ["Placed", "Paid", "Shipped", "Delivered"] as const;

/** How far along the four steps an order is (1 = placed … 4 = delivered); 0 for ended orders. */
export function progressOf(status: OrderStatus): number {
  switch (status) {
    case "pending":
    case "awaiting_transfer":
    case "awaiting_cash":
      return 1;
    case "paid":
      return 2;
    case "shipped":
      return 3;
    case "delivered":
      return 4;
    default:
      return 0;
  }
}
