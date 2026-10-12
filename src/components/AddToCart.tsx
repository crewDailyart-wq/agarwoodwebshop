"use client";

import { useState } from "react";
import type { ProductId } from "@/content/catalog";
import { cart } from "@/lib/cart";

export function AddToCart({
  id,
  soldOut = false,
  variant = "solid",
  label = "Add to cart",
  className = "",
}: {
  id: ProductId;
  soldOut?: boolean;
  variant?: "solid" | "line";
  label?: string;
  className?: string;
}) {
  const [quantity, setQuantity] = useState(1);

  if (soldOut) {
    return (
      <button type="button" className={`btn btn-line ${className}`} disabled>
        Currently unavailable
      </button>
    );
  }

  return (
    <div className="flex flex-wrap items-stretch gap-3">
      <div
        className="flex min-h-12 items-center border border-gold-line"
        role="group"
        aria-label="Quantity"
      >
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
        className={`btn ${variant === "solid" ? "btn-solid" : "btn-line"} flex-1 ${className}`}
        onClick={() => cart.add(id, quantity)}
      >
        {label}
      </button>
    </div>
  );
}
