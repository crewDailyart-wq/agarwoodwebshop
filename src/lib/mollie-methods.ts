import { cacheLife } from "next/cache";
import { mollieMethods, type PaymentMethod } from "@/content/payments";

/** Methods that are not shown as logos: ours are separate options, and a till is not online. */
const hidden = new Set(["banktransfer", "pointofsale", "giftcard", "voucher"]);

/**
 * The payment methods to show. With a Mollie key: the ones switched on for this shop, with
 * Mollie's own logos. Without one, or if Mollie can't be reached: the full list of what Mollie
 * offers. Cached for an hour.
 */
export async function getMollieMethods(): Promise<PaymentMethod[]> {
  "use cache";
  cacheLife("hours");

  const key = process.env.MOLLIE_API_KEY;
  if (!key) return mollieMethods;
  try {
    const res = await fetch("https://api.mollie.com/v2/methods?locale=en_GB", {
      headers: { Authorization: `Bearer ${key}` },
    });
    if (!res.ok) return mollieMethods;
    const json = (await res.json()) as {
      _embedded?: { methods?: { id: string; description: string; image?: { svg?: string } }[] };
    };
    const live = (json._embedded?.methods ?? [])
      .filter((m) => !hidden.has(m.id) && m.image?.svg)
      .map((m) => ({ id: m.id, name: m.description, logo: m.image!.svg! }));
    return live.length > 0 ? live : mollieMethods;
  } catch {
    return mollieMethods;
  }
}
