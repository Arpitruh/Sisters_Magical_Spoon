import PhotoGallery from "../../components/PhotoGallery";
import MealIcon from "../../components/MealIcon";
import { SITE } from "../../lib/site";
import { getContent } from "../../lib/content";

export const metadata = {
  title: "Food Gallery",
  description: "Explore home-style tiffins, meal boxes and kitchen moments from " + SITE.name + ".",
  alternates: { canonical: "/gallery" },
};

export default async function Gallery() {
  const { GALLERY } = await getContent();
  return (
    <main>
      <section className="hero">
        <span className="eyebrow">A little visual feast</span>
        <h1>Good food, beautiful moments.</h1>
        <p>Browse our food and kitchen gallery. Photos are added as they become available.</p>
      </section>
      <section className="sec">
        <div className="section-heading"><span className="kicker">Our illustrated menu</span><h2>Little icons of comfort.</h2><p>Illustrations of familiar meals, created for the Sisters Magical Spoon website.</p></div>
        <div className="illustration-icons-gallery">
          {[
            ["thali", "Thali"], ["tiffin", "Tiffin"], ["dal-rice", "Dal & rice"],
            ["roti", "Roti"], ["khichdi", "Khichdi"], ["paneer", "Paneer"],
            ["bulk-meal", "Meal boxes"]
          ].map(([icon, label]) => (
            <div className="illustration-icon-card" key={icon}><MealIcon name={icon} size={80}/><span>{label}</span></div>
          ))}
        </div>
        <div className="section-heading">
          <span className="kicker">From our kitchen</span>
          <h2>Take a closer look.</h2>
          <p>Meals, boxes and the details that make them special.</p>
        </div>
        <PhotoGallery photos={GALLERY} />
      </section>
    </main>
  );
}
