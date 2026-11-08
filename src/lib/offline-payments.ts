/**
 * Payments that don't go through Mollie: a direct bank transfer, or cash sent by post.
 *
 * They are switched on by environment variables (see .env.example), because the account and
 * address are the owner's to supply. Because the shop has no order database, every such order
 * is posted to ORDER_NOTIFY_WEBHOOK_URL (for example a Zapier or Make hook that e-mails the
 * owner) and an order is only accepted if that succeeds, so none can get lost.
 */
export type OfflineMethod = "bank-transfer" | "cash";

export type OfflineOrder = {
  ref: string;
  method: OfflineMethod;
  totalCents: number;
  shippingCents: number;
  customer: Record<string, string>;
  lines: { id: string; name: string; quantity: number; unitCents: number }[];
};

export function offlineConfig() {
  const notify = Boolean(process.env.ORDER_NOTIFY_WEBHOOK_URL);
  const bank = {
    accountName: process.env.BANK_ACCOUNT_NAME ?? "",
    iban: process.env.BANK_IBAN ?? "",
    bic: process.env.BANK_BIC ?? "",
  };
  const cashAddress = process.env.CASH_ADDRESS ?? "";
  return {
    bank,
    cashAddress,
    bankReady: notify && Boolean(bank.accountName && bank.iban),
    cashReady: notify && Boolean(cashAddress),
  };
}

export async function notifyOwner(order: OfflineOrder): Promise<boolean> {
  console.info("Offline order", JSON.stringify(order));
  const url = process.env.ORDER_NOTIFY_WEBHOOK_URL;
  if (!url) return false;
  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ type: "offline-order", ...order, createdAt: new Date().toISOString() }),
    });
    return res.ok;
  } catch {
    return false;
  }
}
