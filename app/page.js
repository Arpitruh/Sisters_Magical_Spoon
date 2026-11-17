import Link from "next/link";
import AreaCheck from "../components/AreaCheck";
import MealIllustration from "../components/MealIllustration";
import { SITE, wa, FAQS, REVIEWS } from "../lib/site";
import { getContent } from "../lib/content";

export const metadata = {
  title: { absolute: SITE.name + " | Home-Style Tiffin & Meal Boxes" },
  description: "Explore home-style tiffin plans, weekly menus and meal boxes for offices and special occasions.",
};

export default async function Home() {
  const { MENU, PLANS, BOXES } = await getContent();
  const validAreas = SITE.areas.filter(a => !["area-one", "area-two", "area-three"].includes(a.slug));
  const validMap = SITE.city !== "Your City" && !SITE.mapQuery.includes("Your City");
  const faq = { "@context": "https://schema.org", "@type": "FAQPage",
    mainEntity: FAQS.map(([q, a]) => ({ "@type": "Question", name: q, acceptedAnswer: { "@type": "Answer", text: a } })) };

  return (
    <main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faq) }} />
      <section className="home-hero hero" aria-labelledby="home-title">
        <div className="hero-inner">
          <div className="hero-copy">
            <span className="eyebrow">Sister’s Magical Spoon • Home-style food</span>
            <h1 id="home-title">A little <em>comfort</em> in every bite.</h1>
            <p>From everyday tiffins to neatly packed meal boxes for your special occasions. Explore the menu, find your plan and get in touch directly on WhatsApp.</p>
            <div className="row">
              <a className="btn" href={wa("Hi, I'd like to ask about a tiffin plan")}>Enquire about a plan <span aria-hidden="true">↗</span></a>
              <a className="btn ghost" href="#menu">See this week’s menu <span aria-hidden="true">↓</span></a>
            </div>
            <div className="hero-note"><span>Weekly menus</span><span>Flexible plans</span><span>Group meal boxes</span></div>
          </div>
          <div className="hero-visual" aria-hidden="true">
            <MealIllustration />
            <div className="floating-note top-note"><strong>Ghar ka khana</strong>The familiar kind of comfort</div>
            <div className="floating-note bottom-note"><strong>Made for your day</strong>Lunch, dinner &amp; occasions</div>
          </div>
        </div>
      </section>

      <section className="section-shell" aria-label="Explore our service">
        <div className="benefits-grid">
          <div className="benefit"><div className="benefit-icon" aria-hidden="true">🥣</div><div><h3>Everyday comfort</h3><p>A familiar home-style menu for busy days.</p></div></div>
          <div className="benefit"><div className="benefit-icon" aria-hidden="true">📅</div><div><h3>Plans for your routine</h3><p>Choose a trial meal, or explore weekly and monthly options.</p></div></div>
          <div className="benefit"><div className="benefit-icon" aria-hidden="true">🎉</div><div><h3>Group meals, sorted</h3><p>Meal box options for celebrations and team lunches.</p></div></div>
        </div>
      </section>

      <section id="menu" className="section-band">
        <div className="section-shell">
          <div className="section-topline">
            <div className="section-heading"><span className="kicker">Something delicious every day</span><h2>A week of familiar favourites.</h2><p>Browse the sample weekly tiffin menu before you choose your plan.</p></div>
            <a className="text-link" href={wa("Hi, can you share the current tiffin menu?")}>Ask about today’s menu ↗</a>
          </div>
          <div className="weekly-menu">{MENU.map(([day, meal]) => (
            <div className="weekly-menu-item" key={day}><span className="day-pill">{day}</span><p>{meal}</p></div>
          ))}</div>
          <p className="menu-footer">Menu items are subject to availability. Please confirm before ordering.</p>
        </div>
      </section>

      <section id="plans" className="section-shell">
        <div className="section-heading"><span className="kicker">Find your fit</span><h2>A plan for every appetite.</h2><p>Try a single meal first, or find a plan that fits your everyday routine.</p></div>
        <div className="pricing-grid">{PLANS.map((plan, i) => (
          <article className="card pricing-card" key={plan.name}>
            <span className="card-icon" aria-hidden="true">{i === 0 ? "🍲" : i === 1 ? "📆" : "🍛"}</span>
            <h3>{plan.name}</h3><p className="price">{plan.price}</p><p>{plan.note}</p>
            <a className="btn sm" href={wa("Hi, I'd like to ask about the " + plan.name + " plan")}>Enquire about plan ↗</a>
          </article>
        ))}</div>
        <p className="muted">Prices and availability are confirmed over WhatsApp.</p>
      </section>

      <section className="section-band">
        <div className="section-shell bulk-feature">
          <div>
            <div className="section-heading"><span className="kicker">Planning a gathering?</span><h2>Good food. Great company.</h2><p>Explore packed meal boxes for gatherings, celebrations and team lunches.</p></div>
            <ul className="bulk-list"><li>Options for different occasions</li><li>Simple quotes on WhatsApp</li><li>Group-friendly meal box options</li></ul>
            <Link className="btn" href="/bulk-meal-boxes">Explore bulk meal boxes ↗</Link>
          </div>
          <div className="box-stack">{BOXES.map(box => (
            <article className="card" key={box.name}><h3>{box.name}</h3><p className="price">{box.price}<small> / box</small></p><p>{box.items}</p></article>
          ))}</div>
        </div>
      </section>

      <section className="section-shell" aria-labelledby="delivery-title">
        <div className="delivery-layout">
          <div>
            <div className="section-heading"><span className="kicker">At your doorstep</span><h2 id="delivery-title">Wondering if we deliver to you?</h2><p>Send your pincode to confirm delivery availability before placing an order.</p></div>
            {validAreas.length > 0 && <ul className="chips">{validAreas.map(area => (<li key={area.slug}><Link href={"/areas/" + area.slug}>{area.name}</Link></li>))}</ul>}
            {validMap && <iframe className="map" title={"Map of " + SITE.name} loading="lazy" src={"https://www.google.com/maps?q=" + encodeURIComponent(SITE.mapQuery) + "&output=embed"} />}
          </div>
          <div className="delivery-card"><h3>Check your delivery area</h3><p className="muted">Enter a six-digit pincode. We'll open WhatsApp so you can check service for your address.</p><AreaCheck /></div>
        </div>
      </section>

      <section className="section-band">
        <div className="section-shell">
          <div className="section-heading"><span className="kicker">Ordering made simple</span><h2>From craving to conversation.</h2><p>Here is how to get started.</p></div>
          <div className="steps-grid">
            <article className="step-card"><span className="step-number">01</span><h3>Explore the menu</h3><p>Review our weekly dishes, meal plans and meal box options.</p></article>
            <article className="step-card"><span className="step-number">02</span><h3>Tell us what you need</h3><p>Share your preferred plan, date and delivery area on WhatsApp.</p></article>
            <article className="step-card"><span className="step-number">03</span><h3>Confirm the details</h3><p>We'll discuss availability, pricing and the next steps with you.</p></article>
          </div>
        </div>
      </section>

      {REVIEWS.length > 0 && <section className="section-shell">
        <div className="section-heading"><span className="kicker">Kind words</span><h2>What customers say.</h2></div>
        <div className="grid">{REVIEWS.map(review => <blockquote className="card" key={review.name}><p>{review.text}</p><footer>{review.name}</footer></blockquote>)}</div>
        {SITE.reviewUrl && !SITE.reviewUrl.includes("YOUR_REVIEW_LINK") && <a className="text-link" href={SITE.reviewUrl}>Read more reviews ↗</a>}
      </section>}

      <section id="faq" className="section-shell faq-layout">
        <div className="section-heading"><span className="kicker">Good to know</span><h2>Questions? We’ve got answers.</h2><p>What to know before getting in touch.</p></div>
        <div>{FAQS.map(([question, answer]) => <details className="faq-item" key={question}><summary>{question}</summary><p>{answer}</p></details>)}</div>
      </section>

      <section className="bottom-cta" aria-labelledby="bottom-cta-title">
        <div><span className="kicker" style={{ color: "var(--turmeric)" }}>Let's talk food</span><h2 id="bottom-cta-title">Your next meal starts here.</h2><p>Questions about the menu, plans or a group order? Just message us.</p></div>
        <a className="btn light" href={wa("Hi, I'd like to know more about Sister’s Magical Spoon")}>Chat on WhatsApp ↗</a>
      </section>
    </main>
  );
}
