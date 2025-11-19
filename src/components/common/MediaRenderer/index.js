import MuxPlayer from "@mux/mux-player-react";
import Image from "next/image";
// import { Swiper, SwiperSlide } from "swiper/react";
// import "swiper/css";

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

  if (Array.isArray(ImageORCarousel) && ImageORCarousel.length > 1) {
    return (
      <div className="slider-wrapper">
        {ImageORCarousel.map((img, index) => (
          <div key={index}>
            <Image
              src={img.url}
              alt={img?.alternativeText || ""}
              width={width || 716}
              height={height || 889}
              className={classes || ''}
            />
          </div>
        ))}
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
      />
    );
  }

  return null;
}
