"use client";

import type { ProductId } from "@/content/catalog";
import { cart } from "@/lib/cart";
import { CartIcon } from "./icons";

/** The square deep-emerald add-to-cart button (gold icon, on the noble-white card panels) used on product tiles. */
export function CartIconButton({ id, name, soldOut = false }: { id: ProductId; name: string; soldOut?: boolean }) {
  return (
    <button
      type="button"
      disabled={soldOut}
      onClick={() => cart.add(id)}
      aria-label={soldOut ? `${name} is unavailable` : `Add ${name} to cart`}
      className="flex h-11 w-12 shrink-0 items-center justify-center bg-emerald text-gold-bright transition-colors hover:bg-gold hover:text-ink disabled:opacity-40"
    >
      <CartIcon className="h-5 w-5" />
    </button>
  );
}
