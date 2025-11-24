import Link from 'next/link'
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import Image from 'next/image';
import styles from './socialLinks.module.css'
import FadeUp from '@/components/ui/animations/FadeUp';

export default function SocialLinks({ socialLinks }) {
  return (
    <div className={styles.social}>
        <ul>
        {socialLinks.map((item, index) => <li key={index}>
          <FadeUp>
            <Link href={item.Links.ButtonURL}>
            <Swiper className="mySwiper">
                {item.Media.ImageORCarousel.map((item, index) => <SwiperSlide key={index}>
                    <Image
                    src={item.url}
                    width={70}
                    height={96}
                    alt={item.alternativeText || ""}
                    />
                </SwiperSlide>)}
            </Swiper>
            <div className={styles.font12}>{item.Links.ButtonText}</div>
            </Link>
            </FadeUp>
        </li>)}
        </ul>
    </div>
  )
}
