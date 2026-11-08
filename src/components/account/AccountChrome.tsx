import Link from "next/link";
import type { ReactNode } from "react";
import { logout } from "@/app/account/actions";
import { AccountNav } from "./AccountNav";

/** A centred card for the signed-out pages: sign in, create account, reset password. */
export function AuthCard({
  eyebrow,
  title,
  intro,
  children,
  footer,
}: {
  eyebrow: string;
  title: string;
  intro?: ReactNode;
  children: ReactNode;
  footer?: ReactNode;
}) {
  return (
    <div className="mx-auto max-w-xl px-5 pb-16 pt-14 sm:px-8 sm:pt-20">
      <p className="eyebrow eyebrow-gold mb-4 text-center">{eyebrow}</p>
      <h1 className="display text-center text-5xl sm:text-6xl">{title}</h1>
      <div aria-hidden className="mx-auto my-8 flex w-40 items-center gap-3">
        <span className="h-px flex-1 bg-gold-line" />
        <span className="h-1.5 w-1.5 rotate-45 border border-gold" />
        <span className="h-px flex-1 bg-gold-line" />
      </div>
      {intro && <p className="mx-auto mb-8 max-w-md text-center text-ivory-soft">{intro}</p>}
      <div className="border border-gold-line bg-black/20 p-6 sm:p-9">{children}</div>
      {footer && <div className="mt-8 text-center text-sm text-ivory-soft">{footer}</div>}
    </div>
  );
}

/** Shown instead of the forms until a database is connected, so nothing breaks half-way. */
export function AccountsUnavailable() {
  return (
    <AuthCard eyebrow="My account" title="Opening soon">
      <p className="text-center text-ivory-soft">
        Customer accounts aren&apos;t open yet. You can still order without one, as a guest.
      </p>
      <p className="mt-6 text-center">
        <Link href="/collection" className="btn btn-line">
          Our Agarwood Assortment
        </Link>
      </p>
    </AuthCard>
  );
}

/** The signed-in area: a side menu and the page content, as in most web shops. */
export function AccountShell({
  title,
  eyebrow = "My account",
  children,
}: {
  title: string;
  eyebrow?: string;
  children: ReactNode;
}) {
  return (
    <div className="mx-auto max-w-6xl px-5 pb-16 pt-12 sm:px-8 sm:pt-16">
      <p className="eyebrow eyebrow-gold mb-3">{eyebrow}</p>
      <h1 className="display text-4xl sm:text-5xl">{title}</h1>
      <div aria-hidden className="mb-10 mt-6 flex items-center gap-3">
        <span className="h-px w-24 bg-gold-line" />
        <span className="h-1.5 w-1.5 rotate-45 border border-gold" />
        <span className="h-px flex-1 bg-gold-hair" />
      </div>
      <div className="grid gap-10 lg:grid-cols-[15rem_minmax(0,1fr)] lg:gap-14">
        <aside>
          <AccountNav />
          <form action={logout} className="mt-6">
            <button type="submit" className="btn btn-line w-full">
              Sign out
            </button>
          </form>
        </aside>
        <div className="min-w-0">{children}</div>
      </div>
    </div>
  );
}

export function Panel({
  title,
  action,
  children,
}: {
  title: string;
  action?: ReactNode;
  children: ReactNode;
}) {
  return (
    <section className="border border-gold-line bg-black/20">
      <div className="flex items-center justify-between gap-4 border-b border-gold-hair px-6 py-4">
        <h2 className="font-[family-name:var(--font-caps)] text-[0.72rem] font-semibold uppercase tracking-[0.26em] text-gold-bright">
          {title}
        </h2>
        {action}
      </div>
      <div className="p-6">{children}</div>
    </section>
  );
}
