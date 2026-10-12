/**
 * Brand and store configuration. Everything here is editable.
 * Nothing in this file is a verified fact about the goods: facts about sourcing
 * live in `catalog.ts` under `provenance` and stay `null` until verified.
 */
export const site = {
  /** Working brand name. Change here and it changes everywhere. */
  name: "AURUM OUD",
  tagline: "Nature's Rarest Fragrance",
  motto: "Rare woods. Higher lives.",
  description:
    "Genuine agarwood chips for burning, and an incense burner made for them. One chip. One burner. One ritual.",
  /** Set NEXT_PUBLIC_SITE_URL in production. */
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  contactEmail: null as string | null, // TODO: owner to supply
  social: [] as { label: string; href: string }[], // TODO: owner to supply
  currency: "EUR" as const,
  locale: "en-NL",
};

/**
 * Shipping rules are configuration, not invention. `null` = not yet decided;
 * the UI then says shipping is calculated and checkout refuses to complete
 * until the owner has set the rules.
 */
export const shipping = {
  /** Countries we ship to (ISO 3166-1 alpha-2). */
  countries: [{ code: "NL", name: "Netherlands" }] as { code: string; name: string }[],
  /** Flat rate in cents per country code; `null` = not configured. */
  flatRateCents: null as Record<string, number> | null,
  /** Free shipping from this order value in cents; `null` = never. */
  freeFromCents: null as number | null,
  /** Delivery estimate shown to customers, e.g. "2–4 working days". */
  deliveryEstimate: null as string | null,
};

/** Tax handling is the owner's decision: prices are treated as VAT-inclusive. */
export const tax = {
  pricesIncludeVat: true,
  vatRatePercent: null as number | null, // TODO: owner / accountant
};
