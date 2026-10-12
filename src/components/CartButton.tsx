"use client";

import { cart, cartCount, useCartLines } from "@/lib/cart";

export function CartButton() {
  const count = cartCount(useCartLines());
  return (
    <button
      type="button"
      onClick={() => cart.openDrawer()}
      className="eyebrow !text-ivory hover:!text-gold flex min-h-11 items-center gap-2 px-1"
      aria-label={`Open cart, ${count} item${count === 1 ? "" : "s"}`}
    >
      Cart
      <span className="tabular-nums text-ivory" suppressHydrationWarning>
        {count > 0 ? `(${count})` : ""}
      </span>
    </button>
  );
}
