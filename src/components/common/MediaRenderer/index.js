'use client';

import MuxPlayer from "@mux/mux-player-react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import styles from './mediaRenderer.module.css';

export default function MediaRenderer({ media, width, height, classes }) {
  if (!media) return null;

  const { EnableMuxVideo, MuxVideo, ImageORCarousel } = media;

  if (EnableMuxVideo && MuxVideo?.playback_id) {
    return (
      <MuxPlayer
        playbackId={MuxVideo.playback_id}
        streamType="on-demand"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        style={{ aspectRatio: "16 / 9", width: "100%" }}
      />
    );
  }

  const responsiveImageStyle = {
    width: '100%',
    height: 'auto',
    display: 'block'
  };

  if (Array.isArray(ImageORCarousel) && ImageORCarousel.length > 1) {
    return (
      <div className={styles.sliderWrapper}>
        <Swiper style={{ width: '100%', height: '100%' }}>
        {ImageORCarousel.map((img, index) => (
          <SwiperSlide key={index}>
            <Image
              src={img.url}
              alt={img?.alternativeText || ""}
              width={width || 716}
              height={height || 889}
              className={classes || ''}
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
        alt={img?.alternativeText || ""}
        width={width || 716}
        height={height || 889}
        className={classes || ''}
        // style={responsiveImageStyle}
        // sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      />
    );
  }

  return null;
}
