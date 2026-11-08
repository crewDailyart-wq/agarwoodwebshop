import Link from "next/link";
import { Suspense } from "react";
import { AccountShell, Panel } from "@/components/account/AccountChrome";
import { OrderRow } from "@/components/account/OrderRow";
import { firstName, requireUser } from "@/lib/account";
import { listOrders } from "@/lib/orders";

async function Content({ searchParams }: { searchParams: Promise<{ welcome?: string }> }) {
  const user = await requireUser("/account");
  const { welcome } = await searchParams;
  const orders = await listOrders(user.id);
  const open = orders.filter((o) => ["pending", "awaiting_transfer", "awaiting_cash", "paid", "shipped"].includes(o.status));

  return (
    <AccountShell title={`Welcome, ${firstName(user)}`}>
      <div className="space-y-8">
        {welcome && (
          <p role="status" className="border border-gold bg-gold/[0.08] px-5 py-4 text-ivory">
            Your email address is confirmed and your account is ready.
          </p>
        )}

        <div className="grid gap-px border border-gold-line bg-gold-line sm:grid-cols-3">
          {[
            { label: "Orders placed", value: String(orders.length) },
            { label: "On their way", value: String(open.length) },
            { label: "Signed in as", value: user.email, small: true },
          ].map((s) => (
            <div key={s.label} className="bg-night px-6 py-5">
              <p className="font-[family-name:var(--font-caps)] text-[0.6rem] uppercase tracking-[0.22em] text-gold">
                {s.label}
              </p>
              <p className={`mt-2 truncate text-ivory ${s.small ? "text-base" : "font-[family-name:var(--font-serif)] text-3xl [font-variant-numeric:lining-nums]"}`}>
                {s.value}
              </p>
            </div>
          ))}
        </div>

        <Panel
          title="Recent orders"
          action={
            orders.length > 0 && (
              <Link href="/account/orders" className="text-sm text-gold hover:text-gold-bright">
                View all
              </Link>
            )
          }
        >
          {orders.length === 0 ? (
            <div className="py-4 text-center">
              <p className="text-ivory-soft">You haven&apos;t placed an order yet.</p>
              <Link href="/collection" className="btn btn-line mt-6">
                Our Agarwood Assortment
              </Link>
            </div>
          ) : (
            <ul className="divide-y divide-gold-hair">
              {orders.slice(0, 3).map((o) => (
                <OrderRow key={o.ref} order={o} />
              ))}
            </ul>
          )}
        </Panel>

        <div className="grid gap-8 md:grid-cols-2">
          <Panel
            title="Your details"
            action={
              <Link href="/account/details" className="text-sm text-gold hover:text-gold-bright">
                Edit
              </Link>
            }
          >
            <p className="text-ivory">{user.name || "No name saved"}</p>
            <p className="text-ivory-soft">{user.email}</p>
          </Panel>
          <Panel title="Need help?">
            <ul className="space-y-2 text-ivory-soft">
              <li>
                <Link href="/shipping-returns" className="text-gold hover:text-gold-bright">
                  Shipping &amp; returns
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gold hover:text-gold-bright">
                  Contact us about an order
                </Link>
              </li>
            </ul>
          </Panel>
        </div>
      </div>
    </AccountShell>
  );
}

export default function AccountPage(props: PageProps<"/account">) {
  return (
    <Suspense fallback={<p className="px-8 py-20 text-center text-ivory-soft">Loading…</p>}>
      <Content searchParams={props.searchParams as Promise<{ welcome?: string }>} />
    </Suspense>
  );
}
