import "server-only";
import { redirect } from "next/navigation";
import { dbConfigured } from "@/lib/db";
import { getUser, type User } from "@/lib/session";

/** For pages that need a signed-in customer; others are sent to sign in and then back. */
export async function requireUser(returnTo = "/account"): Promise<User> {
  if (!dbConfigured()) redirect("/account/login");
  const user = await getUser();
  if (!user) redirect(`/account/login?next=${encodeURIComponent(returnTo)}`);
  return user;
}

export const firstName = (u: { name: string; email: string }) => u.name.split(" ")[0] || u.email.split("@")[0];

const dateFormat = new Intl.DateTimeFormat("en-GB", { day: "numeric", month: "long", year: "numeric" });
export const formatDate = (d: Date) => dateFormat.format(d);
