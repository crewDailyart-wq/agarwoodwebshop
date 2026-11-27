/**
 * Delivery options. Pure functions, safe to use in the browser and on the server, so the
 * checkout shows exactly the price the server will charge.
 *
 * Rules: the Netherlands and Belgium are always free; elsewhere shipping is free from the
 * threshold, and otherwise costs the price of the carrier the customer chooses for their zone.
 */
export const carriers = [
  { id: "postnl", name: "PostNL" },
  { id: "dhl", name: "DHL" },
  { id: "ups", name: "UPS" },
] as const;

export type CarrierId = (typeof carriers)[number]["id"];
export type Zone = "home" | "europe" | "world";
/** Price in cents per carrier and zone; `null` = not set yet, which hides that option. */
export type ShippingRates = Record<CarrierId, { europe: number | null; world: number | null }>;

const EUROPE = new Set(
  (
    "AT BE BG HR CY CZ DK EE FI FR DE GR HU IE IT LV LT LU MT NL PL PT RO SK SI ES SE " +
    "GB CH NO IS LI AD MC SM VA AL BA ME MK RS XK MD UA"
  ).split(" "),
);

export function zoneOf(country: string): Zone {
  if (country === "NL" || country === "BE") return "home";
  return EUROPE.has(country) ? "europe" : "world";
}

export function estimateFor(zone: Zone): string {
  return zone === "home" ? "2–4 working days" : "5–10 working days";
}

export type ShippingOption = { carrier: CarrierId; name: string; cents: number; estimate: string };

export function shippingOptions(
  country: string,
  subtotalCents: number,
  rates: ShippingRates,
  freeFromCents: number | null,
): ShippingOption[] {
  const zone = zoneOf(country);
  const free = zone === "home" || (freeFromCents !== null && subtotalCents >= freeFromCents);
  const out: ShippingOption[] = [];
  for (const c of carriers) {
    const rate = zone === "home" ? 0 : rates[c.id][zone];
    if (rate === null) continue; // this carrier isn't offered for this zone yet
    const price = free ? 0 : rate;
    out.push({ carrier: c.id, name: c.name, cents: price, estimate: estimateFor(zone) });
  }
  return out;
}
