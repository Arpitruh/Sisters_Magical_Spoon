import Image from "next/image";
import { SITE } from "../../lib/site";
import { getContent } from "../../lib/content";

export const metadata = { title: "Food Gallery", description: `Photos of our home-style tiffin, packed meal boxes and kitchen in ${SITE.city}.`, alternates: { canonical: "/gallery" } };

export default async function Gallery() {
  const { GALLERY } = await getContent();
  return (
    <main>
      <section className="hero"><h1>Our food and kitchen</h1><p>Real meals, packed fresh every day.</p></section>
      <section className="sec">
        <div className="photos">
          {GALLERY.map((g) => (<figure key={g.src}><Image src={g.src} alt={g.alt} width={800} height={600} sizes="(max-width: 700px) 100vw, 320px" /><figcaption>{g.alt}</figcaption></figure>))}
        </div>
      </section>
    </main>
  );
}
