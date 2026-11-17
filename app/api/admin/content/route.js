import { NextResponse } from "next/server";
import { put } from "@vercel/blob";
import { revalidatePath, revalidateTag } from "next/cache";
import { isAdmin } from "../../../../lib/auth";
import { getContent, clean } from "../../../../lib/content";

export async function GET() {
  if (!(await isAdmin())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  return NextResponse.json({ ...(await getContent()), storage: !!process.env.BLOB_READ_WRITE_TOKEN });
}

export async function PUT(req) {
  if (!(await isAdmin())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  if (!process.env.BLOB_READ_WRITE_TOKEN) return NextResponse.json({ error: "Blob storage is not connected" }, { status: 500 });
  const data = clean(await req.json().catch(() => ({})));
  await put("content.json", JSON.stringify(data), { access: "public", addRandomSuffix: false, allowOverwrite: true, contentType: "application/json", cacheControlMaxAge: 60 });
  revalidateTag("content");
  revalidatePath("/", "layout");
  return NextResponse.json({ ok: true });
}
