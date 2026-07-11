"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import styles from './mediaRenderer.module.css';

const MuxPlayer = dynamic(() => import("@mux/mux-player-react"), { ssr: false });
const MediaCarousel = dynamic(() => import("./MediaCarousel"), {
  ssr: false,
  loading: () => <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>Loading...</div>
});

export default function MediaRenderer({ media, width, height, classes, videoWidth, videoHeight }) {
  if (!media) return null;

  const { EnableMuxVideo, MuxVideo, ImageORCarousel } = media;

  if (EnableMuxVideo && MuxVideo?.playback_id) {
    return (
      <MuxPlayer
        role="dialog"
        aria-modal="true"
        aria-label="Video player"
        playbackId={MuxVideo.playback_id}
        streamType="on-demand"
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        controls={false}
        style={{ width: videoWidth ? videoWidth : "100%", height: videoHeight ? videoHeight : "100%", '--controls': 'none', '--media-object-fit': 'cover', '--media-object-position': 'center', objectFit: 'cover' }}
      />
    );
  }

  if (Array.isArray(ImageORCarousel) && ImageORCarousel.length > 1) {
    return (
      <div className={styles.sliderWrapper}>
        <MediaCarousel
          ImageORCarousel={ImageORCarousel}
          width={width}
          height={height}
          classes={classes}
        />
      </div>
    );
  }

  if (Array.isArray(ImageORCarousel) && ImageORCarousel.length === 1) {
    const img = ImageORCarousel[0];
    return (
      <Image
        src={img.url}
        alt={img?.alternativeText || ""}
        width={width || 716}
        height={height || 889}
        className={classes || ''}
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      />
    );
  }

  return null;
}
