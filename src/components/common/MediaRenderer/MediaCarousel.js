'use client';

import React from 'react';
import { Swiper, SwiperSlide } from "swiper/react";
import Image from "next/image";
import "swiper/css";
import 'swiper/css/navigation';
import 'swiper/css/pagination';

export default function MediaCarousel({ ImageORCarousel, width, height, classes }) {
  const responsiveImageStyle = {
    width: '100%',
    height: 'auto',
    display: 'block'
  };

  return (
    <Swiper style={{ width: '100%', height: '100%' }}>
      {ImageORCarousel.map((img, index) => {
        const isFirst = index === 0;
        return (
          <SwiperSlide key={index}>
            <Image
              src={img.url}
              alt={img?.alternativeText || ""}
              width={width || 716}
              height={height || 889}
              className={classes || ''}
              priority={isFirst}
              loading={isFirst ? "eager" : "lazy"}
              fetchPriority={isFirst ? "high" : "low"}
              style={responsiveImageStyle}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
}
