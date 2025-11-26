import Image from 'next/image';
import styles from './asheticsCard.module.css';
import Heading from '@/components/ui/Heading';
import Paragraph from '@/components/ui/Paragraph';
import LinkWithArrow from '@/components/ui/Link';
import { BlocksRenderer } from '@strapi/blocks-react-renderer';
import MediaRenderer from '../MediaRenderer';

export default function AsheticsCard({ data }) {
  return (
    <div className={styles.asheticsCard}>
      <Heading level={4}>{data?.Title}</Heading>
      <div className={styles.imageWrapper}>
        <MediaRenderer media={data?.Media || data?.DesktopMedia} width={334} height={434} />
      </div>
      <div className={styles.contentWrapper}>
      <div className={styles.description}>
        <Paragraph>
          <BlocksRenderer content={data?.Description || []} />
        </Paragraph>
      </div>
      <div className={styles.readMore}>
        <LinkWithArrow text={data?.Button?.ButtonText || "READ MORE"} href={data?.Button?.ButtonUR || `${data?.Slug}`} />
      </div>
      </div>
    </div>
  )
}
