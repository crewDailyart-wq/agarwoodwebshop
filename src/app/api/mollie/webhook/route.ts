import { NextResponse } from "next/server";
import { applyMolliePayment } from "@/lib/orders";

/**
 * Mollie calls this when a payment changes status. Mollie only sends the id,
 * so we re-fetch the payment from Mollie rather than trusting the request.
 *
 * The order is updated in the database and the confirmation email is sent here (see
 * `applyMolliePayment`). Stock is not decremented: stock levels live in the catalog file.
 */
export async function POST(request: Request) {
  const form = await request.formData();
  const id = form.get("id");
  if (typeof id !== "string" || !/^tr_[A-Za-z0-9]+$/.test(id)) {
    return NextResponse.json({ error: "Bad id" }, { status: 400 });
  }

  const res = await fetch(`https://api.mollie.com/v2/payments/${id}`, {
    headers: { Authorization: `Bearer ${process.env.MOLLIE_API_KEY}` },
  });
  if (!res.ok) return NextResponse.json({ error: "Lookup failed" }, { status: 502 });

  const payment = (await res.json()) as Parameters<typeof applyMolliePayment>[0];
  console.info("Mollie payment", id, payment.status, payment.metadata?.ref);
  try {
    await applyMolliePayment(payment);
  } catch {
    return NextResponse.json({ error: "Could not store the order" }, { status: 500 }); // Mollie retries
  }

  return new NextResponse(null, { status: 200 });
}
