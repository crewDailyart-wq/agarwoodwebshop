import type { Metadata } from "next";
import { cookies } from "next/headers";
import Link from "next/link";
import { Suspense } from "react";
import { ClearCart } from "@/components/ClearCart";
import { formatMoney } from "@/lib/money";

export const metadata: Metadata = {
  title: "Order",
  robots: { index: false },
};

type Payment = {
  status: string;
  amount: { value: string };
  metadata?: { ref?: string; customer?: { email?: string } };
};

async function Status() {
  const id = (await cookies()).get("lastPayment")?.value;
  let payment: Payment | null = null;

  if (id && process.env.MOLLIE_API_KEY) {
    const res = await fetch(`https://api.mollie.com/v2/payments/${id}`, {
      headers: { Authorization: `Bearer ${process.env.MOLLIE_API_KEY}` },
      cache: "no-store",
    });
    if (res.ok) payment = (await res.json()) as Payment;
  }

  if (!payment) {
    return (
      <>
        <h1 className="display text-5xl sm:text-6xl">We couldn&apos;t find an order.</h1>
        <p className="mt-6 max-w-md text-ivory-soft">
          If you just paid, your confirmation is on its way by email.
        </p>
      </>
    );
  }

  if (payment.status === "paid") {
    return (
      <>
        <ClearCart />
        <p className="eyebrow mb-4">Thank you</p>
        <h1 className="display text-5xl sm:text-6xl">Your order is confirmed.</h1>
        <p className="mt-6 max-w-md text-ivory-soft">
          Order {payment.metadata?.ref} · {formatMoney(Math.round(Number(payment.amount.value) * 100))}
          {payment.metadata?.customer?.email && (
            <>
              <br />
              We&apos;ll send updates to {payment.metadata.customer.email}.
            </>
          )}
        </p>
      </>
    );
  }

  if (payment.status === "open" || payment.status === "pending") {
    return (
      <>
        <h1 className="display text-5xl sm:text-6xl">Waiting for your payment.</h1>
        <p className="mt-6 max-w-md text-ivory-soft">
          We haven&apos;t received confirmation yet. Refresh this page in a moment.
        </p>
      </>
    );
  }

  return (
    <>
      <h1 className="display text-5xl sm:text-6xl">The payment didn&apos;t go through.</h1>
      <p className="mt-6 max-w-md text-ivory-soft">
        Nothing was charged. Your cart is still waiting.
      </p>
      <Link href="/checkout" className="btn btn-solid mt-10">
        Back to checkout
      </Link>
    </>
  );
}

export default function ConfirmationPage() {
  return (
    <div className="mx-auto max-w-7xl px-5 pb-12 pt-16 sm:px-8 sm:pt-24">
      <Suspense fallback={<p className="text-ivory-soft">Checking your payment…</p>}>
        <Status />
      </Suspense>
    </div>
  );
}
