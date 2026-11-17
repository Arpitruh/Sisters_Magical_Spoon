import Link from "next/link";
import { wa } from "../lib/site";

export const metadata = { title: "Page not found" };
export default function NotFound() {
  return (
    <main className="hero">
      <h1>We couldn’t find that page</h1>
      <p>The link may be old or mistyped. Try the home page, or message us and we’ll help.</p>
      <div className="row">
        <Link className="btn" href="/">Go to home</Link>
        <a className="btn ghost" href={wa("Hi, I need some help")}>Message us on WhatsApp</a>
      </div>
    </main>
  );
}
