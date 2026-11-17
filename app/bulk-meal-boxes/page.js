import Link from "next/link";
import { SITE, wa } from "../../lib/site";
import { getContent } from "../../lib/content";

export const metadata = {
  title: "Bulk Meal Boxes & Party Lunch Boxes in " + SITE.city,
  description: "Explore meal boxes for offices, parties and gatherings. Enquire about your group menu on WhatsApp.",
  alternates: { canonical: "/bulk-meal-boxes" },
};

export default async function Bulk() {
  const { BOXES } = await getContent();
  return (
    <main>
      <section className="hero">
        <span className="eyebrow">For days worth sharing</span>
        <h1>Good gatherings deserve good food.</h1>
        <p>Explore individual meal box options for workdays, celebrations and family occasions. Tell us your needs and we'll discuss the details.</p>
        <div className="row">
          <a className="btn" href={wa("Hi, I would like a quote for meal boxes. Event date: , Quantity: , Delivery area: ")}>Ask for a quote ↗</a>
          <a className="btn ghost" href="#box-options">Browse boxes ↓</a>
        </div>
      </section>
      <section className="sec" id="box-options">
        <div className="section-heading">
          <span className="kicker">Made for sharing</span>
          <h2>Find the right meal box.</h2>
          <p>Compare the menu options below. Prices and availability are confirmed when you order.</p>
        </div>
        <div className="grid">
          {BOXES.map((box, i) => (
            <article className="card pricing-card" key={box.name}>
              <span className="card-icon" aria-hidden="true">{i === 0 ? "🍱" : i === 1 ? "🥘" : "✨"}</span>
              <h3>{box.name}</h3>
              <p className="price">{box.price}<small> / box</small></p>
              <p>{box.items}</p>
              <a className="btn sm" href={wa("Hi, I'm interested in " + box.name + " for a group order. Date: , Quantity: , Area: ")}>Enquire about this box ↗</a>
            </article>
          ))}
        </div>
      </section>
      <section className="section-band">
        <div className="section-shell">
          <div className="section-heading">
            <span className="kicker">Easy from the start</span>
            <h2>How a bulk enquiry works.</h2>
            <p>We keep the first step simple so you can plan your event with clarity.</p>
          </div>
          <div className="steps-grid">
            <article className="step-card"><span className="step-number">01</span><h3>Share the occasion</h3><p>Tell us the date, location and number of meal boxes.</p></article>
            <article className="step-card"><span className="step-number">02</span><h3>Discuss the menu</h3><p>Ask about box options, dietary preferences and availability.</p></article>
            <article className="step-card"><span className="step-number">03</span><h3>Confirm your order</h3><p>Agree on the menu, pricing and delivery details together.</p></article>
          </div>
        </div>
      </section>
      <section className="bottom-cta">
        <div><span className="kicker" style={{ color: "var(--turmeric)" }}>Planning something special?</span><h2>Let's talk about your event.</h2><p>Share the details and we'll help you explore your options.</p></div>
        <a className="btn light" href={wa("Hi, I'd like to discuss a bulk food order")}>Message us ↗</a>
      </section>
    </main>
  );
}
