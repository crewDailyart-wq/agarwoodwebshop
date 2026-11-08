import Link from "next/link";
import { Suspense } from "react";
import { AuthCard } from "@/components/account/AccountChrome";
import { ResendVerificationForm } from "@/components/account/AccountForms";

async function Content({ searchParams }: { searchParams: Promise<{ email?: string }> }) {
  const { email } = await searchParams;
  return (
    <AuthCard
      eyebrow="Almost there"
      title="Check your email"
      intro={
        email
          ? `If ${email} can be used for an account, a confirmation link is on its way. Open it to finish creating your account.`
          : "A confirmation link is on its way. Open it to finish creating your account."
      }
      footer={
        <Link href="/account/login" className="text-gold hover:text-gold-bright">
          Back to sign in
        </Link>
      }
    >
      <ResendVerificationForm defaultEmail={email ?? ""} />
    </AuthCard>
  );
}

export default function CheckEmailPage(props: PageProps<"/account/check-email">) {
  return (
    <Suspense fallback={<p className="px-8 py-20 text-center text-ivory-soft">Loading…</p>}>
      <Content searchParams={props.searchParams as Promise<{ email?: string }>} />
    </Suspense>
  );
}
