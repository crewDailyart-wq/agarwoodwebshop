"use client";

import Link from "next/link";
import { pricesConfirmed, type Product } from "@/content/catalog";
import { cart } from "@/lib/cart";
import { formatMoney } from "@/lib/money";
import { CartIcon } from "./icons";
import { PhotoSlot } from "./PhotoSlot";

/** Framed product tile: photo, small-caps name, gold sub-label, price and a gold cart button. */
export function ProductCard({ product }: { product: Product }) {
  const soldOut = product.stock === 0;
  return (
    <article className="frame group flex flex-col bg-night/80 transition-colors hover:border-gold">
      <Link href={`/shop/${product.slug}`} className="block" tabIndex={-1} aria-hidden>
        <PhotoSlot
          photo={product.photos[0]}
          quiet
          className="aspect-[5/4] w-full"
          sizes="(min-width: 1024px) 20vw, (min-width: 640px) 45vw, 100vw"
        />
      </Link>
      <div className="flex flex-1 flex-col px-5 pb-5 pt-5">
        <h3 className="eyebrow !text-[0.68rem] leading-relaxed">
          <Link href={`/shop/${product.slug}`} className="hover:text-gold-bright">
            {product.name}
          </Link>
        </h3>
        <p className="eyebrow eyebrow-gold mt-1 !text-[0.52rem]">{product.cardLabel}</p>
        <div className="mt-auto flex items-end justify-between gap-3 pt-5">
          <p className="font-[family-name:var(--font-display)] text-[1.45rem] leading-none tabular-nums">
            {formatMoney(product.priceCents)}
            {!pricesConfirmed && (
              <span className="eyebrow mt-1 block !text-[0.48rem] !text-ivory-faint">preview price</span>
            )}
          </p>
          <button
            type="button"
            disabled={soldOut}
            onClick={() => cart.add(product.id)}
            aria-label={soldOut ? `${product.name} is unavailable` : `Add ${product.name} to cart`}
            className="flex h-10 w-11 shrink-0 items-center justify-center bg-gold text-ink transition-colors hover:bg-gold-bright disabled:opacity-40"
          >
            <CartIcon className="h-5 w-5" />
          </button>
        </div>
      </div>
    </article>
  );
}
