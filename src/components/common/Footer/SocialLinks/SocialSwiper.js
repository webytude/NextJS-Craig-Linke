'use client';

import React from 'react';
import { Swiper, SwiperSlide } from "swiper/react";
import Image from 'next/image';
import "swiper/css";

export default function SocialSwiper({ images }) {
  return (
    <Swiper className="mySwiper">
      {images.map((img, idx) => (
        <SwiperSlide key={idx}>
          <Image
            src={img.url}
            width={70}
            height={96}
            alt={img.alternativeText || ""}
            priority
            quality={90}
          />
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
