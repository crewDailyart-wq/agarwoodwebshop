/**
 * Payment methods Mollie offers (https://docs.mollie.com/reference/methods-api), with the logo
 * Mollie itself publishes for each. Used by the footer and the checkout.
 *
 * With MOLLIE_API_KEY set, the site asks Mollie which of these are switched on for this shop and
 * shows only those (src/lib/mollie-methods.ts); this full list is what is shown until then, and
 * the fallback if Mollie can't be reached. The customer picks the actual method on Mollie's
 * secure page, so nothing here restricts what Mollie shows.
 */
export type PaymentMethod = { id: string; name: string; logo: string };

const logo = (id: string) => `https://www.mollie.com/external/icons/payment-methods/${id}.svg`;

export const mollieMethods: PaymentMethod[] = [
  { id: "ideal", name: "iDEAL" },
  { id: "creditcard", name: "Credit and debit cards" },
  { id: "applepay", name: "Apple Pay" },
  { id: "paypal", name: "PayPal" },
  { id: "bancontact", name: "Bancontact" },
  { id: "klarna", name: "Klarna" },
  { id: "in3", name: "in3" },
  { id: "riverty", name: "Riverty" },
  { id: "billie", name: "Billie" },
  { id: "eps", name: "eps" },
  { id: "przelewy24", name: "Przelewy24" },
  { id: "blik", name: "BLIK" },
  { id: "kbc", name: "KBC/CBC" },
  { id: "belfius", name: "Belfius" },
  { id: "twint", name: "TWINT" },
  { id: "trustly", name: "Trustly" },
  { id: "satispay", name: "Satispay" },
  { id: "mybank", name: "MyBank" },
  { id: "bancomatpay", name: "BANCOMAT Pay" },
  { id: "payconiq", name: "Payconiq" },
  { id: "paysafecard", name: "paysafecard" },
  { id: "directdebit", name: "SEPA Direct Debit" },
].map((m) => ({ ...m, logo: logo(m.id) }));
