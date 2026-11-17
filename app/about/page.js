import PhotoGallery from "../../components/PhotoGallery";
import AnimatedFood from "../../components/AnimatedFood";
import { SITE } from "../../lib/site";

export const metadata = {
  title: "About Our Kitchen",
  description: `Meet the kitchen behind ${SITE.name} in ${SITE.city}: our story, our hygiene practices and how we cook your tiffin.`,
  alternates: { canonical: "/about" },
};

// EDIT: replace this text with your real story and practices. Only list what is true.
const STORY = `${SITE.name} started as a simple idea: food that tastes like it was made at home, delivered to people who miss it. Tell your own story here: who cooks, why you started, and what the name means to you.`;
const HYGIENE = [
  "Fresh ingredients bought and cooked daily",
  "Kitchen cleaned and sanitised every day",
  "Staff wear gloves, aprons and head covers",
  "Food packed in sealed, food-grade containers",
  "Separate handling for veg and non-veg",
];
const PHOTOS = [
  { src: "/photos/kitchen.jpg", alt: "Our cloud kitchen where every meal is cooked fresh" },
  { src: "/photos/packing.jpg", alt: "Meals being packed in sealed containers" },
];


export default function About() {
  return (
    <main>
      <section className="hero has-food-motion">
        <span className="eyebrow">The people behind the plate</span>
        <h1>Made with a little extra heart.</h1>
        <p>{SITE.tagline}.</p>
        <div className="bulk-page-motion about-mascot-motion">
          <AnimatedFood animation="/animations/spoon-mascot.webp" still="/images/brand/logo-mark.webp" alt="Animated illustrated Magical Spoon mascot" width={135} height={135} loading="eager" />
          <span>Meet our illustrated mascot</span>
        </div>
      </section>
      <section className="sec">
        <div className="story-card">
          <span className="kicker">Where it all begins</span>
          <h2>Our story</h2>
          <p>{STORY}</p>
        </div>
      </section>
      <section className="sec tint">
        <div className="section-heading">
          <span className="kicker">Behind the scenes</span>
          <h2>The details that matter.</h2>
          <p>The following kitchen practices are draft content and should be confirmed before a customer launch.</p>
        </div>
        <ul className="hygiene-list">{HYGIENE.map((item) => <li key={item}>{item}</li>)}</ul>
        {SITE.fssai && <p><strong>FSSAI Licence: {SITE.fssai}</strong></p>}
      </section>
      <section className="sec">
        <div className="section-heading"><span className="kicker">Inside the kitchen</span><h2>Take a look around.</h2><p>More real kitchen photographs will be added soon.</p></div>
        <PhotoGallery photos={PHOTOS} />
      </section>
    </main>
  );
}
