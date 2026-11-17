import { SITE, wa } from "../../lib/site";
import { getContent } from "../../lib/content";

export const metadata = {
  title: `Bulk Meal Boxes & Party Lunch Boxes in ${SITE.city}`,
  description: `Packed lunch boxes for offices, pooja, birthdays and events in ${SITE.city}. 20 to 100+ boxes, delivered ready to eat.`,
  alternates: { canonical: "/bulk-meal-boxes" },
};

export default async function Bulk() {
  const { BOXES } = await getContent();
  return (
    <main>
      <section className="hero">
        <h1>Bulk meal boxes for offices, parties and events in {SITE.city}</h1>
        <p>Individually packed, delivered ready to eat. No setup, no serving staff.</p>
        <a className="btn" href={wa("Hi, I need a quote for bulk meal boxes. Date: , Boxes: , Area: ")}>Get a quote on WhatsApp</a>
      </section>
      <section className="sec">
        <h2>Box options</h2>
        <div className="grid">
          {BOXES.map((b) => (<article key={b.name} className="card"><h3>{b.name}</h3><p className="price">{b.price}<small> / box</small></p><p>{b.items}</p></article>))}
        </div>
        <p className="muted">Veg and Jain options available. Cutlery and napkins included.</p>
      </section>
      <section className="sec tint">
        <h2>How it works</h2>
        <ol className="steps">
          <li>Message us the date, number of boxes and delivery area.</li>
          <li>We confirm the menu and price.</li>
          <li>Pay by UPI to book your slot.</li>
          <li>We deliver sealed boxes on time.</li>
        </ol>
      </section>
    </main>
  );
}
