import Link from "next/link";
import { notFound } from "next/navigation";
import { SITE, wa, OCCASIONS } from "../../../lib/site";
import { getContent } from "../../../lib/content";

export const dynamicParams = false;
export const generateStaticParams = () => OCCASIONS.map((o) => ({ slug: o.slug }));
const find = (s) => OCCASIONS.find((o) => o.slug === s);

export function generateMetadata({ params }) {
  const o = find(params.slug);
  if (!o) return {};
  return { title: `${o.title} in ${SITE.city}`, description: `${o.text} Order on WhatsApp.`, alternates: { canonical: `/occasions/${o.slug}` } };
}

export default async function Occasion({ params }) {
  const { BOXES } = await getContent();
  const o = find(params.slug);
  if (!o) notFound();
  return (
    <main>
      <section className="hero">
        <h1>{o.h1} in {SITE.city}</h1>
        <p>{o.text}</p>
        <a className="btn" href={wa(`Hi, I need ${o.title.toLowerCase()}. Date: , Boxes: , Area: `)}>Get a quote on WhatsApp</a>
      </section>
      <section className="sec">
        <h2>Box options</h2>
        <div className="grid">{BOXES.map((b) => (<article key={b.name} className="card"><h3>{b.name}</h3><p className="price">{b.price}<small> / box</small></p><p>{b.items}</p></article>))}</div>
        <p>Delivered sealed, with cutlery included. No serving staff needed. <Link href="/bulk-meal-boxes">See how bulk orders work</Link>.</p>
      </section>
    </main>
  );
}
