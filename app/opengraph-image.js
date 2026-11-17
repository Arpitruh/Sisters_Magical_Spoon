import { ImageResponse } from "next/og";
import { SITE } from "../lib/site";

export const alt = SITE.name;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "center", padding: 80, background: "#f2b705", color: "#1f4d3a" }}>
        <div style={{ fontSize: 96, fontWeight: 800, lineHeight: 1.05 }}>{SITE.name}</div>
        <div style={{ fontSize: 44, marginTop: 24 }}>{SITE.tagline}</div>
        <div style={{ display: "flex", fontSize: 34, marginTop: 48, background: "#1f4d3a", color: "#fff", padding: "12px 28px", borderRadius: 999, alignSelf: "flex-start" }}>Tiffin and bulk meal boxes in {SITE.city}</div>
      </div>
    ),
    size
  );
}
