import { worldwide } from "./countries";
/**
 * Brand and store configuration. Everything here is editable.
 * Nothing in this file is a verified fact about the goods: facts about sourcing
 * live in `catalog.ts` under `provenance` and stay `null` until verified.
 */
export const site = {
  /** Working brand name. Change here and it changes everywhere. */
  name: "ALUWWAH",
  tagline: "True Agarwood from Different Parts of Asia",
  motto: "Rare woods. Higher lives.",
  description:
    "Genuine agarwood chips for burning, and an incense burner made for them. One chip. One burner. One ritual.",
  /** Set NEXT_PUBLIC_SITE_URL in production. */
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  contactEmail: "alluwah@hotmail.com" as string | null, // owner, Nov 2026
  /** Wholesale phone numbers: `display` is shown, `tel` is the dialable form (country code, no 0). */
  wholesalePhones: [
    { display: "+31 6 17720465", tel: "+31617720465" },
    { display: "+31 6 85163960", tel: "+31685163960" },
  ],
  /** Legal details shown on /about. Fill in; empty ones are simply not shown. */
  legal: {
    legalName: "Rifindustries" as string | null, // registered business name, if different from ALUWWAH
    kvk: "97138509" as string | null, // Chamber of Commerce (KvK) number
    vatId: "NL005249968B31" as string | null, // BTW-id, e.g. NL000000000B01
    address: "Ruige Hoek 18, 4731 VW Oudenbosch" as string | null, // visiting address, one line
  },
  /** Featured video in the footer: the 11-character YouTube id, or null to hide. */
  featuredVideo: {
    id: "EyXNvkG2hWA" as string | null,
    title: "لماذا يستجيب الكون للرياضيات؟ | فيدمغه 04 | الشيخ فايز الكندري",
    channel: "Fayez Alkandari",
  },
  social: [] as { label: string; href: string }[], // TODO: owner to supply
  currency: "EUR" as const,
  locale: "en-NL",
  /** The charity featured in the homepage charity section. */
  charity: {
    name: "Madinah Global Foundation",
    /** Its website; the section's buttons link to #donate and #work on it. */
    url: "https://madinahglobal.org/",
  },
};

/**
 * Shipping rules are configuration, not invention. `null` = not yet decided;
 * the UI then says shipping is calculated and checkout refuses to complete
 * until the owner has set the rules.
 */
export const shipping = {
  /** Countries we ship to (ISO 3166-1 alpha-2). */
  countries: worldwide,
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
