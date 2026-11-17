import { list } from "@vercel/blob";
import { MENU, PLANS, BOXES, GALLERY } from "./site";

export const DEFAULTS = { MENU, PLANS, BOXES, GALLERY, NOTICE: { on: false, text: "", from: "", to: "" } };

// Editable content lives in Vercel Blob as content.json; falls back to lib/site.js defaults.
export async function getContent() {
  if (!process.env.BLOB_READ_WRITE_TOKEN) return DEFAULTS;
  try {
    const { blobs } = await list({ prefix: "content.json", limit: 1 });
    if (!blobs[0]) return DEFAULTS;
    const r = await fetch(blobs[0].url, { next: { tags: ["content"] } });
    return { ...DEFAULTS, ...(await r.json()) };
  } catch {
    return DEFAULTS;
  }
}

const s = (v, n = 200) => String(v ?? "").slice(0, n).trim();
const ok = (u) => u.startsWith("/photos/") || /^https:\/\/[a-z0-9-]+\.public\.blob\.vercel-storage\.com\//.test(u);

export function clean(d) {
  const arr = (x, max) => (Array.isArray(x) ? x.slice(0, max) : []);
  return {
    MENU: arr(d.MENU, 7).map((r) => [s(r[0], 20), s(r[1], 300)]),
    PLANS: arr(d.PLANS, 8).map((r) => ({ name: s(r.name, 60), price: s(r.price, 20), note: s(r.note, 120) })),
    BOXES: arr(d.BOXES, 8).map((r) => ({ name: s(r.name, 60), price: s(r.price, 20), items: s(r.items, 200) })),
    NOTICE: { on: !!d.NOTICE?.on, text: s(d.NOTICE?.text, 200), from: s(d.NOTICE?.from, 10), to: s(d.NOTICE?.to, 10) },
    GALLERY: arr(d.GALLERY, 30).map((r) => ({ src: s(r.src, 500), alt: s(r.alt, 160) })).filter((r) => ok(r.src) && r.alt),
  };
}
