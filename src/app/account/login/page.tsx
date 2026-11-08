import Link from "next/link";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import { AccountsUnavailable, AuthCard } from "@/components/account/AccountChrome";
import { LoginForm } from "@/components/account/AccountForms";
import { dbConfigured } from "@/lib/db";
import { getUser } from "@/lib/session";

async function Content({ searchParams }: { searchParams: Promise<{ next?: string; reset?: string }> }) {
  if (!dbConfigured()) return <AccountsUnavailable />;
  const { next, reset } = await searchParams;
  if (await getUser()) redirect("/account");
  return (
    <AuthCard
      eyebrow="My account"
      title="Sign in"
      intro={
        reset
          ? "Your password has been changed. Please sign in with your new password."
          : "Welcome back. Sign in to follow your orders and manage your details."
      }
      footer={
        <>
          New to ALUWWAH?{" "}
          <Link href="/account/register" className="text-gold hover:text-gold-bright">
            Create an account
          </Link>
        </>
      }
    >
      <LoginForm next={next} />
    </AuthCard>
  );
}

export default function LoginPage(props: PageProps<"/account/login">) {
  return (
    <Suspense fallback={<p className="px-8 py-20 text-center text-ivory-soft">Loading…</p>}>
      <Content searchParams={props.searchParams as Promise<{ next?: string; reset?: string }>} />
    </Suspense>
  );
}
