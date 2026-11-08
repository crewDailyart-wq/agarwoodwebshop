import Link from "next/link";
import { connection } from "next/server";
import { logout } from "@/app/account/actions";
import { dbConfigured } from "@/lib/db";
import { firstName } from "@/lib/account";
import { getUser } from "@/lib/session";
import { RegisterForm } from "./AccountForms";

const title =
  "mb-4 border-b border-gold-hair pb-3 font-[family-name:var(--font-caps)] text-[0.72rem] font-semibold uppercase tracking-[0.28em] text-gold-bright";

export function FooterAccountSkeleton() {
  return (
    <section aria-hidden className="w-full max-w-sm lg:justify-self-start">
      <h2 className={title}>My account</h2>
      <div className="h-64 border border-gold-hair bg-black/10" />
    </section>
  );
}

/** The account corner of the footer: a sign-up form for visitors, quick links for customers. */
export async function FooterAccount() {
  await connection(); // depends on the visitor's session, so it is never part of the static page
  if (!dbConfigured()) return <div aria-hidden className="hidden lg:block" />;

  const user = await getUser();
  return (
    <section aria-label="My account" className="w-full max-w-sm lg:justify-self-start">
      <h2 className={title}>My account</h2>
      {user ? (
        <div className="border border-gold-line bg-black/20 p-5">
          <p className="font-[family-name:var(--font-display)] text-2xl text-ivory">Welcome back, {firstName(user)}</p>
          <ul className="mt-4 space-y-2.5 text-[0.98rem]">
            {[
              { href: "/account/orders", label: "My orders" },
              { href: "/account", label: "Account overview" },
              { href: "/account/details", label: "Account details" },
            ].map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="inline-flex items-center gap-3 text-ivory hover:text-gold-bright">
                  <span aria-hidden className="h-1 w-1 shrink-0 rotate-45 bg-gold/70" />
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
          <form action={logout} className="mt-5">
            <button type="submit" className="btn btn-line w-full">
              Sign out
            </button>
          </form>
        </div>
      ) : (
        <div className="border border-gold-line bg-black/20 p-5">
          <p className="mb-4 text-[0.95rem] leading-relaxed text-ivory-soft">
            Create an account to follow your orders and find them again at any time.
          </p>
          <RegisterForm compact />
          <p className="mt-4 text-center text-sm text-ivory-soft">
            Already have an account?{" "}
            <Link href="/account/login" className="text-gold hover:text-gold-bright">
              Sign in
            </Link>
          </p>
        </div>
      )}
    </section>
  );
}
