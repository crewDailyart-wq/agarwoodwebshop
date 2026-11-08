import "server-only";
import { neon } from "@neondatabase/serverless";

/**
 * Postgres access. On Vercel the Neon integration sets DATABASE_URL; the tables are created on
 * first use (everything is `IF NOT EXISTS`), so there is no separate migration step.
 * A localhost URL uses the plain `pg` driver instead, for development.
 */
type Row = Record<string, unknown>;

const url = () => process.env.DATABASE_URL ?? process.env.POSTGRES_URL ?? "";
export const dbConfigured = () => Boolean(url());

let neonSql: ReturnType<typeof neon> | undefined;
let pool: import("pg").Pool | undefined;

async function run<T extends Row>(text: string, params: unknown[]): Promise<T[]> {
  const u = url();
  if (!u) throw new Error("DATABASE_URL is not set");
  if (/@(localhost|127\.0\.0\.1)[:/]/.test(u)) {
    const { Pool } = await import("pg");
    pool ??= new Pool({ connectionString: u });
    return (await pool.query(text, params)).rows as T[];
  }
  neonSql ??= neon(u);
  return (await neonSql.query(text, params)) as T[];
}

const schema = [
  `CREATE TABLE IF NOT EXISTS users (
     id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
     email text NOT NULL UNIQUE,
     name text NOT NULL DEFAULT '',
     password_hash text NOT NULL,
     email_verified_at timestamptz,
     failed_logins integer NOT NULL DEFAULT 0,
     locked_until timestamptz,
     created_at timestamptz NOT NULL DEFAULT now()
   )`,
  `CREATE TABLE IF NOT EXISTS sessions (
     id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
     user_id uuid NOT NULL REFERENCES users(id) ON DELETE CASCADE,
     token_hash text NOT NULL UNIQUE,
     expires_at timestamptz NOT NULL,
     created_at timestamptz NOT NULL DEFAULT now()
   )`,
  `CREATE TABLE IF NOT EXISTS auth_tokens (
     id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
     user_id uuid NOT NULL REFERENCES users(id) ON DELETE CASCADE,
     kind text NOT NULL,
     token_hash text NOT NULL UNIQUE,
     expires_at timestamptz NOT NULL,
     used_at timestamptz,
     created_at timestamptz NOT NULL DEFAULT now()
   )`,
  `CREATE TABLE IF NOT EXISTS orders (
     id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
     ref text NOT NULL UNIQUE,
     user_id uuid REFERENCES users(id) ON DELETE SET NULL,
     email text NOT NULL,
     name text NOT NULL DEFAULT '',
     status text NOT NULL,
     payment_method text NOT NULL DEFAULT 'online',
     mollie_payment_id text UNIQUE,
     lines jsonb NOT NULL,
     subtotal_cents integer NOT NULL,
     shipping_cents integer NOT NULL,
     total_cents integer NOT NULL,
     address jsonb NOT NULL,
     tracking_url text,
     paid_at timestamptz,
     shipped_at timestamptz,
     delivered_at timestamptz,
     confirmation_sent_at timestamptz,
     created_at timestamptz NOT NULL DEFAULT now(),
     updated_at timestamptz NOT NULL DEFAULT now()
   )`,
  `CREATE INDEX IF NOT EXISTS orders_user_idx ON orders (user_id)`,
  `CREATE INDEX IF NOT EXISTS orders_email_idx ON orders (lower(email))`,
  `CREATE INDEX IF NOT EXISTS sessions_user_idx ON sessions (user_id)`,
];

let ready: Promise<void> | undefined;

async function ensureSchema() {
  for (const statement of schema) {
    try {
      await run(statement, []);
    } catch {
      // Two cold starts creating the same table at once: the loser just tries again.
      await run(statement, []);
    }
  }
}

/** Runs a query, creating the tables first if this is the first query since the server started. */
export async function query<T extends Row = Row>(text: string, params: unknown[] = []): Promise<T[]> {
  ready ??= ensureSchema().catch((err) => {
    ready = undefined;
    throw err;
  });
  await ready;
  return run<T>(text, params);
}
