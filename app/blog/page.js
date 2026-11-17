import Link from "next/link";
import { POSTS } from "../../lib/posts";

export const metadata = { title: "Blog", description: "Tiffin prices, meal planning and lunch box tips.", alternates: { canonical: "/blog" } };

export default function Blog() {
  return (
    <main>
      <section className="hero"><h1>Tiffin and meal planning tips</h1></section>
      <section className="sec">
        {POSTS.map((p) => (<article key={p.slug} className="card post"><h3><Link href={`/blog/${p.slug}`}>{p.title}</Link></h3><p>{p.desc}</p></article>))}
      </section>
    </main>
  );
}
