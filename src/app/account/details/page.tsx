import { Suspense } from "react";
import { AccountShell, Panel } from "@/components/account/AccountChrome";
import { ChangePasswordForm, DeleteAccountForm, ProfileForm } from "@/components/account/AccountForms";
import { requireUser } from "@/lib/account";

async function Content() {
  const user = await requireUser("/account/details");
  return (
    <AccountShell title="Account details">
      <div className="space-y-8">
        <Panel title="Your details">
          <div className="max-w-lg">
            <ProfileForm name={user.name} email={user.email} />
          </div>
        </Panel>
        <Panel title="Password">
          <div className="max-w-lg">
            <ChangePasswordForm />
          </div>
        </Panel>
        <Panel title="Delete account">
          <details className="max-w-lg">
            <summary className="cursor-pointer text-gold hover:text-gold-bright">I want to delete my account</summary>
            <p className="my-5 text-sm leading-relaxed text-ivory-soft">
              This removes your login and your details. Your past orders stay on file as we are required to
              keep them for our accounts, but they are no longer linked to a login. This can&apos;t be undone.
            </p>
            <DeleteAccountForm />
          </details>
        </Panel>
      </div>
    </AccountShell>
  );
}

export default function DetailsPage() {
  return (
    <Suspense fallback={<p className="px-8 py-20 text-center text-ivory-soft">Loading…</p>}>
      <Content />
    </Suspense>
  );
}
