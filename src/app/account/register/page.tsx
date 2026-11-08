import Link from "next/link";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import { AccountsUnavailable, AuthCard } from "@/components/account/AccountChrome";
import { RegisterForm } from "@/components/account/AccountForms";
import { dbConfigured } from "@/lib/db";
import { getUser } from "@/lib/session";

async function Content() {
  if (!dbConfigured()) return <AccountsUnavailable />;
  if (await getUser()) redirect("/account");
  return (
    <AuthCard
      eyebrow="My account"
      title="Create an account"
      intro="Follow your orders, see your order history and check out faster. We'll email you a link to confirm your address."
      footer={
        <>
          Already have an account?{" "}
          <Link href="/account/login" className="text-gold hover:text-gold-bright">
            Sign in
          </Link>
        </>
      }
    >
      <RegisterForm />
    </AuthCard>
  );
}

export default function RegisterPage() {
  return (
    <Suspense fallback={<p className="px-8 py-20 text-center text-ivory-soft">Loading…</p>}>
      <Content />
    </Suspense>
  );
}
