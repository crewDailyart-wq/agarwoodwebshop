import { pricesConfirmed } from "@/content/catalog";
import { formatMoney } from "@/lib/money";

/**
 * A price. `final` marks one the owner has confirmed (otherwise it is labelled "preview price");
 * `from` is for a product with weight options, whose lowest price is shown.
 */
export function Price({
  cents,
  className = "",
  final = pricesConfirmed,
  from = false,
}: {
  cents: number;
  className?: string;
  final?: boolean;
  from?: boolean;
}) {
  return (
    <span className={className}>
      {from && <span className="mr-2 align-middle text-[0.62rem] uppercase tracking-[0.18em] text-ivory-faint">from</span>}
      {formatMoney(cents)}
      {!final && (
        <span className="ml-2 align-middle text-[0.62rem] uppercase tracking-[0.18em] text-ivory-faint">
          preview price
        </span>
      )}
    </span>
  );
}
