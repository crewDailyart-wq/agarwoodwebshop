import { NextResponse } from "next/server";

/**
 * Mollie calls this when a payment changes status. Mollie only sends the id,
 * so we re-fetch the payment from Mollie rather than trusting the request.
 *
 * TODO (needs an owner decision): store the order and send the confirmation
 * email / decrement stock here. There is no database yet, so for now this only
 * verifies and logs.
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

  const payment = (await res.json()) as { status: string; metadata?: { ref?: string } };
  console.info("Mollie payment", id, payment.status, payment.metadata?.ref);

  return new NextResponse(null, { status: 200 });
}
