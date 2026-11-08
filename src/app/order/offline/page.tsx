import type { Metadata } from "next";
import { cookies } from "next/headers";
import Link from "next/link";
import { Suspense } from "react";
import { ClearCart } from "@/components/ClearCart";
import { formatMoney } from "@/lib/money";
import { offlineConfig } from "@/lib/offline-payments";

export const metadata: Metadata = {
  title: "Your order",
  robots: { index: false },
};

type Saved = { ref: string; method: "bank-transfer" | "cash"; totalCents: number; email: string };

async function Instructions() {
  const raw = (await cookies()).get("lastOffline")?.value;
  let order: Saved | null = null;
  try {
    order = raw ? (JSON.parse(raw) as Saved) : null;
  } catch {
    order = null;
  }

  if (!order?.ref || (order.method !== "bank-transfer" && order.method !== "cash")) {
    return (
      <>
        <h1 className="display text-5xl sm:text-6xl">We couldn&apos;t find an order.</h1>
        <Link href="/checkout" className="btn btn-solid mt-10">
          Back to checkout
        </Link>
      </>
    );
  }

  const { bank, cashAddress } = offlineConfig();
  const total = formatMoney(order.totalCents);

  return (
    <>
      <ClearCart />
      <p className="eyebrow mb-4">Thank you</p>
      <h1 className="display text-5xl sm:text-6xl">Your order is registered.</h1>
      <p className="mt-6 max-w-xl text-ivory-soft">
        {order.method === "bank-transfer"
          ? "Please transfer the amount below. We send your order as soon as the payment has arrived."
          : "Please send the cash below. We send your order as soon as it has arrived. Cash sent by post is at your own risk."}
      </p>

      <dl className="mt-10 grid max-w-xl gap-y-4 border border-gold-line p-6 text-base sm:grid-cols-[11rem_1fr]">
        <dt className="text-ivory-soft">Amount</dt>
        <dd className="tabular-nums">{total}</dd>
        <dt className="text-ivory-soft">Payment reference</dt>
        <dd className="font-semibold tracking-wider">{order.ref}</dd>
        {order.method === "bank-transfer" ? (
          <>
            <dt className="text-ivory-soft">Account holder</dt>
            <dd>{bank.accountName}</dd>
            <dt className="text-ivory-soft">IBAN</dt>
            <dd className="tabular-nums">{bank.iban}</dd>
            {bank.bic && (
              <>
                <dt className="text-ivory-soft">BIC</dt>
                <dd>{bank.bic}</dd>
              </>
            )}
          </>
        ) : (
          <>
            <dt className="text-ivory-soft">Send the cash to</dt>
            <dd className="whitespace-pre-line">{cashAddress.replace(/\\n/g, "\n")}</dd>
          </>
        )}
      </dl>
      <p className="mt-4 max-w-xl text-sm text-ivory-faint">
        Please {order.method === "bank-transfer" ? "state" : "write"} the payment reference{" "}
        <strong className="text-ivory-soft">{order.ref}</strong>{" "}
        {order.method === "bank-transfer" ? "in the description of your transfer" : "on a note in the envelope"}.
      </p>
    </>
  );
}

export default function OfflineOrderPage() {
  return (
    <div className="mx-auto max-w-3xl px-5 pb-16 pt-16 sm:px-8 sm:pt-24">
      <Suspense fallback={<p className="text-ivory-soft">Loading…</p>}>
        <Instructions />
      </Suspense>
    </div>
  );
}
