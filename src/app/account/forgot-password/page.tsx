import Link from "next/link";
import { Suspense } from "react";
import { AccountsUnavailable, AuthCard } from "@/components/account/AccountChrome";
import { ForgotPasswordForm } from "@/components/account/AccountForms";
import { dbConfigured } from "@/lib/db";

function Content() {
  if (!dbConfigured()) return <AccountsUnavailable />;
  return (
    <AuthCard
      eyebrow="My account"
      title="Forgot your password?"
      intro="Enter your email address and we'll send you a link to choose a new one."
      footer={
        <Link href="/account/login" className="text-gold hover:text-gold-bright">
          Back to sign in
        </Link>
      }
    >
      <ForgotPasswordForm />
    </AuthCard>
  );
}

export default function ForgotPasswordPage() {
  return (
    <Suspense fallback={<p className="px-8 py-20 text-center text-ivory-soft">Loading…</p>}>
      <Content />
    </Suspense>
  );
}
