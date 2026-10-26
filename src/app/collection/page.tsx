import type { Metadata } from "next";
import { ProductCard } from "@/components/ProductCard";
import { productList } from "@/content/catalog";

export const metadata: Metadata = {
  title: "Collection",
  description: "High Grade Vietnamese Agarwood Chips, The Incense Burner, and the Complete Agarwood Set.",
};

export default function CollectionPage() {
  return (
    <div className="mx-auto max-w-[1400px] px-5 pb-16 pt-14 sm:px-8 sm:pt-20">
      <p className="eyebrow eyebrow-gold">The collection</p>
      <div className="mt-3 flex flex-wrap items-end justify-between gap-6">
        <h1 className="display text-5xl sm:text-6xl">Two Essentials. One Ritual.</h1>
        <p className="max-w-sm text-[1.05rem] italic text-ivory-soft">
          A deliberately small collection: the agarwood, the burner made for it, and both together.
        </p>
      </div>
      <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {productList.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </div>
  );
}
