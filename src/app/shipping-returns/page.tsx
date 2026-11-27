import type { Metadata } from "next";
import { EditorialPage } from "@/components/Page";
import { formatMoney } from "@/lib/money";
import { getShippingInfo } from "@/lib/checkout";
import { connection } from "next/server";
import { Suspense } from "react";
import Link from "next/link";

export const metadata: Metadata = { title: "Shipping & returns" };

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
      <p>
        <strong>Netherlands and Belgium:</strong> shipping is always free, at any order value.
        Expected delivery: 2–4 working days.
      </p>
      <p>
        <strong>All other countries:</strong>{" "}
        {info.freeFromCents !== null
          ? `shipping is free from ${formatMoney(info.freeFromCents)}. Below that, the price depends on the carrier and your country and is shown at checkout before you pay. `
          : "the price depends on the carrier and your country and is shown at checkout before you pay. "}
        Expected delivery: 5–10 working days.
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
