import "server-only";
import { createHash, randomBytes } from "node:crypto";
import { cookies } from "next/headers";
import { cache } from "react";
import { dbConfigured, query } from "@/lib/db";

/**
 * Sessions live in the database: the cookie holds a random token, the database only its SHA-256,
 * so a leaked database can't be used to sign in. The cookie is httpOnly and SameSite=Lax.
 */
const COOKIE = "aluwwah_session";
const DAYS = 30;

export type User = {
  id: string;
  email: string;
  name: string;
  emailVerified: boolean;
};

export const sha256 = (value: string) => createHash("sha256").update(value).digest("hex");

export async function createSession(userId: string) {
  const token = randomBytes(32).toString("base64url");
  const expires = new Date(Date.now() + DAYS * 24 * 60 * 60 * 1000);
  await query(`INSERT INTO sessions (user_id, token_hash, expires_at) VALUES ($1, $2, $3)`, [
    userId,
    sha256(token),
    expires,
  ]);
  (await cookies()).set(COOKIE, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    expires,
  });
}

/** The signed-in customer, or null. Cached for the duration of one request. */
export const getUser = cache(async (): Promise<User | null> => {
  if (!dbConfigured()) return null;
  const token = (await cookies()).get(COOKIE)?.value;
  if (!token) return null;
  const rows = await query<{ id: string; email: string; name: string; email_verified_at: Date | null }>(
    `SELECT u.id, u.email, u.name, u.email_verified_at
       FROM sessions s JOIN users u ON u.id = s.user_id
      WHERE s.token_hash = $1 AND s.expires_at > now()`,
    [sha256(token)],
  );
  const u = rows[0];
  return u ? { id: u.id, email: u.email, name: u.name, emailVerified: Boolean(u.email_verified_at) } : null;
});

export async function destroySession() {
  const jar = await cookies();
  const token = jar.get(COOKIE)?.value;
  if (token && dbConfigured()) await query(`DELETE FROM sessions WHERE token_hash = $1`, [sha256(token)]);
  jar.delete(COOKIE);
}

export async function destroyAllSessions(userId: string) {
  await query(`DELETE FROM sessions WHERE user_id = $1`, [userId]);
}
