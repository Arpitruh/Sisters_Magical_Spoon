"use client";
import { useState } from "react";
import Link from "next/link";

const links = [
  { href: "/#menu", label: "Menu" },
  { href: "/#plans", label: "Plans" },
  { href: "/bulk-meal-boxes", label: "Bulk boxes" },
  { href: "/about", label: "About" },
  { href: "/gallery", label: "Gallery" },
  { href: "/blog", label: "Blog" }
];

export default function SiteNavigation({ orderUrl }) {
  const [open, setOpen] = useState(false);
  const closeMenu = () => setOpen(false);
  return (
    <>
      <button className="mobile-menu-button" type="button" aria-controls="primary-navigation" aria-expanded={open} onClick={() => setOpen(!open)}>
        <span className="menu-lines" aria-hidden="true"><i /><i /><i /></span>
        {open ? "Close" : "Menu"}
      </button>
      <nav id="primary-navigation" className={"nav-menu" + (open ? " is-open" : "")} aria-label="Main navigation">
        {links.map(link => (
          <Link href={link.href} key={link.href} onClick={closeMenu}>{link.label}</Link>
        ))}
        <a className="nav-order" href={orderUrl} target="_blank" rel="noopener noreferrer" onClick={closeMenu}>Order on WhatsApp ↗</a>
      </nav>
    </>
  );
}
