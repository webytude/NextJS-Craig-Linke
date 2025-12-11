"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import MuxPlayer from "@mux/mux-player-react";

export default function HeroMedia({ active, incoming }) {
  const [current, setCurrent] = useState(active);
  const overlayRef = useRef(null);

  useEffect(() => {
    if (!incoming) return;

    const overlay = overlayRef.current;
    if (!overlay) return;

    overlay.classList.add("show");

    const t = setTimeout(() => {
      setCurrent(incoming);
      overlay.classList.remove("show");
    }, 600);

    return () => clearTimeout(t);
  }, [incoming]);

  return (
    <div className="heroWrapper">

      {/* OLD (always visible) */}
      <div className="heroBase">
        <HeroContent data={current} />
      </div>

      {/* NEW (slides in) */}
      <div ref={overlayRef} className="heroOverlay">
        {incoming && <HeroContent data={incoming} />}
      </div>
    </div>
  );
}

function HeroContent({ data }) {
  if (!data) return null;

  const media = data?.DesktopMedia;

  return (
    <>
      {media?.EnableMuxVideo &&
        media?.MuxVideo?.playback_id && (
          <MuxPlayer
            playbackId={media.MuxVideo.playback_id}
            autoPlay
            muted
            loop
            preload="auto"
            style={{ width: "100%", height: "100%" }}
          />
        )}

      {!media?.EnableMuxVideo &&
        Array.isArray(media?.ImageORCarousel) &&
        media.ImageORCarousel.length === 1 && (
          <Image
            src={media.ImageORCarousel[0].url}
            alt={media.ImageORCarousel[0].alternativeText || ""}
            fill
            style={{ objectFit: "cover" }}
          />
        )}
    </>
  );
}
