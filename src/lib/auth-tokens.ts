import "server-only";
import { randomBytes } from "node:crypto";
import { query } from "@/lib/db";
import { sha256 } from "@/lib/session";

/** One-time links sent by email: confirming an address, or choosing a new password. */
export type TokenKind = "verify" | "reset";

const LIFETIME_MS: Record<TokenKind, number> = {
  verify: 3 * 24 * 60 * 60 * 1000,
  reset: 60 * 60 * 1000,
};

export async function createToken(userId: string, kind: TokenKind): Promise<string> {
  const token = randomBytes(32).toString("base64url");
  // A new link replaces any earlier unused one of the same kind.
  await query(`DELETE FROM auth_tokens WHERE user_id = $1 AND kind = $2 AND used_at IS NULL`, [userId, kind]);
  await query(`INSERT INTO auth_tokens (user_id, kind, token_hash, expires_at) VALUES ($1, $2, $3, $4)`, [
    userId,
    kind,
    sha256(token),
    new Date(Date.now() + LIFETIME_MS[kind]),
  ]);
  return token;
}

/** Uses a token up. Returns the user it belongs to, or null if it is unknown, used or expired. */
export async function consumeToken(token: string, kind: TokenKind): Promise<string | null> {
  if (!/^[A-Za-z0-9_-]{20,100}$/.test(token)) return null;
  const rows = await query<{ user_id: string }>(
    `UPDATE auth_tokens SET used_at = now()
      WHERE token_hash = $1 AND kind = $2 AND used_at IS NULL AND expires_at > now()
      RETURNING user_id`,
    [sha256(token), kind],
  );
  return rows[0]?.user_id ?? null;
}

/** Checks a token without using it (to decide whether to show the form). */
export async function peekToken(token: string, kind: TokenKind): Promise<boolean> {
  if (!/^[A-Za-z0-9_-]{20,100}$/.test(token)) return false;
  const rows = await query(
    `SELECT 1 FROM auth_tokens WHERE token_hash = $1 AND kind = $2 AND used_at IS NULL AND expires_at > now()`,
    [sha256(token), kind],
  );
  return rows.length > 0;
}
