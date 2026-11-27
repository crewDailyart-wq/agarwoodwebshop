"use client";

import Link from "next/link";
import { useState } from "react";
import { getProduct, getVariant, unitPriceCents } from "@/content/catalog";
import { cartSubtotalCents, lineKey, useCartLines } from "@/lib/cart";
import type { ShippingInfo } from "@/lib/checkout";
import { shippingOptions } from "@/lib/shipping";
import { formatMoney } from "@/lib/money";
import type { PaymentMethod } from "@/content/payments";
import { PaymentLogos } from "./PaymentLogos";

const field =
  "w-full min-h-12 border border-gold-line bg-transparent px-4 text-ivory placeholder:text-ivory-faint focus:border-gold focus:outline-none";

type PayChoice = "online" | "bank-transfer" | "cash";

export function CheckoutForm({
  info,
  paymentsReady,
  methods,
  bankReady,
  cashReady,
}: {
  info: ShippingInfo;
  paymentsReady: boolean;
  methods: PaymentMethod[];
  bankReady: boolean;
  cashReady: boolean;
}) {
  const lines = useCartLines();
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [pay, setPay] = useState<PayChoice>(paymentsReady ? "online" : bankReady ? "bank-transfer" : "cash");

  const subtotal = cartSubtotalCents(lines);
  const [country, setCountry] = useState(info.countries[0]?.code ?? "NL");
  const [carrier, setCarrier] = useState<string>("postnl");
  const options = shippingOptions(country, subtotal, info.rates, info.freeFromCents);
  const chosen = options.find((o) => o.carrier === carrier) ?? options[0];
  const shipping = chosen ? chosen.cents : null;
  const payAvailable = pay === "online" ? paymentsReady : pay === "bank-transfer" ? bankReady : cashReady;
  const canOrder = lines.length > 0 && shipping !== null && payAvailable;

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
          paymentMethod: pay,
          carrier: chosen?.carrier,
          acceptedTerms: data.get("acceptTerms") === "on",
        }),
      });
      const json = (await res.json()) as { checkoutUrl?: string; redirectTo?: string; error?: string };
      const next = json.checkoutUrl ?? json.redirectTo;
      if (!res.ok || !next) {
        setError(json.error ?? "Something went wrong. Please try again.");
        setBusy(false);
        return;
      }
      window.location.assign(next);
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
              value={country}
              onChange={(e) => setCountry(e.target.value)}
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

        <fieldset className="space-y-3">
          <legend className="eyebrow mb-4">Shipping method</legend>
          {options.length === 0 && (
            <p role="status" className="border border-gold-line p-4 text-sm text-ivory-soft">
              Delivery prices for this country aren&apos;t available yet. Please contact us and we will help you.
            </p>
          )}
          {options.map((o) => (
            <label
              key={o.carrier}
              className={`flex cursor-pointer items-center justify-between gap-4 border p-4 text-sm ${
                chosen?.carrier === o.carrier ? "border-gold bg-black/30" : "border-gold-line"
              }`}
            >
              <span className="flex items-center gap-3">
                <input
                  type="radio"
                  name="carrier"
                  value={o.carrier}
                  checked={chosen?.carrier === o.carrier}
                  onChange={() => setCarrier(o.carrier)}
                  className="accent-[#c9a24a]"
                />
                <span>
                  {o.name}
                  <span className="block text-xs text-ivory-faint">{o.estimate}</span>
                </span>
              </span>
              <span className="tabular-nums">{o.cents === 0 ? "Free" : formatMoney(o.cents)}</span>
            </label>
          ))}
        </fieldset>

        <fieldset className="space-y-3">
          <legend className="eyebrow mb-4">Payment</legend>
          {(
            [
              {
                id: "online",
                title: "Pay online with Mollie",
                ready: paymentsReady,
                body: (
                  <>
                    <span className="block text-sm text-ivory-soft">
                      You choose your method on the next, secure Mollie page.
                    </span>
                    <PaymentLogos methods={methods} className="mt-3" />
                  </>
                ),
              },
              {
                id: "bank-transfer",
                title: "Direct bank transfer",
                ready: bankReady,
                body: (
                  <span className="block text-sm text-ivory-soft">
                    After you order, you see our bank details and your payment reference. We send your
                    order once the payment has arrived.
                  </span>
                ),
              },
              {
                id: "cash",
                title: "Cash, sent by post",
                ready: cashReady,
                body: (
                  <span className="block text-sm text-ivory-soft">
                    After you order, you see where to send the cash and your payment reference. We send
                    your order once the cash has arrived. Cash sent by post is at your own risk.
                  </span>
                ),
              },
            ] as const
          ).map((opt) => (
            <label
              key={opt.id}
              className={`block cursor-pointer border p-4 transition-colors ${
                pay === opt.id ? "border-gold bg-gold/[0.07]" : "border-gold-line"
              } ${opt.ready ? "" : "cursor-not-allowed opacity-60"}`}
            >
              <span className="flex items-center gap-3">
                <input
                  type="radio"
                  name="pay"
                  value={opt.id}
                  checked={pay === opt.id}
                  disabled={!opt.ready}
                  onChange={() => setPay(opt.id)}
                  className="h-4 w-4 accent-[#c9a05a]"
                />
                <span className="text-base text-ivory">{opt.title}</span>
                {!opt.ready && <span className="text-xs text-ivory-faint">Not available yet</span>}
              </span>
              <span className="mt-2 block pl-7">{opt.body}</span>
            </label>
          ))}
        </fieldset>

        {!paymentsReady && !bankReady && !cashReady && (
          <p role="status" className="border border-gold-line p-4 text-sm text-ivory-soft">
            Payments aren&apos;t switched on yet, so orders can&apos;t be placed.
          </p>
        )}
        {paymentsReady && shipping === null && (
          <p role="status" className="border border-gold-line p-4 text-sm text-ivory-soft">
            Delivery isn&apos;t available for this country yet, so the order can&apos;t be placed.
          </p>
        )}
        {error && (
          <p role="alert" className="border border-gold p-4 text-sm">
            {error}
          </p>
        )}

        <label className="flex items-start gap-3 text-sm text-ivory-soft">
          <input type="checkbox" name="acceptTerms" required className="mt-1 h-4 w-4 accent-[#c9a24a]" />
          <span>
            I have read and agree to the{" "}
            <Link href="/terms" target="_blank" className="underline decoration-gold/50 underline-offset-4 hover:text-gold-bright">
              terms and conditions
            </Link>{" "}
            (including the 14-day right of withdrawal) and the{" "}
            <Link href="/privacy" target="_blank" className="underline decoration-gold/50 underline-offset-4 hover:text-gold-bright">
              privacy policy
            </Link>
            .
          </span>
        </label>

        <button type="submit" disabled={!canOrder || busy} className="btn btn-solid w-full sm:w-auto">
          {busy ? "One moment…" : pay === "online" ? "Continue to payment" : "Place order"}
        </button>
        <p className="text-xs text-ivory-faint">No account needed.</p>
      </form>

      <aside aria-label="Order summary" className="h-fit border border-gold-line p-6">
        <h2 className="eyebrow mb-6">Order summary</h2>
        <ul className="divide-y divide-gold-line">
          {lines.map((line) => {
            const p = getProduct(line.id);
            if (!p) return null;
            return (
              <li key={lineKey(line)} className="flex justify-between gap-4 py-3 text-sm">
                <span>
                  {p.name}
                  {getVariant(p, line.variantId) && (
                    <span className="text-ivory-soft"> — {getVariant(p, line.variantId)!.label}</span>
                  )}{" "}
                  <span className="text-ivory-faint">× {line.quantity}</span>
                </span>
                <span className="tabular-nums">{formatMoney(unitPriceCents(p, line.variantId) * line.quantity)}</span>
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
        {chosen && (
          <p className="mt-4 text-xs text-ivory-faint">
            {chosen.name} · estimated delivery: {chosen.estimate}
          </p>
        )}
      </aside>
    </div>
  );
}
