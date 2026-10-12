import { randomBytes } from "node:crypto";
import { NextResponse } from "next/server";
import { site } from "@/content/site";
import {
  centsToDecimal,
  getShippingInfo,
  mollieConfigured,
  orderDescription,
  priceOrder,
  shippingFor,
} from "@/lib/checkout";

const str = (v: unknown, max = 200) =>
  typeof v === "string" && v.trim().length > 0 && v.length <= max ? v.trim() : null;

export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const priced = priceOrder(body.items);
  if (!priced.ok) return NextResponse.json({ error: priced.error }, { status: 400 });

  const customer = (body.customer ?? {}) as Record<string, unknown>;
  const email = str(customer.email);
  const name = str(customer.name);
  const street = str(customer.street);
  const postalCode = str(customer.postalCode, 20);
  const city = str(customer.city);
  const country = str(customer.country, 2);

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || !name || !street || !postalCode || !city || !country) {
    return NextResponse.json({ error: "Please complete all address fields." }, { status: 400 });
  }

  const info = getShippingInfo();
  if (!info.countries.some((c) => c.code === country)) {
    return NextResponse.json({ error: "We don't ship to that country yet." }, { status: 400 });
  }

  const shippingCents = shippingFor(priced.subtotalCents, info);
  if (shippingCents === null) {
    return NextResponse.json(
      { error: "Shipping isn't configured yet, so orders can't be placed." },
      { status: 503 },
    );
  }

  if (!mollieConfigured()) {
    return NextResponse.json(
      { error: "Payments aren't configured yet, so orders can't be placed." },
      { status: 503 },
    );
  }

  const totalCents = priced.subtotalCents + shippingCents;
  const ref = randomBytes(5).toString("hex").toUpperCase();
  const origin = process.env.NEXT_PUBLIC_SITE_URL ?? site.url;

  const payload: Record<string, unknown> = {
    amount: { currency: site.currency, value: centsToDecimal(totalCents) },
    description: orderDescription(ref),
    redirectUrl: `${origin}/order/confirmation`,
    locale: "en_GB",
    billingAddress: {
      givenName: name.split(" ")[0],
      familyName: name.split(" ").slice(1).join(" ") || name,
      email,
      streetAndNumber: street,
      postalCode,
      city,
      country,
    },
    metadata: {
      ref,
      customer: { name, email, street, postalCode, city, country },
      lines: priced.lines.map((l) => ({ id: l.id, quantity: l.quantity, unitCents: l.unitCents })),
      shippingCents,
    },
  };
  // Mollie rejects webhooks it can't reach (e.g. localhost); only send a public URL.
  if (!origin.includes("localhost")) payload.webhookUrl = `${origin}/api/mollie/webhook`;

  const res = await fetch("https://api.mollie.com/v2/payments", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.MOLLIE_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    console.error("Mollie payment creation failed", res.status, await res.text());
    return NextResponse.json(
      { error: "We couldn't start the payment. Please try again." },
      { status: 502 },
    );
  }

  const payment = (await res.json()) as { id: string; _links?: { checkout?: { href: string } } };
  const checkoutUrl = payment._links?.checkout?.href;
  if (!checkoutUrl) {
    return NextResponse.json({ error: "We couldn't start the payment." }, { status: 502 });
  }

  const response = NextResponse.json({ checkoutUrl });
  // Lets the confirmation page look the payment up after Mollie redirects back.
  response.cookies.set("lastPayment", payment.id, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24,
  });
  return response;
}
