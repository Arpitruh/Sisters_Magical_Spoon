import { SITE, OCCASIONS } from "../lib/site";
import { POSTS } from "../lib/posts";
export default function sitemap() {
  const pages = ["", "/bulk-meal-boxes", "/about", "/gallery", "/blog", ...SITE.areas.map((a) => `/areas/${a.slug}`), ...OCCASIONS.map((o) => `/occasions/${o.slug}`), ...POSTS.map((b) => `/blog/${b.slug}`)];
  return pages.map((p) => ({ url: `${SITE.url}${p}`, lastModified: new Date() }));
}
