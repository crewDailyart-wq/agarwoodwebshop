"use client";

import type { ProductId } from "@/content/catalog";
import { cart } from "@/lib/cart";
import { CartIcon } from "./icons";

/** The square gold add-to-cart button used on product tiles. */
export function CartIconButton({ id, name, soldOut = false }: { id: ProductId; name: string; soldOut?: boolean }) {
  return (
    <button
      type="button"
      disabled={soldOut}
      onClick={() => cart.add(id)}
      aria-label={soldOut ? `${name} is unavailable` : `Add ${name} to cart`}
      className="flex h-11 w-12 shrink-0 items-center justify-center bg-gold text-ink transition-colors hover:bg-gold-bright disabled:opacity-40"
    >
      <CartIcon className="h-5 w-5" />
    </button>
  );
}
