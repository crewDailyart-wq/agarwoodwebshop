"use client";

import Link from "next/link";
import { useState } from "react";
import { getProduct } from "@/content/catalog";
import { cartSubtotalCents, useCartLines } from "@/lib/cart";
import type { ShippingInfo } from "@/lib/checkout";
import { shippingFor } from "@/lib/checkout";
import { formatMoney } from "@/lib/money";

const field =
  "w-full min-h-12 border border-gold-line bg-transparent px-4 text-ivory placeholder:text-ivory-faint focus:border-gold focus:outline-none";

export function CheckoutForm({
  info,
  paymentsReady,
}: {
  info: ShippingInfo;
  paymentsReady: boolean;
}) {
  const lines = useCartLines();
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const subtotal = cartSubtotalCents(lines);
  const shipping = shippingFor(subtotal, info);
  const canOrder = lines.length > 0 && shipping !== null && paymentsReady;

  if (lines.length === 0) {
    return (
      <div className="py-10">
        <p className="display text-3xl text-ivory-soft">Your cart is empty.</p>
        <Link href="/shop/the-complete-ritual" className="btn btn-line mt-8">
          Discover the Complete Agarwood Set
        </Link>
      </div>
    );
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setBusy(true);
    const data = new FormData(e.currentTarget);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: lines,
          customer: Object.fromEntries(data),
        }),
      });
      const json = (await res.json()) as { checkoutUrl?: string; error?: string };
      if (!res.ok || !json.checkoutUrl) {
        setError(json.error ?? "Something went wrong. Please try again.");
        setBusy(false);
        return;
      }
      window.location.assign(json.checkoutUrl);
    } catch {
      setError("We couldn't reach the server. Please try again.");
      setBusy(false);
    }
  }

  return (
    <div className="grid gap-16 lg:grid-cols-[1.2fr_1fr]">
      <form onSubmit={onSubmit} className="space-y-10" noValidate={false}>
        <fieldset className="space-y-4">
          <legend className="eyebrow mb-4">Contact</legend>
          <label className="block text-sm">
            <span className="mb-2 block text-ivory-soft">Email</span>
            <input name="email" type="email" required autoComplete="email" className={field} />
          </label>
        </fieldset>

        <fieldset className="space-y-4">
          <legend className="eyebrow mb-4">Delivery</legend>
          <label className="block text-sm">
            <span className="mb-2 block text-ivory-soft">Full name</span>
            <input name="name" required autoComplete="name" className={field} />
          </label>
          <label className="block text-sm">
            <span className="mb-2 block text-ivory-soft">Street and number</span>
            <input name="street" required autoComplete="street-address" className={field} />
          </label>
          <div className="grid grid-cols-[1fr_2fr] gap-4">
            <label className="block text-sm">
              <span className="mb-2 block text-ivory-soft">Postcode</span>
              <input name="postalCode" required autoComplete="postal-code" className={field} />
            </label>
            <label className="block text-sm">
              <span className="mb-2 block text-ivory-soft">City</span>
              <input name="city" required autoComplete="address-level2" className={field} />
            </label>
          </div>
          <label className="block text-sm">
            <span className="mb-2 block text-ivory-soft">Country</span>
            <select
              name="country"
              required
              autoComplete="country"
              defaultValue={info.countries[0]?.code}
              className={field}
            >
              {info.countries.map((c) => (
                <option key={c.code} value={c.code} className="bg-aubergine">
                  {c.name}
                </option>
              ))}
            </select>
          </label>
        </fieldset>

        {!paymentsReady && (
          <p role="status" className="border border-gold-line p-4 text-sm text-ivory-soft">
            Payments aren&apos;t switched on yet, so orders can&apos;t be placed.
          </p>
        )}
        {paymentsReady && shipping === null && (
          <p role="status" className="border border-gold-line p-4 text-sm text-ivory-soft">
            Shipping costs haven&apos;t been set yet, so orders can&apos;t be placed.
          </p>
        )}
        {error && (
          <p role="alert" className="border border-gold p-4 text-sm">
            {error}
          </p>
        )}

        <button type="submit" disabled={!canOrder || busy} className="btn btn-solid w-full sm:w-auto">
          {busy ? "One moment…" : "Continue to payment"}
        </button>
        <p className="text-xs text-ivory-faint">
          You&apos;ll choose how to pay — including iDEAL — on the next, secure page. No account needed.
        </p>
      </form>

      <aside aria-label="Order summary" className="h-fit border border-gold-line p-6">
        <h2 className="eyebrow mb-6">Order summary</h2>
        <ul className="divide-y divide-gold-line">
          {lines.map((line) => {
            const p = getProduct(line.id);
            if (!p) return null;
            return (
              <li key={line.id} className="flex justify-between gap-4 py-3 text-sm">
                <span>
                  {p.name} <span className="text-ivory-faint">× {line.quantity}</span>
                </span>
                <span className="tabular-nums">{formatMoney(p.priceCents * line.quantity)}</span>
              </li>
            );
          })}
        </ul>
        <dl className="mt-4 space-y-2 border-t border-gold-line pt-4 text-sm">
          <div className="flex justify-between">
            <dt className="text-ivory-soft">Subtotal</dt>
            <dd className="tabular-nums">{formatMoney(subtotal)}</dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-ivory-soft">Shipping</dt>
            <dd className="tabular-nums">
              {shipping === null ? "To be confirmed" : shipping === 0 ? "Free" : formatMoney(shipping)}
            </dd>
          </div>
          <div className="flex justify-between border-t border-gold-line pt-3 text-base">
            <dt>Total</dt>
            <dd className="tabular-nums">
              {shipping === null ? formatMoney(subtotal) : formatMoney(subtotal + shipping)}
            </dd>
          </div>
        </dl>
        {info.deliveryEstimate && (
          <p className="mt-4 text-xs text-ivory-faint">Estimated delivery: {info.deliveryEstimate}</p>
        )}
      </aside>
    </div>
  );
}
