import Link from "next/link";
import { Suspense } from "react";
import { AccountsUnavailable, AuthCard } from "@/components/account/AccountChrome";
import { ConfirmEmailForm } from "@/components/account/AccountForms";
import { peekToken } from "@/lib/auth-tokens";
import { dbConfigured } from "@/lib/db";

// The link only shows a button; the token is used up when the button is pressed, so mail
// scanners that open links in advance can't spend it.
async function Content({ searchParams }: { searchParams: Promise<{ token?: string }> }) {
  if (!dbConfigured()) return <AccountsUnavailable />;
  const { token = "" } = await searchParams;
  const valid = await peekToken(token, "verify");
  return (
    <AuthCard
      eyebrow="My account"
      title={valid ? "Confirm your email" : "Link no longer valid"}
      intro={
        valid
          ? "One more step: press the button to confirm your address and sign in."
          : "This link has expired or was already used."
      }
      footer={
        <Link href="/account/check-email" className="text-gold hover:text-gold-bright">
          {valid ? "Need a new link?" : "Send me a new link"}
        </Link>
      }
    >
      {valid ? (
        <ConfirmEmailForm token={token} />
      ) : (
        <p className="text-center">
          <Link href="/account/login" className="btn btn-line">
            Go to sign in
          </Link>
        </p>
      )}
    </AuthCard>
  );
}

export default function VerifyPage(props: PageProps<"/account/verify">) {
  return (
    <Suspense fallback={<p className="px-8 py-20 text-center text-ivory-soft">Loading…</p>}>
      <Content searchParams={props.searchParams as Promise<{ token?: string }>} />
    </Suspense>
  );
}
