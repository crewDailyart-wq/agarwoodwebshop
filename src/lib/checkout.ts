import { getProduct, getVariant, lineName, unitPriceCents, type ProductId } from "@/content/catalog";
import { shipping, site } from "@/content/site";
import { shippingOptions, type ShippingRates } from "@/lib/shipping";

export type OrderLine = { id: ProductId; quantity: number; variantId?: string };

export type ShippingInfo = {
  countries: { code: string; name: string }[];
  rates: ShippingRates;
  freeFromCents: number | null;
};

export function getShippingInfo(): ShippingInfo {
  return { countries: shipping.countries, rates: shipping.rates, freeFromCents: shipping.freeFromCents };
}

/** The price the customer pays for the chosen carrier, or null if that option isn't available. */
export function shippingFor(
  country: string,
  carrier: string,
  subtotalCents: number,
  info: ShippingInfo,
): number | null {
  const opt = shippingOptions(country, subtotalCents, info.rates, info.freeFromCents).find((o) => o.carrier === carrier);
  return opt ? opt.cents : null;
}

/** Builds a trusted order from a client cart: catalog prices only, quantities clamped. */
export function priceOrder(input: unknown):
  | { ok: true; lines: (OrderLine & { name: string; unitCents: number })[]; subtotalCents: number }
  | { ok: false; error: string } {
  if (!Array.isArray(input) || input.length === 0) return { ok: false, error: "Your cart is empty." };

  const merged = new Map<string, { id: ProductId; variantId?: string; quantity: number }>();
  for (const raw of input) {
    const id = (raw as OrderLine)?.id;
    const qty = (raw as OrderLine)?.quantity;
    const variantId = (raw as OrderLine)?.variantId;
    const product = typeof id === "string" ? getProduct(id) : undefined;
    if (!product || !Number.isInteger(qty) || qty < 1 || qty > 10) {
      return { ok: false, error: "Your cart contains an item we don't recognise." };
    }
    // A product with weight options must come with one of them; one without must not.
    const optionOk =
      product.variants.length > 0
        ? typeof variantId === "string" && getVariant(product, variantId) !== undefined
        : variantId === undefined || variantId === null;
    if (!optionOk) return { ok: false, error: "Please choose a weight for the item in your cart." };
    if (product.stock !== null && product.stock < qty) {
      return { ok: false, error: `${product.name} is not available in that quantity.` };
    }
    const key = variantId ? `${product.id}:${variantId}` : product.id;
    const prev = merged.get(key);
    merged.set(key, {
      id: product.id,
      variantId: variantId ?? undefined,
      quantity: Math.min(10, (prev?.quantity ?? 0) + qty),
    });
  }

  const lines = [...merged.values()].map(({ id, variantId, quantity }) => {
    const p = getProduct(id)!;
    return {
      id,
      quantity,
      name: lineName(p, variantId),
      unitCents: unitPriceCents(p, variantId),
      ...(variantId ? { variantId } : {}),
    };
  });
  return {
    ok: true,
    lines,
    subtotalCents: lines.reduce((s, l) => s + l.unitCents * l.quantity, 0),
  };
}

export function centsToDecimal(cents: number): string {
  return (cents / 100).toFixed(2);
}

export const mollieConfigured = () => Boolean(process.env.MOLLIE_API_KEY);

export const orderDescription = (ref: string) => `${site.name} order ${ref}`;
