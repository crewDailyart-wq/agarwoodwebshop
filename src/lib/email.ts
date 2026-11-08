import "server-only";
import { Resend } from "resend";
import { site } from "@/content/site";
import { formatMoney } from "@/lib/money";

/**
 * Transactional email through Resend. Needs RESEND_API_KEY and EMAIL_FROM (an address on a domain
 * verified in Resend, e.g. `ALUWWAH <hello@aluwwah.com>`). Without a key, development prints the
 * message to the console instead; production reports a failure so the customer is told.
 */
export const origin = () => (process.env.NEXT_PUBLIC_SITE_URL ?? site.url).replace(/\/$/, "");

const esc = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

type Mail = { to: string; subject: string; html: string; text: string };

async function send(mail: Mail): Promise<boolean> {
  const key = process.env.RESEND_API_KEY;
  if (!key) {
    if (process.env.NODE_ENV !== "production") {
      console.info(`\n--- EMAIL to ${mail.to}: ${mail.subject}\n${mail.text}\n---\n`);
      return true;
    }
    console.error("RESEND_API_KEY is not set; email not sent:", mail.subject);
    return false;
  }
  try {
    const { error } = await new Resend(key).emails.send({
      from: process.env.EMAIL_FROM ?? `${site.name} <onboarding@resend.dev>`,
      to: mail.to,
      subject: mail.subject,
      html: mail.html,
      text: mail.text,
    });
    if (error) {
      console.error("Resend error", error);
      return false;
    }
    return true;
  } catch (err) {
    console.error("Email failed", err);
    return false;
  }
}

/** The shared look: deep emerald, gold rules, serif type. Inline styles, since mail clients need them. */
function layout(title: string, bodyHtml: string, button?: { label: string; href: string }) {
  const btn = button
    ? `<p style="margin:32px 0"><a href="${esc(button.href)}" style="display:inline-block;background:#d4ad62;color:#062012;text-decoration:none;font-family:Georgia,serif;font-size:13px;letter-spacing:3px;text-transform:uppercase;font-weight:bold;padding:15px 30px">${esc(button.label)}</a></p>
       <p style="font-size:13px;color:#8a8473;word-break:break-all">Button not working? Copy this link into your browser:<br>${esc(button.href)}</p>`
    : "";
  return `<!doctype html><html><body style="margin:0;background:#04130b;padding:32px 12px">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0"><tr><td align="center">
   <table role="presentation" width="560" cellpadding="0" cellspacing="0" style="max-width:560px;background:#f6efe2;border-top:4px solid #d4ad62">
    <tr><td align="center" style="padding:34px 32px 8px;font-family:Georgia,serif;font-size:26px;letter-spacing:8px;color:#062012">${esc(site.name)}</td></tr>
    <tr><td align="center" style="font-family:Georgia,serif;font-size:13px;font-style:italic;color:#8a6a1c;padding-bottom:22px;border-bottom:1px solid #d9c8a0">${esc(site.tagline)}</td></tr>
    <tr><td style="padding:30px 36px 36px;font-family:Georgia,serif;font-size:16px;line-height:1.65;color:#2b2a22">
      <h1 style="font-weight:normal;font-size:24px;margin:0 0 18px;color:#062012">${esc(title)}</h1>
      ${bodyHtml}${btn}
    </td></tr>
    <tr><td align="center" style="padding:18px;background:#062012;font-family:Georgia,serif;font-size:12px;letter-spacing:2px;color:#d4ad62;text-transform:uppercase">Rare woods. A more fragrant world.</td></tr>
   </table></td></tr></table></body></html>`;
}

const hello = (name: string) => (name ? `Dear ${esc(name)},` : "Hello,");

export function sendVerificationEmail(to: string, name: string, link: string) {
  return send({
    to,
    subject: `Confirm your ${site.name} account`,
    html: layout(
      "Welcome",
      `<p>${hello(name)}</p><p>Thank you for creating an account. Please confirm your email address to start using it. The link works for 3 days.</p>`,
      { label: "Confirm my email", href: link },
    ),
    text: `Thank you for creating an ${site.name} account.\n\nConfirm your email address (valid for 3 days):\n${link}\n`,
  });
}

export function sendPasswordResetEmail(to: string, name: string, link: string) {
  return send({
    to,
    subject: `Reset your ${site.name} password`,
    html: layout(
      "Choose a new password",
      `<p>${hello(name)}</p><p>We received a request to reset your password. The link works for one hour. If this wasn't you, you can ignore this email; your password stays as it is.</p>`,
      { label: "Choose a new password", href: link },
    ),
    text: `Reset your ${site.name} password (valid for one hour):\n${link}\n\nIf you didn't ask for this, ignore this email.\n`,
  });
}

export function sendAlreadyRegisteredEmail(to: string, signInLink: string, resetLink: string) {
  return send({
    to,
    subject: `You already have a ${site.name} account`,
    html: layout(
      "You already have an account",
      `<p>Someone, hopefully you, tried to create an account with this email address, but one already exists.</p>
       <p>You can sign in, or choose a new password if you've forgotten it: <a href="${esc(resetLink)}" style="color:#8a6a1c">reset my password</a>.</p>`,
      { label: "Sign in", href: signInLink },
    ),
    text: `You already have a ${site.name} account.\nSign in: ${signInLink}\nForgot your password? ${resetLink}\n`,
  });
}

export type ConfirmationOrder = {
  ref: string;
  email: string;
  name: string;
  lines: { name: string; quantity: number; unitCents: number }[];
  shippingCents: number;
  totalCents: number;
  address: Record<string, string>;
};

export function sendOrderConfirmationEmail(order: ConfirmationOrder, accountLink: string | null) {
  const rows = order.lines
    .map(
      (l) =>
        `<tr><td style="padding:6px 0">${esc(l.name)} × ${l.quantity}</td><td align="right" style="padding:6px 0">${formatMoney(l.unitCents * l.quantity)}</td></tr>`,
    )
    .join("");
  const addr = [order.name, order.address.street, `${order.address.postalCode} ${order.address.city}`, order.address.country]
    .filter(Boolean)
    .map(esc)
    .join("<br>");
  const html = layout(
    `Thank you for your order`,
    `<p>${hello(order.name)}</p><p>We have received your payment for order <strong>${esc(order.ref)}</strong>. We will send you another email when it is on its way.</p>
     <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-top:1px solid #d9c8a0;border-bottom:1px solid #d9c8a0;margin:18px 0">${rows}
       <tr><td style="padding:6px 0;color:#6b6755">Shipping</td><td align="right" style="padding:6px 0;color:#6b6755">${order.shippingCents === 0 ? "Free" : formatMoney(order.shippingCents)}</td></tr>
       <tr><td style="padding:10px 0;border-top:1px solid #d9c8a0"><strong>Total</strong></td><td align="right" style="padding:10px 0;border-top:1px solid #d9c8a0"><strong>${formatMoney(order.totalCents)}</strong></td></tr>
     </table>
     <p style="margin:0 0 4px"><strong>Delivery address</strong></p><p style="margin:0">${addr}</p>`,
    accountLink ? { label: "View my order", href: accountLink } : undefined,
  );
  const text =
    `Thank you for your order ${order.ref}.\n\n` +
    order.lines.map((l) => `${l.name} x ${l.quantity}  ${formatMoney(l.unitCents * l.quantity)}`).join("\n") +
    `\nShipping ${order.shippingCents === 0 ? "free" : formatMoney(order.shippingCents)}\nTotal ${formatMoney(order.totalCents)}\n` +
    (accountLink ? `\nView your order: ${accountLink}\n` : "");
  return send({ to: order.email, subject: `Your ${site.name} order ${order.ref}`, html, text });
}
