"use client";
import { useState } from "react";
import Image from "next/image";

function PhotoCard({ src, alt }) {
  const [failed, setFailed] = useState(false);
  return (
    <figure className="photo-card">
      <div className="photo-frame">
        {!failed ? (
          <Image src={src} alt={alt} width={800} height={600} sizes="(max-width: 640px) 100vw, (max-width: 850px) 50vw, 33vw" onError={() => setFailed(true)} />
        ) : (
          <div className="photo-placeholder">
            <span className="placeholder-icon" aria-hidden="true">✦</span>
            <strong>Photo coming soon</strong>
            <span>We are preparing our food gallery.</span>
          </div>
        )}
      </div>
      <figcaption>{alt}</figcaption>
    </figure>
  );
}

export default function PhotoGallery({ photos }) {
  return (
    <div className="photo-gallery">
      {photos.map(photo => (
        <PhotoCard key={photo.src} src={photo.src} alt={photo.alt} />
      ))}
    </div>
  );
}
