import { notFound } from "next/navigation";
import { SITE, wa } from "../../../lib/site";
import { getContent } from "../../../lib/content";

export const dynamicParams = false;
export const generateStaticParams = () => SITE.areas.map((a) => ({ slug: a.slug }));
const find = (slug) => SITE.areas.find((a) => a.slug === slug);

export function generateMetadata({ params }) {
  const a = find(params.slug);
  if (!a) return {};
  return {
    title: `Tiffin Service in ${a.name}, ${SITE.city}`,
    description: `Home-style daily and monthly tiffin delivered in ${a.name}, ${SITE.city}. Fresh, hygienic, on time. Order on WhatsApp.`,
    alternates: { canonical: `/areas/${a.slug}` },
  };
}

export default async function Area({ params }) {
  const { MENU } = await getContent();
  const a = find(params.slug);
  if (!a) notFound();
  return (
    <main>
      <section className="hero">
        <h1>Tiffin service in {a.name}, {SITE.city}</h1>
        <p>Fresh home-style meals delivered to homes, PGs and offices in {a.name}. Daily, weekly or monthly.</p>
        <a className="btn" href={wa(`Hi, I live in ${a.name}. I want to order tiffin.`)}>Order on WhatsApp</a>
      </section>
      <section className="sec">
        <h2>Menu for {a.name}</h2>
        <ul className="menu">{MENU.map(([d, m]) => (<li key={d}><b>{d}</b><span>{m}</span></li>))}</ul>
      </section>
    </main>
  );
}
