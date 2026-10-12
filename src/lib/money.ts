import { site } from "@/content/site";

const formatter = new Intl.NumberFormat(site.locale, {
  style: "currency",
  currency: site.currency,
});

export function formatMoney(cents: number): string {
  return formatter.format(cents / 100);
}
