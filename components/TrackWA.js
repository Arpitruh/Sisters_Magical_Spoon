"use client";
import { useEffect } from "react";

// Sends a GA4 "whatsapp_click" event with the page and button text. Mark it as a key event in GA.
export default function TrackWA() {
  useEffect(() => {
    const h = (e) => {
      const a = e.target.closest?.("a[href*='wa.me']");
      if (!a || !window.gtag) return;
      window.gtag("event", "whatsapp_click", { page_path: location.pathname, link_text: (a.textContent || "").trim().slice(0, 60) });
    };
    document.addEventListener("click", h);
    return () => document.removeEventListener("click", h);
  }, []);
  return null;
}
