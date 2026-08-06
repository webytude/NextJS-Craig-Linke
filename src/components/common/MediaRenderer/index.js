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

export default function MediaRenderer({ media, width, height, classes, videoWidth, videoHeight, altFallback = "", sizes = "100vw" }) {
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
        <Swiper style={{ width: '100%', height: '100%' }}>
        {ImageORCarousel.map((img, index) => (
          <SwiperSlide key={index}>
            <Image
              src={img.url}
              alt={img?.alternativeText || altFallback || ""}
              width={width || 716}
              height={height || 889}
              className={classes || ''}
              priority
              quality={90}
              // style={responsiveImageStyle}
              // sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </SwiperSlide>
        ))}
        </Swiper>
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
        // sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        sizes={sizes}
        priority
        quality={90}
      />
    );
  }

  return null;
}
