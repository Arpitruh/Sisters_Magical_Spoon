import "./globals.css";
import Link from "next/link";
import { Baloo_2, DM_Sans } from "next/font/google";
import Script from "next/script";
import Logo from "../components/Logo";
import TrackWA from "../components/TrackWA";
import { SITE, wa, OCCASIONS } from "../lib/site";
import { getContent } from "../lib/content";

export const revalidate = 3600; // lets date-based notices switch on and off within an hour

const head = Baloo_2({ subsets: ["latin"], weight: ["600", "800"], variable: "--f-head" });
const body = DM_Sans({ subsets: ["latin"], variable: "--f-body" });

export const metadata = {
  metadataBase: new URL(SITE.url),
  title: { default: `${SITE.name} | Home-Style Tiffin Service in ${SITE.city}`, template: `%s | ${SITE.name}` },
  description: `Fresh home-style tiffin and bulk packed meal boxes in ${SITE.city}. Order on WhatsApp.`,
  openGraph: { siteName: SITE.name, type: "website", locale: "en_IN" },
  verification: { google: process.env.NEXT_PUBLIC_GSC_VERIFICATION },
  alternates: { canonical: "/" },
};

const schema = {
  "@context": "https://schema.org",
  "@type": "FoodEstablishment",
  name: SITE.name,
  url: SITE.url,
  telephone: `+${SITE.phone}`,
  servesCuisine: "Indian",
  address: { "@type": "PostalAddress", streetAddress: SITE.address, addressLocality: SITE.city, addressCountry: "IN" },
  areaServed: SITE.areas.map((a) => a.name),
  hasMenu: `${SITE.url}/#menu`,
};

export default async function RootLayout({ children }) {
  const { NOTICE } = await getContent();
  const today = new Date().toLocaleDateString("en-CA", { timeZone: "Asia/Kolkata" });
  const showNotice = NOTICE.on && NOTICE.text && (!NOTICE.from || today >= NOTICE.from) && (!NOTICE.to || today <= NOTICE.to);
  return (
    <html lang="en-IN" className={`${head.variable} ${body.variable}`}>
      <body>
        {process.env.NEXT_PUBLIC_GA_ID && (
          <>
            <Script src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`} strategy="afterInteractive" />
            <Script id="ga" strategy="afterInteractive">{`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}gtag('js',new Date());gtag('config','${process.env.NEXT_PUBLIC_GA_ID}');`}</Script>
          </>
        )}
        <TrackWA />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
        {showNotice && <div className="notice" role="status">{NOTICE.text}</div>}
        <header className="top">
          <Link className="brand" href="/"><Logo />{SITE.name}</Link>
          <nav>
            <Link href="/#menu">Menu</Link>
            <Link href="/#plans">Plans</Link>
            <Link href="/bulk-meal-boxes">Bulk boxes</Link>
            <Link href="/about">About</Link>
            <Link href="/gallery">Gallery</Link>
            <Link href="/blog">Blog</Link>
            <Link href="/#faq">FAQ</Link>
          </nav>
        </header>
        {children}
        <footer className="foot">
          <p><strong>{SITE.name}</strong> · {SITE.address}, {SITE.city} · {SITE.phoneDisplay}</p>
          {SITE.fssai && <p>FSSAI Lic. No. {SITE.fssai}</p>}
          <p>{SITE.areas.map((a, i) => (<span key={a.slug}>{i > 0 && ", "}<Link href={`/areas/${a.slug}`}>Tiffin in {a.name}</Link></span>))}</p>
          <p>{OCCASIONS.map((o, i) => (<span key={o.slug}>{i > 0 && ", "}<Link href={`/occasions/${o.slug}`}>{o.title}</Link></span>))}</p>
        </footer>
        <a className="wa" href={wa("Hi, I want to order from Sister’s Magical Spoon")}>Order on WhatsApp</a>
      </body>
    </html>
  );
}
