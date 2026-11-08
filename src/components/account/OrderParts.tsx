import { progressOf, progressSteps, statusLabel, type OrderStatus } from "@/lib/order-status";

const tone: Record<OrderStatus, string> = {
  pending: "border-gold-line text-ivory-soft",
  awaiting_transfer: "border-gold-line text-ivory-soft",
  awaiting_cash: "border-gold-line text-ivory-soft",
  paid: "border-gold text-gold-bright",
  shipped: "border-gold text-gold-bright",
  delivered: "border-[#6fae86] text-[#a8d9b9]",
  cancelled: "border-[#b4533f] text-[#f1c2b6]",
  failed: "border-[#b4533f] text-[#f1c2b6]",
  expired: "border-[#b4533f] text-[#f1c2b6]",
};

export function StatusBadge({ status }: { status: OrderStatus }) {
  return (
    <span
      className={`inline-block border px-3 py-1 font-[family-name:var(--font-caps)] text-[0.62rem] uppercase tracking-[0.16em] ${tone[status]}`}
    >
      {statusLabel[status]}
    </span>
  );
}

/** Placed → Paid → Shipped → Delivered. Ended orders (cancelled, failed) show no steps. */
export function OrderProgress({ status }: { status: OrderStatus }) {
  const reached = progressOf(status);
  if (reached === 0) return null;
  return (
    <ol className="grid grid-cols-4" aria-label="Order progress">
      {progressSteps.map((step, i) => {
        const done = i < reached;
        return (
          <li key={step} className="relative pt-6 text-center">
            {i > 0 && (
              <span
                aria-hidden
                className={`absolute left-[-50%] right-[50%] top-[0.6rem] h-px ${done ? "bg-gold" : "bg-gold-hair"}`}
              />
            )}
            <span
              aria-hidden
              className={`absolute left-1/2 top-1 h-3.5 w-3.5 -translate-x-1/2 rotate-45 border ${
                done ? "border-gold bg-gold" : "border-gold-line bg-night"
              }`}
            />
            <span className={`text-sm ${done ? "text-ivory" : "text-ivory-faint"}`}>{step}</span>
          </li>
        );
      })}
    </ol>
  );
}
