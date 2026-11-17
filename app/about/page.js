import Image from "next/image";
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
      <section className="hero"><h1>About our kitchen</h1><p>{SITE.tagline}.</p></section>
      <section className="sec"><h2>Our story</h2><p>{STORY}</p></section>
      <section className="sec tint">
        <h2>How we keep it clean</h2>
        <ul>{HYGIENE.map((h) => (<li key={h}>{h}</li>))}</ul>
        {SITE.fssai && <p><strong>FSSAI Lic. No. {SITE.fssai}</strong></p>}
      </section>
      <section className="sec">
        <h2>Inside the kitchen</h2>
        <div className="photos">{PHOTOS.map((p) => (<figure key={p.src}><Image src={p.src} alt={p.alt} width={800} height={600} sizes="(max-width: 700px) 100vw, 400px" /><figcaption>{p.alt}</figcaption></figure>))}</div>
      </section>
    </main>
  );
}
