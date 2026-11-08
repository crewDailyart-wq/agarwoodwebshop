"use client";

import Link from "next/link";
import { useActionState, useState, type ReactNode } from "react";
import {
  changePassword,
  confirmEmail,
  deleteAccount,
  forgotPassword,
  login,
  register,
  resendVerification,
  resetPassword,
  updateProfile,
  type FormState,
} from "@/app/account/actions";

const field =
  "w-full min-h-12 border border-gold-line bg-transparent px-4 text-ivory placeholder:text-ivory-faint focus:border-gold focus:outline-none";
const fieldCompact =
  "w-full min-h-11 border border-gold-line bg-black/20 px-3.5 text-[0.95rem] text-ivory placeholder:text-ivory-faint focus:border-gold focus:outline-none";

function Label({ text, children, hint }: { text: string; children: ReactNode; hint?: string }) {
  return (
    <label className="block text-sm">
      <span className="mb-2 block text-ivory-soft">{text}</span>
      {children}
      {hint && <span className="mt-1.5 block text-xs text-ivory-faint">{hint}</span>}
    </label>
  );
}

/** A password box with a Show / Hide switch. */
function PasswordInput({
  name,
  autoComplete,
  className,
  placeholder,
}: {
  name: string;
  autoComplete: string;
  className: string;
  placeholder?: string;
}) {
  const [shown, setShown] = useState(false);
  return (
    <span className="relative block">
      <input
        name={name}
        type={shown ? "text" : "password"}
        required
        autoComplete={autoComplete}
        placeholder={placeholder}
        className={`${className} pr-16`}
        maxLength={200}
      />
      <button
        type="button"
        onClick={() => setShown((s) => !s)}
        className="absolute inset-y-0 right-0 px-3.5 font-[family-name:var(--font-caps)] text-[0.6rem] uppercase tracking-[0.16em] text-gold hover:text-gold-bright"
        aria-label={shown ? "Hide password" : "Show password"}
      >
        {shown ? "Hide" : "Show"}
      </button>
    </span>
  );
}

function Notice({ state }: { state: FormState }) {
  if (state?.error) {
    return (
      <p role="alert" className="border border-[#b4533f] bg-[#b4533f]/10 px-4 py-3 text-sm text-[#f1c2b6]">
        {state.error}
      </p>
    );
  }
  if (state?.message && state.message !== "unverified") {
    return (
      <p role="status" className="border border-gold-line bg-gold/[0.07] px-4 py-3 text-sm text-ivory">
        {state.message}
      </p>
    );
  }
  return null;
}

function Submit({ pending, children, className = "" }: { pending: boolean; children: ReactNode; className?: string }) {
  return (
    <button type="submit" disabled={pending} className={`btn btn-solid ${className}`}>
      {pending ? "One moment…" : children}
    </button>
  );
}

/** The hidden bait field for bots. */
function Honeypot() {
  return (
    <div aria-hidden className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
      <label>
        Website
        <input name="website" tabIndex={-1} autoComplete="off" />
      </label>
    </div>
  );
}

export function LoginForm({ next }: { next?: string }) {
  const [state, action, pending] = useActionState(login, undefined);
  return (
    <div className="space-y-6">
      <form action={action} className="space-y-5">
        {next && <input type="hidden" name="next" value={next} />}
        <Label text="Email address">
          <input
            name="email"
            type="email"
            required
            autoComplete="email"
            defaultValue={state?.values?.email}
            className={field}
            maxLength={254}
          />
        </Label>
        <Label text="Password">
          <PasswordInput name="password" autoComplete="current-password" className={field} />
        </Label>
        <Notice state={state} />
        <div className="flex flex-wrap items-center justify-between gap-4">
          <Submit pending={pending}>Sign in</Submit>
          <Link href="/account/forgot-password" className="text-sm text-gold hover:text-gold-bright">
            Forgot your password?
          </Link>
        </div>
      </form>
      {state?.message === "unverified" && <ResendVerificationForm />}
    </div>
  );
}

export function ResendVerificationForm({ defaultEmail = "" }: { defaultEmail?: string }) {
  const [state, action, pending] = useActionState(resendVerification, undefined);
  return (
    <form action={action} className="space-y-4 border border-gold-line p-5">
      <p className="text-sm text-ivory-soft">Didn&apos;t get the email? We can send the link again.</p>
      <Label text="Email address">
        <input
          name="email"
          type="email"
          required
          defaultValue={state?.values?.email ?? defaultEmail}
          autoComplete="email"
          className={field}
        />
      </Label>
      <Notice state={state} />
      <Submit pending={pending} className="btn-line">
        Send a new link
      </Submit>
    </form>
  );
}

/** Full sign-up form (page) or the short one for the footer (`compact`). */
export function RegisterForm({ compact = false }: { compact?: boolean }) {
  const [state, action, pending] = useActionState(register, undefined);
  const f = compact ? fieldCompact : field;
  return (
    <form action={action} className={compact ? "space-y-3" : "space-y-5"}>
      <Honeypot />
      {!compact && (
        <Label text="Your name">
          <input name="name" autoComplete="name" defaultValue={state?.values?.name} className={f} maxLength={80} />
        </Label>
      )}
      <Label text="Email address">
        <input
          name="email"
          type="email"
          required
          autoComplete="email"
          defaultValue={state?.values?.email}
          className={f}
          maxLength={254}
        />
      </Label>
      <Label text="Password" hint="At least 10 characters, with letters and numbers.">
        <PasswordInput name="password" autoComplete="new-password" className={f} />
      </Label>
      {!compact && (
        <Label text="Repeat password">
          <PasswordInput name="confirm" autoComplete="new-password" className={f} />
        </Label>
      )}
      <Notice state={state} />
      <Submit pending={pending} className={compact ? "w-full" : ""}>
        Create account
      </Submit>
      {!compact && (
        <p className="text-xs leading-relaxed text-ivory-faint">
          By creating an account you agree to our{" "}
          <Link href="/privacy" className="text-gold hover:text-gold-bright">
            privacy policy
          </Link>
          . We only use your details for your orders and account.
        </p>
      )}
    </form>
  );
}

export function ForgotPasswordForm() {
  const [state, action, pending] = useActionState(forgotPassword, undefined);
  return (
    <form action={action} className="space-y-5">
      <Label text="Email address">
        <input
          name="email"
          type="email"
          required
          autoComplete="email"
          defaultValue={state?.values?.email}
          className={field}
          maxLength={254}
        />
      </Label>
      <Notice state={state} />
      <Submit pending={pending}>Email me a link</Submit>
    </form>
  );
}

export function ResetPasswordForm({ token }: { token: string }) {
  const [state, action, pending] = useActionState(resetPassword, undefined);
  return (
    <form action={action} className="space-y-5">
      <input type="hidden" name="token" value={token} />
      <Label text="New password" hint="At least 10 characters, with letters and numbers.">
        <PasswordInput name="password" autoComplete="new-password" className={field} />
      </Label>
      <Label text="Repeat new password">
        <PasswordInput name="confirm" autoComplete="new-password" className={field} />
      </Label>
      <Notice state={state} />
      <Submit pending={pending}>Save new password</Submit>
    </form>
  );
}

export function ConfirmEmailForm({ token }: { token: string }) {
  const [state, action, pending] = useActionState(confirmEmail, undefined);
  return (
    <form action={action} className="space-y-5">
      <input type="hidden" name="token" value={token} />
      <Notice state={state} />
      <Submit pending={pending}>Confirm my email</Submit>
    </form>
  );
}

export function ProfileForm({ name, email }: { name: string; email: string }) {
  const [state, action, pending] = useActionState(updateProfile, undefined);
  return (
    <form action={action} className="space-y-5">
      <Label text="Your name">
        <input name="name" defaultValue={name} autoComplete="name" className={field} maxLength={80} />
      </Label>
      <Label text="Email address" hint="This is the address you sign in with. To change it, please contact us.">
        <input value={email} readOnly className={`${field} opacity-70`} />
      </Label>
      <Notice state={state} />
      <Submit pending={pending}>Save</Submit>
    </form>
  );
}

export function ChangePasswordForm() {
  const [state, action, pending] = useActionState(changePassword, undefined);
  return (
    <form action={action} className="space-y-5">
      <Label text="Current password">
        <PasswordInput name="current" autoComplete="current-password" className={field} />
      </Label>
      <Label text="New password" hint="At least 10 characters, with letters and numbers.">
        <PasswordInput name="newPassword" autoComplete="new-password" className={field} />
      </Label>
      <Label text="Repeat new password">
        <PasswordInput name="confirm" autoComplete="new-password" className={field} />
      </Label>
      <Notice state={state} />
      <Submit pending={pending}>Change password</Submit>
    </form>
  );
}

export function DeleteAccountForm() {
  const [state, action, pending] = useActionState(deleteAccount, undefined);
  return (
    <form action={action} className="space-y-5">
      <Label text="Your password, to confirm">
        <PasswordInput name="password" autoComplete="current-password" className={field} />
      </Label>
      <Notice state={state} />
      <Submit pending={pending} className="btn-line">
        Delete my account
      </Submit>
    </form>
  );
}
