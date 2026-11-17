// EDIT THIS FILE: all business details, prices and areas live here.
export const SITE = {
  name: "Sister’s Magical Spoon",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://sistersmagicalspoon.com", // set NEXT_PUBLIC_SITE_URL on Vercel
  city: "Your City",
  phone: "919999999999", // WhatsApp number with country code, no +
  phoneDisplay: "+91 99999 99999",
  address: "Your kitchen address",
  reviewUrl: "https://g.page/r/YOUR_REVIEW_LINK/review", // Business Profile > Get more reviews
  mapQuery: "Sister’s Magical Spoon, Your City", // or your Google Maps place name
  fssai: "", // your 14-digit FSSAI licence number, shown in footer and About page
  tagline: "Ghar ka khana, packed with love",
  areas: [
    { slug: "area-one", name: "Area One" },
    { slug: "area-two", name: "Area Two" },
    { slug: "area-three", name: "Area Three" },
  ],
};
export const wa = (t) => `https://wa.me/${SITE.phone}?text=${encodeURIComponent(t)}`;
export const MENU = [
  ["Mon", "Dal tadka, aloo gobhi, roti, jeera rice, salad"],
  ["Tue", "Rajma, bhindi fry, roti, rice, raita"],
  ["Wed", "Kadhi, mix veg, roti, rice, papad"],
  ["Thu", "Chole, aloo jeera, roti, pulao, salad"],
  ["Fri", "Dal makhani, paneer sabzi, roti, rice, sweet"],
  ["Sat", "Chana dal, lauki kofta, roti, rice, raita"],
  ["Sun", "Special thali: paneer, dal, roti, rice, sweet"],
];
export const PLANS = [
  { name: "Trial meal", price: "₹99", note: "One lunch or dinner, to try us" },
  { name: "Weekly", price: "₹699", note: "6 days, lunch or dinner" },
  { name: "Monthly", price: "₹2,499", note: "26 days, lunch or dinner" },
]; // placeholder prices
export const BOXES = [
  { name: "Basic box", price: "₹120", items: "Dal, sabzi, 4 roti, rice" },
  { name: "Standard box", price: "₹160", items: "Dal, paneer or special sabzi, 4 roti, rice, sweet" },
  { name: "Premium box", price: "₹220", items: "Starter, 2 sabzi, dal, roti, pulao, raita, sweet" },
]; // placeholder prices, per box
export const FAQS = [
  ["Which areas do you deliver to?", `We deliver across ${SITE.areas.map((a) => a.name).join(", ")} and nearby localities. Message us on WhatsApp to check your address.`],
  ["How do I order and pay?", "Message us on WhatsApp. We confirm your plan and menu, and you pay by UPI."],
  ["Can I try before subscribing?", "Yes. Order a single trial meal first."],
  ["Do you offer bulk orders for events?", "Yes. We deliver packed meal boxes for offices, parties and functions. Cutlery is included and no serving staff is needed."],
  ["Do you have Jain or non-veg options?", "Yes. Tell us your preference on WhatsApp."],
];

export const GALLERY = [ // put matching files in /public/photos
  { src: "/photos/thali.jpg", alt: "Veg tiffin thali with dal, sabzi, roti and rice" },
  { src: "/photos/boxes.jpg", alt: "Sealed bulk meal boxes ready for delivery" },
  { src: "/photos/kitchen.jpg", alt: "Our cloud kitchen preparing fresh meals" },
  { src: "/photos/paneer.jpg", alt: "Paneer sabzi from the weekly menu" },
  { src: "/photos/delivery.jpg", alt: "Tiffin packed for same-day delivery" },
  { src: "/photos/party.jpg", alt: "Party lunch boxes for an event" },
];
export const REVIEWS = []; // add real reviews only: { name: "Customer", text: "..." }
export const OCCASIONS = [
  { slug: "office-lunch-boxes", title: "Office lunch boxes", h1: "Office lunch box delivery", text: "Packed lunch boxes for teams, meetings and training days. Order for 20 to 100+ people with a fixed menu and on-time delivery." },
  { slug: "birthday-party-meal-boxes", title: "Birthday party meal boxes", h1: "Birthday party meal boxes", text: "Individually packed meals for birthday parties at home or office. No cooking, no serving, no cleanup." },
  { slug: "pooja-housewarming-meal-boxes", title: "Pooja and housewarming meal boxes", h1: "Pooja and housewarming meal boxes", text: "Simple, pure-veg packed meals for pooja, satyanarayan katha and housewarming guests. Jain options available." },
  { slug: "seminar-lunch-boxes", title: "Seminar and event lunch boxes", h1: "Seminar and event lunch boxes", text: "Lunch boxes for seminars, workshops and college events. Delivered sealed and on schedule." },
];
