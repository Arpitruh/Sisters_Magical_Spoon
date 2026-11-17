import { NextResponse } from "next/server";
import { put } from "@vercel/blob";
import { isAdmin } from "../../../../lib/auth";

const TYPES = { "image/jpeg": "jpg", "image/png": "png", "image/webp": "webp" };
export async function POST(req) {
  if (!(await isAdmin())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const file = (await req.formData().catch(() => null))?.get("file");
  if (!file || !TYPES[file.type]) return NextResponse.json({ error: "Upload a JPG, PNG or WebP image" }, { status: 400 });
  if (file.size > 4 * 1024 * 1024) return NextResponse.json({ error: "Image must be under 4 MB" }, { status: 400 });
  const blob = await put(`photos/photo.${TYPES[file.type]}`, file, { access: "public", addRandomSuffix: true });
  return NextResponse.json({ url: blob.url });
}
