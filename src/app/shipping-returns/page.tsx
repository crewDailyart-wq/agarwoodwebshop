import type { Metadata } from "next";
import { EditorialPage } from "@/components/Page";
import { formatMoney } from "@/lib/money";
import { getShippingInfo } from "@/lib/checkout";
import { connection } from "next/server";
import { Suspense } from "react";

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
      <h2>Returns</h2>
      <p>
        Our returns policy will be published here once the owner has confirmed it. Consumer
        withdrawal rights under Dutch and EU law apply to distance sales.
      </p>
    </EditorialPage>
  );
}
