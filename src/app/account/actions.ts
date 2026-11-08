"use server";

import { redirect } from "next/navigation";
import { consumeToken, createToken, type TokenKind } from "@/lib/auth-tokens";
import { dbConfigured, query } from "@/lib/db";
import {
  origin,
  sendAlreadyRegisteredEmail,
  sendPasswordResetEmail,
  sendVerificationEmail,
} from "@/lib/email";
import { linkGuestOrders } from "@/lib/orders";
import { dummyHash, hashPassword, verifyPassword } from "@/lib/password";
import { createSession, destroyAllSessions, destroySession, getUser } from "@/lib/session";

/** `values` hands back what was typed (never passwords), because a submitted form is cleared. */
export type FormState =
  | { error?: string; message?: string; values?: { email?: string; name?: string } }
  | undefined;

const UNAVAILABLE = "Accounts are not available yet. Please try again later.";
const MIN_PASSWORD = 10;
const MAX_FAILED = 8;
const LOCK_MINUTES = 15;

const text = (form: FormData, key: string, max = 200) => {
  const v = form.get(key);
  return typeof v === "string" ? v.trim().slice(0, max) : "";
};
const email = (form: FormData) => text(form, "email", 254).toLowerCase();
const validEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v);
const rawPassword = (form: FormData, key = "password") => {
  const v = form.get(key);
  return typeof v === "string" ? v.slice(0, 200) : "";
};

const fail = (error: string, form: FormData, extra: { message?: string } = {}): FormState => ({
  error,
  ...extra,
  values: { email: email(form), name: text(form, "name", 80) },
});

function passwordProblem(password: string): string | null {
  if (password.length < MIN_PASSWORD) return `Your password needs at least ${MIN_PASSWORD} characters.`;
  if (!/[A-Za-z]/.test(password) || !/[0-9]/.test(password)) {
    return "Please use both letters and numbers in your password.";
  }
  return null;
}

/** Only ever send people to a page on this site. */
function safeNext(value: string): string | null {
  return value.startsWith("/") && !value.startsWith("//") && !value.includes("\\") ? value : null;
}

/** True if a link of this kind was already emailed to the user in the last minute. */
async function sentRecently(userId: string, kind: TokenKind) {
  const rows = await query(
    `SELECT 1 FROM auth_tokens WHERE user_id = $1 AND kind = $2 AND created_at > now() - interval '60 seconds'`,
    [userId, kind],
  );
  return rows.length > 0;
}

async function sendVerification(userId: string, to: string, name: string): Promise<boolean> {
  if (await sentRecently(userId, "verify")) return true;
  const token = await createToken(userId, "verify");
  return sendVerificationEmail(to, name, `${origin()}/account/verify?token=${token}`);
}

export async function register(_: FormState, form: FormData): Promise<FormState> {
  if (!dbConfigured()) return fail(UNAVAILABLE, form);
  // A hidden field real visitors never fill in; bots do.
  if (text(form, "website")) redirect("/account/check-email");

  const to = email(form);
  const name = text(form, "name", 80);
  const password = rawPassword(form);
  if (!validEmail(to)) return fail("Please enter a valid email address.", form);
  if (form.has("confirm") && password !== rawPassword(form, "confirm")) {
    return fail("The two passwords don't match.", form);
  }
  const problem = passwordProblem(password);
  if (problem) return fail(problem, form);

  const hash = await hashPassword(password);
  const created = await query<{ id: string }>(
    `INSERT INTO users (email, name, password_hash) VALUES ($1, $2, $3)
     ON CONFLICT (email) DO NOTHING RETURNING id`,
    [to, name, hash],
  );

  if (created[0]) {
    if (!(await sendVerification(created[0].id, to, name))) {
      return fail("We couldn't send the confirmation email. Please try again in a moment.", form);
    }
  } else {
    // The address is taken. Say nothing different on screen (so addresses can't be probed);
    // the real owner gets an email instead.
    const existing = await query<{ id: string; name: string; email_verified_at: Date | null }>(
      `SELECT id, name, email_verified_at FROM users WHERE email = $1`,
      [to],
    );
    const user = existing[0];
    if (user && !user.email_verified_at) {
      // Never confirmed: the newest sign-up replaces the earlier one, so nobody can park an
      // address with a password only they know.
      await query(`UPDATE users SET password_hash = $2, name = $3 WHERE id = $1`, [user.id, hash, name || user.name]);
      await sendVerification(user.id, to, name || user.name);
    } else if (user && !(await sentRecently(user.id, "reset"))) {
      const token = await createToken(user.id, "reset");
      await sendAlreadyRegisteredEmail(to, `${origin()}/account/login`, `${origin()}/account/reset-password?token=${token}`);
    }
  }
  redirect(`/account/check-email?type=verify&email=${encodeURIComponent(to)}`);
}

export async function login(_: FormState, form: FormData): Promise<FormState> {
  if (!dbConfigured()) return fail(UNAVAILABLE, form);
  const to = email(form);
  const password = rawPassword(form);
  const next = safeNext(text(form, "next")) ?? "/account";
  if (!to || !password) return fail("Please enter your email address and password.", form);

  const rows = await query<{
    id: string;
    password_hash: string;
    email_verified_at: Date | null;
    failed_logins: number;
    locked_until: Date | null;
  }>(`SELECT id, password_hash, email_verified_at, failed_logins, locked_until FROM users WHERE email = $1`, [to]);
  const user = rows[0];

  if (user?.locked_until && new Date(user.locked_until) > new Date()) {
    return fail(`Too many attempts. Please try again in ${LOCK_MINUTES} minutes, or reset your password.`, form);
  }

  const ok = await verifyPassword(password, user?.password_hash ?? (await dummyHash()));
  if (!user || !ok) {
    if (user) {
      const locked = user.failed_logins + 1 >= MAX_FAILED;
      await query(
        `UPDATE users SET failed_logins = $2, locked_until = $3 WHERE id = $1`,
        [user.id, locked ? 0 : user.failed_logins + 1, locked ? new Date(Date.now() + LOCK_MINUTES * 60_000) : null],
      );
    }
    return fail("That email address and password don't match.", form);
  }

  if (!user.email_verified_at) {
    return fail("Please confirm your email address first. We've sent you a link.", form, { message: "unverified" });
  }

  await query(`UPDATE users SET failed_logins = 0, locked_until = NULL WHERE id = $1`, [user.id]);
  await linkGuestOrders(user.id, to);
  await createSession(user.id);
  redirect(next);
}

export async function resendVerification(_: FormState, form: FormData): Promise<FormState> {
  if (!dbConfigured()) return { error: UNAVAILABLE };
  const to = email(form);
  if (validEmail(to)) {
    const rows = await query<{ id: string; name: string; email_verified_at: Date | null }>(
      `SELECT id, name, email_verified_at FROM users WHERE email = $1`,
      [to],
    );
    if (rows[0] && !rows[0].email_verified_at) await sendVerification(rows[0].id, to, rows[0].name);
  }
  return {
    message: "If that address has an account waiting to be confirmed, we've sent a new link.",
    values: { email: to },
  };
}

export async function confirmEmail(_: FormState, form: FormData): Promise<FormState> {
  if (!dbConfigured()) return { error: UNAVAILABLE };
  const userId = await consumeToken(text(form, "token", 100), "verify");
  if (!userId) return { error: "This link has expired or has already been used. Request a new one below." };
  const rows = await query<{ email: string }>(
    `UPDATE users SET email_verified_at = COALESCE(email_verified_at, now()) WHERE id = $1 RETURNING email`,
    [userId],
  );
  if (rows[0]) await linkGuestOrders(userId, rows[0].email);
  await createSession(userId);
  redirect("/account?welcome=1");
}

export async function forgotPassword(_: FormState, form: FormData): Promise<FormState> {
  if (!dbConfigured()) return fail(UNAVAILABLE, form);
  const to = email(form);
  if (!validEmail(to)) return fail("Please enter a valid email address.", form);
  const rows = await query<{ id: string; name: string }>(`SELECT id, name FROM users WHERE email = $1`, [to]);
  const user = rows[0];
  if (user && !(await sentRecently(user.id, "reset"))) {
    const token = await createToken(user.id, "reset");
    await sendPasswordResetEmail(to, user.name, `${origin()}/account/reset-password?token=${token}`);
  }
  return {
    message: "If there is an account with that address, we've emailed you a link to choose a new password.",
    values: { email: to },
  };
}

export async function resetPassword(_: FormState, form: FormData): Promise<FormState> {
  if (!dbConfigured()) return { error: UNAVAILABLE };
  const password = rawPassword(form);
  if (password !== rawPassword(form, "confirm")) return { error: "The two passwords don't match." };
  const problem = passwordProblem(password);
  if (problem) return { error: problem };

  const userId = await consumeToken(text(form, "token", 100), "reset");
  if (!userId) return { error: "This link has expired or has already been used. Please request a new one." };

  const rows = await query<{ email: string }>(
    `UPDATE users SET password_hash = $2, failed_logins = 0, locked_until = NULL,
            email_verified_at = COALESCE(email_verified_at, now())
      WHERE id = $1 RETURNING email`,
    [userId, await hashPassword(password)],
  );
  await destroyAllSessions(userId); // anyone signed in with the old password is signed out
  if (rows[0]) await linkGuestOrders(userId, rows[0].email);
  redirect("/account/login?reset=1");
}

export async function logout() {
  await destroySession();
  redirect("/");
}

export async function updateProfile(_: FormState, form: FormData): Promise<FormState> {
  const user = await getUser();
  if (!user) redirect("/account/login");
  await query(`UPDATE users SET name = $2 WHERE id = $1`, [user.id, text(form, "name", 80)]);
  return { message: "Your details have been saved." };
}

export async function changePassword(_: FormState, form: FormData): Promise<FormState> {
  const user = await getUser();
  if (!user) redirect("/account/login");
  const next = rawPassword(form, "newPassword");
  if (next !== rawPassword(form, "confirm")) return { error: "The two new passwords don't match." };
  const problem = passwordProblem(next);
  if (problem) return { error: problem };

  const rows = await query<{ password_hash: string }>(`SELECT password_hash FROM users WHERE id = $1`, [user.id]);
  if (!rows[0] || !(await verifyPassword(rawPassword(form, "current"), rows[0].password_hash))) {
    return { error: "Your current password isn't correct." };
  }
  await query(`UPDATE users SET password_hash = $2 WHERE id = $1`, [user.id, await hashPassword(next)]);
  await destroyAllSessions(user.id);
  await createSession(user.id);
  return { message: "Your password has been changed." };
}

export async function deleteAccount(_: FormState, form: FormData): Promise<FormState> {
  const user = await getUser();
  if (!user) redirect("/account/login");
  const rows = await query<{ password_hash: string }>(`SELECT password_hash FROM users WHERE id = $1`, [user.id]);
  if (!rows[0] || !(await verifyPassword(rawPassword(form), rows[0].password_hash))) {
    return { error: "That password isn't correct." };
  }
  // Orders stay on file (we must keep them for our accounts) but are no longer tied to a login.
  await query(`DELETE FROM users WHERE id = $1`, [user.id]);
  await destroySession();
  redirect("/?account=deleted");
}
