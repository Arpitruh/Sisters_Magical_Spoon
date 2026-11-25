# Sister’s Magical Spoon

Website for a food business, with editable menus, locality pages, gallery photos and a small admin panel.

## Getting started
1. `npm install` then `npm run dev`
2. Edit `lib/site.js` (name, city, areas, phone, prices, menu). Add one object to `areas` per locality: pages and sitemap update automatically.
3. Set `SITE.url` to your real domain, deploy on Vercel, submit `/sitemap.xml` in Google Search Console.
4. Put real photos in `public/photos` (names listed in `GALLERY` in `lib/site.js`) and set `reviewUrl` and `mapQuery`. Add real reviews to `REVIEWS` only.

## Admin panel (`/admin`)
Edit the menu, plans, bulk box prices and gallery photos without code.
1. Deploy on Vercel. In the project, open Storage, create a **Blob** store and connect it (adds `BLOB_READ_WRITE_TOKEN`).
2. Add env vars `ADMIN_PASSWORD` (a long password) and `ADMIN_SECRET` (any long random string).
3. Open `/admin`, log in, edit, and press Save. The site updates immediately.
Photos: JPG, PNG or WebP, up to 4 MB each. Every photo needs a description (used as alt text for SEO).
Without these env vars the site uses the defaults in `lib/site.js`.

## Go-live checklist
1. `lib/site.js`: set `city`, `phone`, `phoneDisplay`, `address`, `areas`, `reviewUrl`, `mapQuery`, `fssai`, and real prices.
2. Vercel env vars: `NEXT_PUBLIC_SITE_URL` (your domain), `NEXT_PUBLIC_GA_ID` (GA4 id like G-XXXX), `NEXT_PUBLIC_GSC_VERIFICATION` (the content value of Search Console's HTML tag method).
3. Photos: upload in `/admin`; also add `kitchen.jpg` and `packing.jpg` to `public/photos` for the About page.
4. Edit the story and hygiene list in `app/about/page.js` so they are true for your kitchen.
5. Google Analytics: Admin > Events > mark `whatsapp_click` as a key event. Search Console: submit `/sitemap.xml`.
