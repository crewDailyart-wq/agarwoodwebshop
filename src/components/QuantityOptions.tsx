import type { Product } from "@/content/catalog";

/**
 * A framed gold bar that unfolds to show the quantities a customer can choose.
 * Uses <details>, so it works without JavaScript. Until the owner sets real
 * options (product.variants), it says the quantities are still to be decided.
 */
export function QuantityOptions({ product }: { product: Product }) {
  return (
    <details className="group frame relative bg-night/50 transition-colors open:border-gold hover:border-gold">
      <span aria-hidden className="pointer-events-none absolute inset-1 border border-gold-hair" />
      <summary className="relative flex min-h-14 cursor-pointer list-none items-center gap-4 px-5 [&::-webkit-details-marker]:hidden">
        <span aria-hidden className="h-1.5 w-1.5 shrink-0 rotate-45 bg-gold" />
        <span className="eyebrow flex-1 !text-[0.72rem] !tracking-[0.3em] !text-gold-bright">Choose quantity</span>
        <span
          aria-hidden
          className="flex h-8 w-8 items-center justify-center rounded-full border border-gold text-gold transition-transform duration-300 group-open:rotate-180"
        >
          <svg viewBox="0 0 16 16" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="1.6">
            <path d="M3.5 6l4.5 4.5L12.5 6" />
          </svg>
        </span>
      </summary>
      <div className="relative border-t border-gold-line px-5 pb-5 pt-4">
        {product.variants.length > 0 ? (
          <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3">
            {product.variants.map((v) => (
              <li key={v.id} className="frame px-3 py-2 text-center text-sm">
                {v.label}
              </li>
            ))}
          </ul>
        ) : (
          <p className="flex items-center justify-center gap-3 text-center italic text-ivory-soft">
            <span aria-hidden className="h-px w-8 bg-gold-line" />
            Quantity to be decided
            <span aria-hidden className="h-px w-8 bg-gold-line" />
          </p>
        )}
      </div>
    </details>
  );
}
