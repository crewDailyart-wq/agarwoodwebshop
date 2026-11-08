import Link from "next/link";
import { formatDate } from "@/lib/account";
import { formatMoney } from "@/lib/money";
import type { OrderRecord } from "@/lib/orders";
import { StatusBadge } from "./OrderParts";

/** One order as a line in a list: reference, date, what was bought, status and total. */
export function OrderRow({ order }: { order: OrderRecord }) {
  const items = order.lines.reduce((n, l) => n + l.quantity, 0);
  return (
    <li>
      <Link
        href={`/account/orders/${order.ref}`}
        className="grid items-center gap-x-6 gap-y-2 py-5 hover:bg-gold/[0.04] sm:grid-cols-[1fr_auto_auto] sm:px-2"
      >
        <span>
          <span className="block font-[family-name:var(--font-display)] text-xl text-ivory">Order {order.ref}</span>
          <span className="block text-sm text-ivory-faint">
            {formatDate(order.createdAt)} · {items} {items === 1 ? "item" : "items"}
          </span>
        </span>
        <StatusBadge status={order.status} />
        <span className="text-ivory sm:min-w-24 sm:text-right">{formatMoney(order.totalCents)}</span>
      </Link>
    </li>
  );
}
