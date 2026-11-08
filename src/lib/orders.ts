import "server-only";
import { getProduct, type ProductId } from "@/content/catalog";
import { dbConfigured, query } from "@/lib/db";
import { origin, sendOrderConfirmationEmail } from "@/lib/email";
import type { OrderStatus } from "@/lib/order-status";

export type OrderLineRecord = { id: string; name: string; quantity: number; unitCents: number };
export type Address = { name?: string; street: string; postalCode: string; city: string; country: string };

export type OrderRecord = {
  ref: string;
  email: string;
  name: string;
  status: OrderStatus;
  paymentMethod: "online" | "bank-transfer" | "cash";
  lines: OrderLineRecord[];
  subtotalCents: number;
  shippingCents: number;
  totalCents: number;
  address: Address;
  trackingUrl: string | null;
  createdAt: Date;
  paidAt: Date | null;
  shippedAt: Date | null;
  deliveredAt: Date | null;
};

type Row = {
  ref: string;
  email: string;
  name: string;
  status: OrderStatus;
  payment_method: OrderRecord["paymentMethod"];
  lines: OrderLineRecord[];
  subtotal_cents: number;
  shipping_cents: number;
  total_cents: number;
  address: Address;
  tracking_url: string | null;
  created_at: Date;
  paid_at: Date | null;
  shipped_at: Date | null;
  delivered_at: Date | null;
};

const COLUMNS = `ref, email, name, status, payment_method, lines, subtotal_cents, shipping_cents,
  total_cents, address, tracking_url, created_at, paid_at, shipped_at, delivered_at`;

const toRecord = (r: Row): OrderRecord => ({
  ref: r.ref,
  email: r.email,
  name: r.name,
  status: r.status,
  paymentMethod: r.payment_method,
  lines: r.lines,
  subtotalCents: r.subtotal_cents,
  shippingCents: r.shipping_cents,
  totalCents: r.total_cents,
  address: r.address,
  trackingUrl: r.tracking_url,
  createdAt: new Date(r.created_at),
  paidAt: r.paid_at ? new Date(r.paid_at) : null,
  shippedAt: r.shipped_at ? new Date(r.shipped_at) : null,
  deliveredAt: r.delivered_at ? new Date(r.delivered_at) : null,
});

export type NewOrder = {
  ref: string;
  userId: string | null;
  email: string;
  name: string;
  status: OrderStatus;
  paymentMethod: OrderRecord["paymentMethod"];
  mollieId?: string | null;
  lines: OrderLineRecord[];
  subtotalCents: number;
  shippingCents: number;
  totalCents: number;
  address: Address;
};

/** Saves an order. Never throws: a database problem must not stop a customer from paying. */
export async function saveOrder(o: NewOrder): Promise<boolean> {
  if (!dbConfigured()) return false;
  try {
    await query(
      `INSERT INTO orders (ref, user_id, email, name, status, payment_method, mollie_payment_id, lines,
                           subtotal_cents, shipping_cents, total_cents, address)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8::jsonb,$9,$10,$11,$12::jsonb)
       ON CONFLICT (ref) DO NOTHING`,
      [
        o.ref,
        o.userId,
        o.email.toLowerCase(),
        o.name,
        o.status,
        o.paymentMethod,
        o.mollieId ?? null,
        JSON.stringify(o.lines),
        o.subtotalCents,
        o.shippingCents,
        o.totalCents,
        JSON.stringify(o.address),
      ],
    );
    return true;
  } catch (err) {
    console.error("Could not save order", o.ref, err);
    return false;
  }
}

export async function attachMolliePayment(ref: string, mollieId: string) {
  if (!dbConfigured()) return;
  try {
    await query(`UPDATE orders SET mollie_payment_id = $2, updated_at = now() WHERE ref = $1`, [ref, mollieId]);
  } catch (err) {
    console.error("Could not attach payment to order", ref, err);
  }
}

export async function markOrderFailed(ref: string) {
  if (!dbConfigured()) return;
  try {
    await query(`UPDATE orders SET status = 'failed', updated_at = now() WHERE ref = $1 AND status = 'pending'`, [ref]);
  } catch (err) {
    console.error("Could not mark order failed", ref, err);
  }
}

type MolliePayment = {
  id: string;
  status: string;
  metadata?: {
    ref?: string;
    customer?: Record<string, string>;
    lines?: { id: string; quantity: number; unitCents: number }[];
    shippingCents?: number;
  };
  amount?: { value: string };
};

const END_STATES: Record<string, OrderStatus> = { failed: "failed", canceled: "cancelled", expired: "expired" };

/**
 * Called by the Mollie webhook. Safe to call repeatedly: only the first "paid" moves the order on
 * and sends the confirmation email. If the order was never saved (e.g. the database was down at
 * checkout) it is rebuilt from the payment's own metadata.
 */
export async function applyMolliePayment(payment: MolliePayment) {
  if (!dbConfigured()) return;
  const ref = payment.metadata?.ref;
  if (!ref) return;

  try {
    const exists = await query(`SELECT 1 FROM orders WHERE ref = $1`, [ref]);
    if (exists.length === 0) await rebuildFromPayment(payment, ref);

    await query(`UPDATE orders SET mollie_payment_id = COALESCE(mollie_payment_id, $2) WHERE ref = $1`, [
      ref,
      payment.id,
    ]);

    if (payment.status === "paid") {
      const rows = await query<Row & { user_id: string | null }>(
        `UPDATE orders SET status = 'paid', paid_at = now(), updated_at = now()
          WHERE ref = $1 AND status = 'pending' RETURNING ${COLUMNS}, user_id`,
        [ref],
      );
      if (rows[0]) await sendConfirmation(toRecord(rows[0]), Boolean(rows[0].user_id));
    } else if (END_STATES[payment.status]) {
      await query(`UPDATE orders SET status = $2, updated_at = now() WHERE ref = $1 AND status = 'pending'`, [
        ref,
        END_STATES[payment.status],
      ]);
    }
  } catch (err) {
    console.error("Could not apply Mollie payment", payment.id, err);
    throw err; // lets the webhook answer 500, so Mollie tries again
  }
}

async function rebuildFromPayment(payment: MolliePayment, ref: string) {
  const m = payment.metadata ?? {};
  const c = m.customer ?? {};
  const lines: OrderLineRecord[] = (m.lines ?? []).map((l) => ({
    id: l.id,
    name: getProduct(l.id as ProductId)?.name ?? l.id,
    quantity: l.quantity,
    unitCents: l.unitCents,
  }));
  const subtotal = lines.reduce((s, l) => s + l.unitCents * l.quantity, 0);
  const shipping = m.shippingCents ?? 0;
  await saveOrder({
    ref,
    userId: null,
    email: c.email ?? "",
    name: c.name ?? "",
    status: "pending",
    paymentMethod: "online",
    mollieId: payment.id,
    lines,
    subtotalCents: subtotal,
    shippingCents: shipping,
    totalCents: subtotal + shipping,
    address: { street: c.street ?? "", postalCode: c.postalCode ?? "", city: c.city ?? "", country: c.country ?? "" },
  });
}

async function sendConfirmation(order: OrderRecord, hasAccount: boolean) {
  const ok = await sendOrderConfirmationEmail(
    {
      ref: order.ref,
      email: order.email,
      name: order.name,
      lines: order.lines,
      shippingCents: order.shippingCents,
      totalCents: order.totalCents,
      address: order.address as unknown as Record<string, string>,
    },
    hasAccount ? `${origin()}/account/orders/${order.ref}` : `${origin()}/account/register`,
  );
  if (ok) await query(`UPDATE orders SET confirmation_sent_at = now() WHERE ref = $1`, [order.ref]);
}

/** Attaches orders placed as a guest to the account that owns that (verified) email address. */
export async function linkGuestOrders(userId: string, email: string) {
  await query(`UPDATE orders SET user_id = $1 WHERE user_id IS NULL AND lower(email) = lower($2)`, [userId, email]);
}

export async function listOrders(userId: string): Promise<OrderRecord[]> {
  const rows = await query<Row>(`SELECT ${COLUMNS} FROM orders WHERE user_id = $1 ORDER BY created_at DESC`, [userId]);
  return rows.map(toRecord);
}

export async function getOrder(userId: string, ref: string): Promise<OrderRecord | null> {
  const rows = await query<Row>(`SELECT ${COLUMNS} FROM orders WHERE user_id = $1 AND ref = $2`, [userId, ref]);
  return rows[0] ? toRecord(rows[0]) : null;
}
