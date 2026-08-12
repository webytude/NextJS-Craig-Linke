"use client";

import dynamic from "next/dynamic";
import LazyMuxPlayer from "@/components/common/LazyMuxPlayer";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import styles from './mediaRenderer.module.css';

const MediaCarousel = dynamic(() => import("./MediaCarousel"), {
  ssr: false,
  loading: () => <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>Loading...</div>
});

export default function MediaRenderer({
  media,
  width,
  height,
  classes,
  videoWidth,
  videoHeight,
  altFallback = "",
  sizes = "100vw",
  priority = false,
}) {
  if (!media) return null;

  const { EnableMuxVideo, MuxVideo, ImageORCarousel } = media;

  if (EnableMuxVideo && MuxVideo?.playback_id) {
    return (
      <LazyMuxPlayer
        playbackId={MuxVideo.playback_id}
        poster={`https://image.mux.com/${MuxVideo.playback_id}/thumbnail.jpg?time=1`}
        streamType="on-demand"
        autoPlay
        muted
        loop
        playsInline
        controls={false}
        preload="none"
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
        alt={img?.alternativeText || altFallback || ""}
        width={width || 716}
        height={height || 889}
        className={classes || ''}
        sizes={sizes}
        loading={priority ? "eager" : "lazy"}
        fetchPriority={priority ? "high" : "low"}
        priority={priority}
        quality={75}
      />
    );
  }

  return null;
}
