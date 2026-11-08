import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { AccountShell, Panel } from "@/components/account/AccountChrome";
import { OrderProgress, StatusBadge } from "@/components/account/OrderParts";
import { formatDate, requireUser } from "@/lib/account";
import { formatMoney } from "@/lib/money";
import { getOrder } from "@/lib/orders";

const methodLabel = {
  online: "Paid online (Mollie)",
  "bank-transfer": "Direct bank transfer",
  cash: "Cash, sent by post",
} as const;

async function Content({ params }: { params: Promise<{ ref: string }> }) {
  const { ref } = await params;
  const user = await requireUser(`/account/orders/${ref}`);
  const order = /^[A-Z0-9]{6,12}$/.test(ref) ? await getOrder(user.id, ref) : null;
  if (!order) notFound();

  return (
    <AccountShell title={`Order ${order.ref}`} eyebrow="My orders">
      <div className="space-y-8">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <p className="text-ivory-soft">Placed on {formatDate(order.createdAt)}</p>
          <StatusBadge status={order.status} />
        </div>

        <Panel title="Progress">
          <OrderProgress status={order.status} />
          {order.status === "pending" && (
            <p className="mt-4 text-sm text-ivory-soft">We&apos;re waiting for your online payment to be confirmed.</p>
          )}
          {order.status === "awaiting_transfer" && (
            <p className="mt-4 text-sm text-ivory-soft">
              We send your order as soon as your bank transfer has arrived. Please use payment reference{" "}
              <strong className="text-ivory">{order.ref}</strong>.
            </p>
          )}
          {order.status === "awaiting_cash" && (
            <p className="mt-4 text-sm text-ivory-soft">
              We send your order as soon as your cash has arrived. Please mention reference{" "}
              <strong className="text-ivory">{order.ref}</strong>.
            </p>
          )}
          {(order.status === "failed" || order.status === "expired" || order.status === "cancelled") && (
            <p className="text-sm text-ivory-soft">
              This order wasn&apos;t completed, so nothing was charged for it. You&apos;re welcome to{" "}
              <Link href="/collection" className="text-gold hover:text-gold-bright">
                place it again
              </Link>
              .
            </p>
          )}
          {order.shippedAt && (
            <p className="mt-4 text-sm text-ivory-soft">
              Shipped on {formatDate(order.shippedAt)}.
              {order.trackingUrl && /^https:\/\//.test(order.trackingUrl) && (
                <>
                  {" "}
                  <a href={order.trackingUrl} rel="noopener noreferrer" className="text-gold hover:text-gold-bright">
                    Track your parcel
                  </a>
                </>
              )}
            </p>
          )}
        </Panel>

        <Panel title="Items">
          <ul className="divide-y divide-gold-hair">
            {order.lines.map((l) => (
              <li key={l.id} className="flex items-baseline justify-between gap-6 py-3">
                <span className="text-ivory">
                  {l.name} <span className="text-ivory-faint">× {l.quantity}</span>
                </span>
                <span className="text-ivory">{formatMoney(l.unitCents * l.quantity)}</span>
              </li>
            ))}
          </ul>
          <dl className="mt-4 space-y-2 border-t border-gold-line pt-4 text-ivory-soft">
            <div className="flex justify-between">
              <dt>Subtotal</dt>
              <dd>{formatMoney(order.subtotalCents)}</dd>
            </div>
            <div className="flex justify-between">
              <dt>Shipping</dt>
              <dd>{order.shippingCents === 0 ? "Free" : formatMoney(order.shippingCents)}</dd>
            </div>
            <div className="flex justify-between text-lg text-ivory">
              <dt>Total</dt>
              <dd>{formatMoney(order.totalCents)}</dd>
            </div>
          </dl>
        </Panel>

        <div className="grid gap-8 md:grid-cols-2">
          <Panel title="Delivery address">
            <address className="not-italic leading-relaxed text-ivory-soft">
              {order.name}
              <br />
              {order.address.street}
              <br />
              {order.address.postalCode} {order.address.city}
              <br />
              {order.address.country}
            </address>
          </Panel>
          <Panel title="Payment">
            <p className="text-ivory-soft">{methodLabel[order.paymentMethod]}</p>
            {order.paidAt && <p className="mt-1 text-sm text-ivory-faint">Received {formatDate(order.paidAt)}</p>}
          </Panel>
        </div>

        <p className="text-sm text-ivory-faint">
          A question about this order?{" "}
          <Link href="/contact" className="text-gold hover:text-gold-bright">
            Contact us
          </Link>{" "}
          and mention reference {order.ref}.
        </p>
        <Link href="/account/orders" className="inline-block text-sm text-gold hover:text-gold-bright">
          ← All my orders
        </Link>
      </div>
    </AccountShell>
  );
}

// A sample reference so the page shell can be prepared in advance; real orders are read per visitor.
export function generateStaticParams() {
  return [{ ref: "SAMPLE0000" }];
}

export default function OrderPage(props: PageProps<"/account/orders/[ref]">) {
  return (
    <Suspense fallback={<p className="px-8 py-20 text-center text-ivory-soft">Loading…</p>}>
      <Content params={props.params} />
    </Suspense>
  );
}
