'use client';

import React from 'react';
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from 'swiper/modules';
import Image from "next/image";
import "swiper/css";
import 'swiper/css/navigation';
import 'swiper/css/pagination';

export default function ExpressiveSlider({ ImageORCarousel, prevEl, nextEl, paginationEl }) {
  return (
    <Swiper 
      modules={[Pagination, Navigation]}
      navigation={{
        prevEl: prevEl,
        nextEl: nextEl,
      }}
      pagination={{
        el: paginationEl,
        type: 'fraction',
      }}
      style={{ width: '100%', height: '100%' }}
    >
      {ImageORCarousel.map((img, idx) => {
        const isFirst = idx === 0;
        return (
          <SwiperSlide key={idx}>
            <Image
              src={img.url}
              alt={img?.alternativeText || ""}
              width={716}
              height={424}
              className="image"
              priority={isFirst}
              loading={isFirst ? "eager" : "lazy"}
              fetchPriority={isFirst ? "high" : "low"}
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
}
