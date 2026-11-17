import Link from "next/link";
import AreaCheck from "../components/AreaCheck";
import { SITE, wa, FAQS, REVIEWS } from "../lib/site";
import { getContent } from "../lib/content";

export const metadata = {
  title: { absolute: `Home-Style Tiffin Service in ${SITE.city} | ${SITE.name}` },
  description: `Daily, weekly and monthly home-style tiffin in ${SITE.city}, plus packed bulk meal boxes for offices and events. Order on WhatsApp.`,
};

export default async function Home() {
  const { MENU, PLANS, BOXES } = await getContent();
  const faq = { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: FAQS.map(([q, a]) => ({ "@type": "Question", name: q, acceptedAnswer: { "@type": "Answer", text: a } })) };
  return (
    <main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faq) }} />
      <section className="hero">
        <h1>Fresh home-style tiffin in {SITE.city}, at your door every day</h1>
        <p>{SITE.tagline}. Cooked in our cloud kitchen, packed hot, delivered on time.</p>
        <div className="row">
          <a className="btn" href={wa("Hi, I want to order a tiffin plan")}>Order on WhatsApp</a>
          <a className="btn ghost" href={wa("Hi, I want a trial meal")}>Get a trial meal</a>
        </div>
      </section>

      <section id="menu" className="sec">
        <h2>This week’s menu</h2>
        <ul className="menu">{MENU.map(([d, m]) => (<li key={d}><b>{d}</b><span>{m}</span></li>))}</ul>
      </section>

      <section id="plans" className="sec tint">
        <h2>Tiffin plans</h2>
        <div className="grid">
          {PLANS.map((p) => (
            <article key={p.name} className="card">
              <h3>{p.name}</h3><p className="price">{p.price}</p><p>{p.note}</p>
              <a className="btn sm" href={wa(`Hi, I want the ${p.name} plan`)}>Choose plan</a>
            </article>
          ))}
        </div>
        <p className="muted">Order and pay through WhatsApp. UPI accepted.</p>
      </section>

      <section className="sec">
        <h2>Packed meal boxes for offices and events</h2>
        <p>Ready-to-eat boxes for 20, 50 or 100+ people. Delivered packed, no serving staff needed.</p>
        <div className="grid">
          {BOXES.map((b) => (<article key={b.name} className="card"><h3>{b.name}</h3><p className="price">{b.price}<small> / box</small></p><p>{b.items}</p></article>))}
        </div>
        <Link className="btn" href="/bulk-meal-boxes">See bulk order details</Link>
      </section>

      <section className="sec tint">
        <h2>Where we deliver</h2>
        <ul className="chips">{SITE.areas.map((a) => (<li key={a.slug}><Link href={`/areas/${a.slug}`}>{a.name}</Link></li>))}</ul>
        <AreaCheck />
        <iframe className="map" title={`Map of ${SITE.name}`} loading="lazy" src={`https://www.google.com/maps?q=${encodeURIComponent(SITE.mapQuery)}&output=embed`} />
      </section>

      <section className="sec">
        <h2>What customers say</h2>
        {REVIEWS.length > 0 && <div className="grid">{REVIEWS.map((r) => (<blockquote key={r.name} className="card"><p>{r.text}</p><footer>{r.name}</footer></blockquote>))}</div>}
        <p><a className="btn" href={SITE.reviewUrl}>Read and write reviews on Google</a></p>
      </section>

      <section id="faq" className="sec">
        <h2>Questions</h2>
        {FAQS.map(([q, a]) => (<details key={q}><summary>{q}</summary><p>{a}</p></details>))}
      </section>
    </main>
  );
}
