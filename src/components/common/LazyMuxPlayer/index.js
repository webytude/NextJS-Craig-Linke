'use client';

import MuxPlayer from "@mux/mux-player-react";
import { useEffect, useRef, useState } from "react";

export default function LazyMuxPlayer({ playbackId, autoPlay = true, ...props }) {
  const playerRef = useRef(null);
  const [shouldLoad, setShouldLoad] = useState(false);

  useEffect(() => {
    const player = playerRef.current;
    if (!player || !playbackId) return;

    if (!("IntersectionObserver" in window)) {
      const fallbackTimer = window.setTimeout(() => setShouldLoad(true), 0);
      return () => window.clearTimeout(fallbackTimer);
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldLoad(true);
          observer.disconnect();
        }
      },
      { rootMargin: "300px 0px" }
    );

    observer.observe(player);
    return () => observer.disconnect();
  }, [playbackId]);

  if (!playbackId) return null;

  return (
    <MuxPlayer
      {...props}
      ref={playerRef}
      playbackId={shouldLoad ? playbackId : undefined}
      poster={`https://image.mux.com/${playbackId}/thumbnail.webp?time=0`}
      maxResolution="720p"
      capRenditionToPlayerSize
      preload="none"
      autoPlay={shouldLoad && autoPlay}
    />
  );
}
