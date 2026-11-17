import crypto from "crypto";
import { cookies } from "next/headers";

const key = () => `${process.env.ADMIN_SECRET || ""}`;
export const token = () => crypto.createHmac("sha256", key()).update(process.env.ADMIN_PASSWORD || "").digest("hex");
const same = (a, b) => a.length === b.length && crypto.timingSafeEqual(Buffer.from(a), Buffer.from(b));

export async function isAdmin() {
  if (!process.env.ADMIN_PASSWORD || !process.env.ADMIN_SECRET) return false;
  const cookieStore = await cookies();
  return same(cookieStore.get("adm")?.value || "", token());
}
export const checkPassword = (pw) => !!process.env.ADMIN_PASSWORD && !!process.env.ADMIN_SECRET && same(
  crypto.createHash("sha256").update(String(pw)).digest("hex"),
  crypto.createHash("sha256").update(process.env.ADMIN_PASSWORD).digest("hex"));
