import Link from "next/link";
import { Suspense } from "react";
import { AccountsUnavailable, AuthCard } from "@/components/account/AccountChrome";
import { ResetPasswordForm } from "@/components/account/AccountForms";
import { peekToken } from "@/lib/auth-tokens";
import { dbConfigured } from "@/lib/db";

async function Content({ searchParams }: { searchParams: Promise<{ token?: string }> }) {
  if (!dbConfigured()) return <AccountsUnavailable />;
  const { token = "" } = await searchParams;
  const valid = await peekToken(token, "reset");
  return (
    <AuthCard
      eyebrow="My account"
      title={valid ? "Choose a new password" : "Link no longer valid"}
      intro={valid ? undefined : "This link has expired or was already used."}
      footer={
        <Link href="/account/login" className="text-gold hover:text-gold-bright">
          Back to sign in
        </Link>
      }
    >
      {valid ? (
        <ResetPasswordForm token={token} />
      ) : (
        <p className="text-center">
          <Link href="/account/forgot-password" className="btn btn-line">
            Request a new link
          </Link>
        </p>
      )}
    </AuthCard>
  );
}

export default function ResetPasswordPage(props: PageProps<"/account/reset-password">) {
  return (
    <Suspense fallback={<p className="px-8 py-20 text-center text-ivory-soft">Loading…</p>}>
      <Content searchParams={props.searchParams as Promise<{ token?: string }>} />
    </Suspense>
  );
}
