"use client";
import { useEffect, useState } from "react";

/** Animated WebP with a still-image alternative for people who prefer reduced motion. */
export default function AnimatedFood({
  animation, still, alt, className = "", width = 200, height = 200, loading = "lazy"
}) {
  const [reduceMotion, setReduceMotion] = useState(true);
  const [failed, setFailed] = useState(false);
  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduceMotion(query.matches);
    update();
    query.addEventListener?.("change", update);
    return () => query.removeEventListener?.("change", update);
  }, []);
  return (
    <img
      src={failed || reduceMotion ? still : animation}
      alt={alt}
      width={width}
      height={height}
      loading={loading}
      decoding="async"
      className={className}
      style={{maxWidth:"100%",height:"auto"}}
      onError={() => setFailed(true)}
    />
  );
}
