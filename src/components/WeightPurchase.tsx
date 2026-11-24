"use client";

import { useState } from "react";
import { priceIsFinal, type Product } from "@/content/catalog";
import { cart } from "@/lib/cart";
import { formatMoney } from "@/lib/money";

/**
 * Choose a weight, then a number of packs, then add to cart. Each weight shows its price and the
 * price per gram, so the bigger packs are clearly the better value. A native radio group, so it works
 * with the keyboard and screen readers.
 */
export function WeightPurchase({ product, soldOut = false }: { product: Product; soldOut?: boolean }) {
  const options = product.variants;
  const [selected, setSelected] = useState(options[0].id);
  const [quantity, setQuantity] = useState(1);
  const current = options.find((o) => o.id === selected) ?? options[0];
  const final = priceIsFinal(product);

  return (
    <div className="space-y-6">
      <fieldset>
        <legend className="eyebrow eyebrow-gold mb-4 !text-[0.72rem] !tracking-[0.3em]">Choose your weight</legend>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {options.map((o) => {
            const active = o.id === selected;
            return (
              <label
                key={o.id}
                className={`frame relative flex min-h-[6.5rem] cursor-pointer flex-col items-center justify-center gap-1 px-2 py-4 text-center transition-colors has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-gold ${
                  active ? "border-gold bg-gold/15" : "bg-night/50 hover:border-gold"
                }`}
              >
                <input
                  type="radio"
                  name={`weight-${product.id}`}
                  value={o.id}
                  checked={active}
                  onChange={() => setSelected(o.id)}
                  className="sr-only"
                />
                <span className="font-[family-name:var(--font-display)] text-2xl leading-none text-ivory">{o.label}</span>
                <span className="tabular-nums text-gold-bright">{formatMoney(o.priceCents)}</span>
                {o.grams && (
                  <span className="text-[0.7rem] tabular-nums text-ivory-faint">
                    {formatMoney(Math.round(o.priceCents / o.grams))} per gram
                  </span>
                )}
                {active && (
                  <span aria-hidden className="absolute right-1.5 top-1.5 h-1.5 w-1.5 rotate-45 bg-gold" />
                )}
              </label>
            );
          })}
        </div>
        {!final && <p className="mt-3 text-xs text-ivory-faint">Preview prices.</p>}
      </fieldset>

      {soldOut ? (
        <button type="button" className="btn btn-line" disabled>
          Currently unavailable
        </button>
      ) : (
        <div className="flex flex-wrap items-stretch gap-3">
          <div className="flex min-h-12 items-center border border-gold-line" role="group" aria-label="Number of packs">
            <button
              type="button"
              aria-label="Decrease quantity"
              className="h-12 w-12 text-lg text-ivory-soft hover:text-gold"
              onClick={() => setQuantity((q) => Math.max(1, q - 1))}
            >
              −
            </button>
            <span className="w-8 text-center text-sm tabular-nums" aria-live="polite">
              {quantity}
            </span>
            <button
              type="button"
              aria-label="Increase quantity"
              className="h-12 w-12 text-lg text-ivory-soft hover:text-gold"
              onClick={() => setQuantity((q) => Math.min(10, q + 1))}
            >
              +
            </button>
          </div>
          <button
            type="button"
            className="btn btn-solid flex-1"
            onClick={() => cart.add(product.id, quantity, current.id)}
          >
            Add {current.label} to cart · {formatMoney(current.priceCents * quantity)}
          </button>
        </div>
      )}
    </div>
  );
}
