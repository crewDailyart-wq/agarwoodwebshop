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
        We ship to: {info.countries.map((c) => c.name).join(", ")}.{" "}
        {info.rateCents === null
          ? "Shipping costs are shown at checkout."
          : `Shipping costs ${formatMoney(info.rateCents)}${
              info.freeFromCents !== null
                ? `, and are free from ${formatMoney(info.freeFromCents)}`
                : ""
            }.`}
      </p>
      {info.deliveryEstimate && <p>Estimated delivery: {info.deliveryEstimate}.</p>}
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
        their original condition. The direct cost of returning the goods is borne by you. We refund
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
