import type { Metadata } from "next";
import { connection } from "next/server";
import { Suspense } from "react";
import { CheckoutForm } from "@/components/CheckoutForm";
import { getShippingInfo, mollieConfigured } from "@/lib/checkout";

export const metadata: Metadata = {
  title: "Checkout",
  robots: { index: false },
};

// Read at request time so shipping and payment settings can change without a rebuild.
async function Form() {
  await connection();
  return <CheckoutForm info={getShippingInfo()} paymentsReady={mollieConfigured()} />;
}

export default function CheckoutPage() {
  return (
    <div className="mx-auto max-w-7xl px-5 pb-12 pt-14 sm:px-8 sm:pt-20">
      <h1 className="display mb-12 text-5xl sm:text-6xl">Checkout</h1>
      <Suspense fallback={<p className="text-ivory-soft">Loading…</p>}>
        <Form />
      </Suspense>
    </div>
  );
}
