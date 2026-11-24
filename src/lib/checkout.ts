import { getProduct, getVariant, lineName, unitPriceCents, type ProductId } from "@/content/catalog";
import { shipping, site } from "@/content/site";

export type OrderLine = { id: ProductId; quantity: number; variantId?: string };

export type ShippingInfo = {
  countries: { code: string; name: string }[];
  /** Flat rate in cents, or null if the owner hasn't configured shipping yet. */
  rateCents: number | null;
  freeFromCents: number | null;
  deliveryEstimate: string | null;
};

/**
 * Shipping comes from `content/site.ts`; env vars let the owner set a flat
 * rate without a code change: SHIPPING_FLAT_RATE_CENTS, SHIPPING_FREE_FROM_CENTS,
 * DELIVERY_ESTIMATE.
 */
export function getShippingInfo(): ShippingInfo {
  const envRate = process.env.SHIPPING_FLAT_RATE_CENTS;
  const envFree = process.env.SHIPPING_FREE_FROM_CENTS;
  const rateFromEnv = envRate !== undefined && envRate !== "" ? Number(envRate) : NaN;
  const freeFromEnv = envFree !== undefined && envFree !== "" ? Number(envFree) : NaN;

  return {
    countries: shipping.countries,
    rateCents: Number.isInteger(rateFromEnv) && rateFromEnv >= 0 ? rateFromEnv : null,
    freeFromCents:
      Number.isInteger(freeFromEnv) && freeFromEnv >= 0 ? freeFromEnv : shipping.freeFromCents,
    deliveryEstimate: process.env.DELIVERY_ESTIMATE || shipping.deliveryEstimate,
  };
}

export function shippingFor(subtotalCents: number, info: ShippingInfo): number | null {
  if (info.rateCents === null) return null;
  if (info.freeFromCents !== null && subtotalCents >= info.freeFromCents) return 0;
  return info.rateCents;
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
