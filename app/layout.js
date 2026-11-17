import "./globals.css";
import Link from "next/link";
import { Baloo_2, DM_Sans } from "next/font/google";
import Script from "next/script";
import Logo from "../components/Logo";
import SiteNavigation from "../components/SiteNavigation";
import TrackWA from "../components/TrackWA";
import { SITE, wa } from "../lib/site";
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
        <a className="skip-link" href="#main-content">Skip to content</a>
        <div className="announcement">Home-style tiffins • Meal boxes for every occasion</div>
        <header className="top">
          <div className="header-inner">
            <Link className="brand" href="/" aria-label="Sister’s Magical Spoon homepage">
              <span className="brand-mark"><Logo /></span>
              <span>{SITE.name}</span>
            </Link>
            <SiteNavigation orderUrl={wa("Hi, I’d like to enquire about your tiffin service")} />
          </div>
        </header>
        <div id="main-content" tabIndex={-1} />
        {children}
        <footer className="foot">
          <div className="footer-inner">
            <div className="footer-grid">
              <div className="footer-brand">
                <Link className="footer-title" href="/">{SITE.name}</Link>
                <p className="footer-about">{SITE.tagline}. Explore tiffin plans, weekly menus and packed meal boxes for special occasions.</p>
                {SITE.fssai && <p className="footer-about">FSSAI Licence: {SITE.fssai}</p>}
              </div>
              <div className="footer-col">
                <h3>Explore</h3>
                <Link href="/#menu">Weekly menu</Link>
                <Link href="/#plans">Tiffin plans</Link>
                <Link href="/bulk-meal-boxes">Bulk meal boxes</Link>
                <Link href="/gallery">Food gallery</Link>
                <Link href="/about">Our story</Link>
              </div>
              <div className="footer-col">
                <h3>Get in touch</h3>
                <a href={wa("Hi, I have a question about your meals")} target="_blank" rel="noopener noreferrer">Chat on WhatsApp ↗</a>
                {SITE.address !== "Your kitchen address" && <span>{SITE.address}</span>}
                {SITE.city !== "Your City" && <span>{SITE.city}</span>}
                <Link href="/blog">From our blog</Link>
              </div>
            </div>
            <div className="footer-bottom">
              <span>© {new Date().getFullYear()} {SITE.name}. Made with care.</span>
              <span>Home-style meals and thoughtful moments.</span>
            </div>
          </div>
        </footer>
        <a className="wa" href={wa("Hi, I want to order from Sister’s Magical Spoon")} target="_blank" rel="noopener noreferrer">
          <span aria-hidden="true">✳</span> WhatsApp us <span aria-hidden="true">↗</span>
        </a>
      </body>
    </html>
  );
}
