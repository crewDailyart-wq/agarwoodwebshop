import Link from "next/link";
import { Suspense } from "react";
import { AccountShell, Panel } from "@/components/account/AccountChrome";
import { OrderRow } from "@/components/account/OrderRow";
import { requireUser } from "@/lib/account";
import { listOrders } from "@/lib/orders";

async function Content() {
  const user = await requireUser("/account/orders");
  const orders = await listOrders(user.id);
  return (
    <AccountShell title="My orders">
      <Panel title={`${orders.length} ${orders.length === 1 ? "order" : "orders"}`}>
        {orders.length === 0 ? (
          <div className="py-4 text-center">
            <p className="text-ivory-soft">Your orders will appear here.</p>
            <Link href="/collection" className="btn btn-line mt-6">
              Our Agarwood Assortment
            </Link>
          </div>
        ) : (
          <ul className="divide-y divide-gold-hair">
            {orders.map((o) => (
              <OrderRow key={o.ref} order={o} />
            ))}
          </ul>
        )}
      </Panel>
      <p className="mt-6 text-sm text-ivory-faint">
        Ordered as a guest with this email address? Those orders are added here automatically.
      </p>
    </AccountShell>
  );
}

export default function OrdersPage() {
  return (
    <Suspense fallback={<p className="px-8 py-20 text-center text-ivory-soft">Loading…</p>}>
      <Content />
    </Suspense>
  );
}
