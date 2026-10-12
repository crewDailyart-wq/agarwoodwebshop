import { pricesConfirmed } from "@/content/catalog";
import { formatMoney } from "@/lib/money";

export function Price({ cents, className = "" }: { cents: number; className?: string }) {
  return (
    <span className={className}>
      {formatMoney(cents)}
      {!pricesConfirmed && (
        <span className="ml-2 align-middle text-[0.62rem] uppercase tracking-[0.18em] text-gold">
          preview price
        </span>
      )}
    </span>
  );
}
