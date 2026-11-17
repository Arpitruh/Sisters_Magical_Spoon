import Link from "next/link";
import { notFound } from "next/navigation";
import { SITE, wa } from "../../../lib/site";
import { POSTS } from "../../../lib/posts";

export const dynamicParams = false;
export const generateStaticParams = () => POSTS.map((p) => ({ slug: p.slug }));
const find = (s) => POSTS.find((p) => p.slug === s);

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const p = find(slug);
  return p ? { title: p.title, description: p.desc, alternates: { canonical: `/blog/${p.slug}` } } : {};
}

export default async function Post({ params }) {
  const { slug } = await params;
  const p = find(slug);
  if (!p) notFound();
  const ld = { "@context": "https://schema.org", "@type": "Article", headline: p.title, description: p.desc, author: { "@type": "Organization", name: SITE.name }, mainEntityOfPage: `${SITE.url}/blog/${p.slug}` };
  return (
    <main className="sec">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
      <h1>{p.title}</h1>
      {p.body.map(([h, t]) => (<section key={h}><h2>{h}</h2><p>{t}</p></section>))}
      <p>Ready to try? See our <Link href="/#plans">tiffin plans</Link> or <Link href="/bulk-meal-boxes">bulk meal boxes</Link>, or <a href={wa("Hi, I read your blog and want to try a trial meal")}>message us on WhatsApp</a>.</p>
    </main>
  );
}
