import type { Metadata } from "next";
import { EditorialPage } from "@/components/Page";
import { formatMoney } from "@/lib/money";
import { getShippingInfo } from "@/lib/checkout";
import { connection } from "next/server";
import { Suspense } from "react";
import Link from "next/link";
import { carriers } from "@/lib/shipping";

export const metadata: Metadata = { title: "Shipping & returns" };

const price = (cents: number | null) => (cents === null ? "—" : cents === 0 ? "Free" : formatMoney(cents));

async function Rules() {
  await connection();
  const info = getShippingInfo();
  return (
    <>
      <h2>Shipping</h2>
      <p>
        We ship worldwide, and you choose your carrier at checkout: PostNL, DHL or UPS. Every parcel
        is sent tracked.
      </p>
      <div className="not-prose overflow-x-auto">
        <table className="w-full min-w-[40rem] border-collapse text-left text-base">
          <thead>
            <tr className="border-y border-gold-line text-sm text-ivory-faint">
              <th className="py-3 pr-4 font-normal">Carrier</th>
              <th className="px-4 py-3 font-normal">Netherlands</th>
              <th className="px-4 py-3 font-normal">Belgium</th>
              <th className="px-4 py-3 font-normal">Rest of Europe</th>
              <th className="py-3 pl-4 font-normal">Rest of the world</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gold-line/50 text-ivory">
            {carriers.map((c) => (
              <tr key={c.id}>
                <th scope="row" className="py-3 pr-4 font-normal">{c.name}</th>
                <td className="px-4 py-3 tabular-nums">{price(info.rates[c.id].nl)}</td>
                <td className="px-4 py-3 tabular-nums">{price(info.rates[c.id].be)}</td>
                <td className="px-4 py-3 tabular-nums">{price(info.rates[c.id].europe)}</td>
                <td className="py-3 pl-4 tabular-nums">{price(info.rates[c.id].world)}</td>
              </tr>
            ))}
            <tr className="border-t border-gold-line text-ivory-soft">
              <th scope="row" className="py-3 pr-4 font-normal">Delivery time</th>
              <td className="px-4 py-3">2–4 working days</td>
              <td className="px-4 py-3">2–4 working days</td>
              <td className="px-4 py-3">5–10 working days</td>
              <td className="py-3 pl-4">5–10 working days</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p>
        Shipping with PostNL and DHL to the Netherlands and Belgium is always free.
        {info.freeFromCents !== null &&
          ` Elsewhere, shipping is free from ${formatMoney(info.freeFromCents)}, whichever carrier you choose.`}{" "}
        Prices are per order and shown again at checkout before you pay. A dash means that carrier
        is not offered for that region yet.
      </p>
      <p>
        Orders outside the European Union may be subject to import duties, taxes and permits in the
        destination country, which are the customer&apos;s responsibility.
      </p>
    </>
  );
}

export default function ShippingReturnsPage() {
  return (
    <EditorialPage eyebrow="Care" title="Shipping & returns">
      <Suspense fallback={null}>
        <Rules />
      </Suspense>
      <h2>Returns and withdrawal</h2>
      <p>
        You may cancel your order without giving a reason within 14 days after receiving it. Tell
        us by e-mail or telephone, then send the goods back to us within 14 days, unused and in
        their original condition. We cover the cost of returning the goods: tell us you wish to return them and we will arrange the return or reimburse your postage. We refund
        what you paid, including the original standard shipping, within 14 days after we receive
        the goods or proof that you have sent them.
      </p>
      <p>
        The full terms, and a model withdrawal form, are in our{" "}
        <Link href="/terms">terms and conditions</Link>. If your parcel arrives damaged, or
        something is not right, contact us at once and we will make it right.
      </p>
    </EditorialPage>
  );
}
