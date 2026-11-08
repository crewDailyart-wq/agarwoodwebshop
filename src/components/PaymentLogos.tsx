"use client";

import { useState } from "react";
import type { PaymentMethod } from "@/content/payments";

/** One payment method: Mollie's logo on a light tile; its name if the logo can't load. */
function PaymentLogo({ method }: { method: PaymentMethod }) {
  const [failed, setFailed] = useState(false);
  return (
    <li
      title={method.name}
      className="flex h-10 min-w-[3.25rem] items-center justify-center rounded-md border border-gold-line bg-white px-2 shadow-[0_1px_0_rgb(0_0_0/0.25)]"
    >
      {failed ? (
        <span className="text-[0.62rem] font-semibold leading-tight text-[#1c2a22]">{method.name}</span>
      ) : (
        // eslint-disable-next-line @next/next/no-img-element -- Mollie's own hosted logos, tiny SVGs
        <img
          src={method.logo}
          alt={method.name}
          loading="lazy"
          height={24}
          className="h-6 w-auto max-w-[4.5rem] object-contain"
          onError={() => setFailed(true)}
        />
      )}
    </li>
  );
}

/** The logos of the payment methods Mollie offers. */
export function PaymentLogos({
  methods,
  className = "",
}: {
  methods: PaymentMethod[];
  className?: string;
}) {
  return (
    <ul className={`flex flex-wrap gap-2 ${className}`} aria-label="Payment methods offered by Mollie">
      {methods.map((m) => (
        <PaymentLogo key={m.id} method={m} />
      ))}
    </ul>
  );
}
