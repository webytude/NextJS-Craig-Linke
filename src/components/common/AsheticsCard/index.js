import Image from 'next/image';
import styles from './asheticsCard.module.css';
import Heading from '@/components/ui/Heading';
import Paragraph from '@/components/ui/Paragraph';
import LinkWithArrow from '@/components/ui/Link';
import { BlocksRenderer } from '@strapi/blocks-react-renderer';
import MediaRenderer from '../MediaRenderer';
import HoverZoom from '@/components/ui/animations/HoverZoom';
import Link from 'next/link';
import FadeUp from '@/components/ui/animations/FadeUp';

export default function AsheticsCard({ data }) {
  const blockType = data.__typename;
  return (
    <div className={styles.asheticsCard}>
      <FadeUp>
      <Heading className={blockType === 'AstheticsDetail' ? 'hide-mobile' : ''} level={4}>{data?.Title || data?.Name}</Heading>
      <div className={blockType === 'AstheticsDetail' ? `${styles.imageWrapper} ${styles.relatedImageWrapper}` : styles.imageWrapper}>
        <HoverZoom>
          <Link href={data?.Button?.ButtonUR || `${data?.Slug}` || "#"}>
            <MediaRenderer media={data?.Media || data?.DesktopMedia} width={334} height={434} />
          </Link>
        </HoverZoom>
      </div>
      <div className={styles.contentWrapper}>
      {blockType === 'AstheticsDetail' && <Heading className='hide-desktop' level={4}>{data?.Title || data?.Name}</Heading>}
      <div className={styles.description}>
        <Paragraph>
          <BlocksRenderer content={data?.Description || []} />
        </Paragraph>
      </div>
      <div className={styles.readMore}>
        <LinkWithArrow text={data?.Button?.ButtonText || "READ MORE"} href={data?.Button?.ButtonUR || `${data?.Slug}`} />
      </div>
      </div>
      </FadeUp>
    </div>
  )
}
