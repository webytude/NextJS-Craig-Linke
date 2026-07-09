import Link from 'next/link'
import Image from 'next/image';
import styles from './socialLinks.module.css'
import FadeUp from '@/components/ui/animations/FadeUp';
import dynamic from 'next/dynamic';

const SocialSwiper = dynamic(() => import('./SocialSwiper'), { ssr: false });

export default function SocialLinks({ socialLinks }) {
  return (
    <div className={`${styles.social} social-mobile`}>
        <ul>
        {socialLinks.map((item, index) => {
          const images = item.Media?.ImageORCarousel || [];
          const hasMultiple = images.length > 1;
          const firstImage = images[0];

          return (
            <li key={index}>
              <FadeUp>
                <Link href={item.Links.ButtonURL} target={item.Links.OpenNewTab ? "_blank" : ''} aria-label={item.Links.ButtonText}>
                  {hasMultiple ? (
                    <SocialSwiper images={images} />
                  ) : firstImage ? (
                    <Image
                      src={firstImage.url}
                      width={70}
                      height={96}
                      alt={firstImage.alternativeText || ""}
                    />
                  ) : null}
                  <div className={styles.font12}>{item.Links.ButtonText}</div>
                </Link>
              </FadeUp>
            </li>
          );
        })}
        </ul>
    </div>
  )
}
