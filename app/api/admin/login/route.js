import { NextResponse } from "next/server";
import { checkPassword, token } from "../../../../lib/auth";

const tries = new Map(); // best-effort throttle per IP (resets on cold start)
export async function POST(req) {
  const ip = req.headers.get("x-forwarded-for") || "x";
  const n = tries.get(ip) || { c: 0, t: Date.now() };
  if (Date.now() - n.t > 15 * 60e3) { n.c = 0; n.t = Date.now(); }
  if (n.c >= 5) return NextResponse.json({ error: "Too many attempts. Try again in 15 minutes." }, { status: 429 });
  const { password } = await req.json().catch(() => ({}));
  if (!checkPassword(password)) { n.c++; tries.set(ip, n); return NextResponse.json({ error: "Wrong password" }, { status: 401 }); }
  const res = NextResponse.json({ ok: true });
  res.cookies.set("adm", token(), { httpOnly: true, secure: true, sameSite: "strict", path: "/", maxAge: 60 * 60 * 24 * 7 });
  return res;
}
