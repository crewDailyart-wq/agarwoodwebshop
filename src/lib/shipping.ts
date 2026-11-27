/**
 * Delivery options. Pure functions, safe to use in the browser and on the server, so the
 * checkout shows exactly the price the server will charge.
 *
 * Rules: each carrier has a price per zone (0 = free; null = not offered). Outside the Netherlands
 * and Belgium, shipping is free from the threshold.
 */
export const carriers = [
  { id: "postnl", name: "PostNL" },
  { id: "dhl", name: "DHL" },
  { id: "ups", name: "UPS" },
] as const;

export type CarrierId = (typeof carriers)[number]["id"];
export type Zone = "nl" | "be" | "europe" | "world";
/** Price in cents per carrier and zone; `null` = not set yet, which hides that option. */
export type ShippingRates = Record<CarrierId, Record<Zone, number | null>>;

const EUROPE = new Set(
  (
    "AT BE BG HR CY CZ DK EE FI FR DE GR HU IE IT LV LT LU MT NL PL PT RO SK SI ES SE " +
    "GB CH NO IS LI AD MC SM VA AL BA ME MK RS XK MD UA"
  ).split(" "),
);

export function zoneOf(country: string): Zone {
  if (country === "NL") return "nl";
  if (country === "BE") return "be";
  return EUROPE.has(country) ? "europe" : "world";
}

export function estimateFor(zone: Zone): string {
  return zone === "nl" || zone === "be" ? "2–4 working days" : "5–10 working days";
}

export type ShippingOption = { carrier: CarrierId; name: string; cents: number; estimate: string };

export function shippingOptions(
  country: string,
  subtotalCents: number,
  rates: ShippingRates,
  freeFromCents: number | null,
): ShippingOption[] {
  const zone = zoneOf(country);
  // The free-shipping threshold only applies outside the Netherlands and Belgium, where the
  // price of each carrier (0 for free ones) is charged at any order value.
  const free = zone !== "nl" && zone !== "be" && freeFromCents !== null && subtotalCents >= freeFromCents;
  const out: ShippingOption[] = [];
  for (const c of carriers) {
    const rate = rates[c.id][zone];
    if (rate === null) continue; // this carrier isn't offered for this zone yet
    const price = free ? 0 : rate;
    out.push({ carrier: c.id, name: c.name, cents: price, estimate: estimateFor(zone) });
  }
  return out;
}
