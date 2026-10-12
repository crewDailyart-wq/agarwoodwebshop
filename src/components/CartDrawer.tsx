"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { getProduct } from "@/content/catalog";
import { cart, cartSubtotalCents, useCartLines, useCartOpen } from "@/lib/cart";
import { formatMoney } from "@/lib/money";

export function CartDrawer() {
  const open = useCartOpen();
  const lines = useCartLines();
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && cart.closeDrawer();
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50" role="dialog" aria-modal="true" aria-label="Your cart">
      <button
        type="button"
        aria-label="Close cart"
        className="absolute inset-0 bg-aubergine/80"
        onClick={() => cart.closeDrawer()}
        tabIndex={-1}
      />
      <aside className="absolute inset-y-0 right-0 flex w-full max-w-md flex-col border-l border-gold-line bg-aubergine">
        <header className="flex items-center justify-between px-6 py-5">
          <h2 className="display text-2xl">Your cart</h2>
          <button
            ref={closeRef}
            type="button"
            onClick={() => cart.closeDrawer()}
            className="eyebrow !text-ivory min-h-11 px-2"
          >
            Close
          </button>
        </header>
        <hr className="hairline" />

        {lines.length === 0 ? (
          <div className="flex flex-1 flex-col items-start justify-center gap-6 px-6">
            <p className="display text-3xl text-ivory-soft">Nothing here yet.</p>
            <Link
              href="/shop/the-complete-ritual"
              onClick={() => cart.closeDrawer()}
              className="btn btn-line"
            >
              Discover the Complete Ritual
            </Link>
          </div>
        ) : (
          <>
            <ul className="flex-1 divide-y divide-gold-line overflow-y-auto px-6">
              {lines.map((line) => {
                const product = getProduct(line.id);
                if (!product) return null;
                return (
                  <li key={line.id} className="py-5">
                    <div className="flex justify-between gap-4">
                      <div>
                        <Link
                          href={`/shop/${product.slug}`}
                          onClick={() => cart.closeDrawer()}
                          className="display text-xl hover:text-gold"
                        >
                          {product.name}
                        </Link>
                        <p className="text-sm text-ivory-faint">{product.subtitle}</p>
                      </div>
                      <p className="tabular-nums">{formatMoney(product.priceCents * line.quantity)}</p>
                    </div>
                    <div className="mt-3 flex items-center justify-between">
                      <div className="flex items-center border border-gold-line">
                        <button
                          type="button"
                          aria-label={`Decrease quantity of ${product.name}`}
                          className="h-11 w-11 text-ivory-soft hover:text-gold"
                          onClick={() => cart.setQuantity(line.id, line.quantity - 1)}
                        >
                          −
                        </button>
                        <span className="w-8 text-center text-sm tabular-nums">{line.quantity}</span>
                        <button
                          type="button"
                          aria-label={`Increase quantity of ${product.name}`}
                          className="h-11 w-11 text-ivory-soft hover:text-gold"
                          onClick={() => cart.setQuantity(line.id, line.quantity + 1)}
                        >
                          +
                        </button>
                      </div>
                      <button
                        type="button"
                        onClick={() => cart.remove(line.id)}
                        className="min-h-11 text-xs uppercase tracking-[0.18em] text-ivory-faint hover:text-gold"
                      >
                        Remove
                      </button>
                    </div>
                  </li>
                );
              })}
            </ul>
            <footer className="border-t border-gold-line px-6 py-5">
              <div className="mb-1 flex justify-between">
                <span className="eyebrow">Subtotal</span>
                <span className="tabular-nums">{formatMoney(cartSubtotalCents(lines))}</span>
              </div>
              <p className="mb-4 text-xs text-ivory-faint">Shipping is calculated at checkout.</p>
              <Link
                href="/checkout"
                onClick={() => cart.closeDrawer()}
                className="btn btn-solid w-full"
              >
                Checkout
              </Link>
            </footer>
          </>
        )}
      </aside>
    </div>
  );
}
