"use client";

import { cart, cartCount, useCartLines } from "@/lib/cart";
import { BagIcon } from "./icons";

export function CartButton() {
  const count = cartCount(useCartLines());
  return (
    <button
      type="button"
      onClick={() => cart.openDrawer()}
      className="relative flex h-11 w-11 items-center justify-center text-gold-deep hover:text-emerald"
      aria-label={`Open cart, ${count} item${count === 1 ? "" : "s"}`}
    >
      <BagIcon className="h-6 w-6" />
      <span
        className="absolute right-1 top-1.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-emerald px-1 font-[family-name:var(--font-caps)] text-[0.55rem] font-semibold text-gold-bright"
        suppressHydrationWarning
      >
        {count}
      </span>
    </button>
  );
}
