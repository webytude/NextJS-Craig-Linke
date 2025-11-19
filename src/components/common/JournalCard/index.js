import Image from 'next/image';
import styles from './journalCard.module.css';
import Heading from '@/components/ui/Heading';
import Paragraph from '@/components/ui/Paragraph';
import LinkWithArrow from '@/components/ui/Link';
import { BlocksRenderer } from '@strapi/blocks-react-renderer';
import MediaRenderer from '../MediaRenderer';

export default function JournalCard({ journal }) {
  return (
    <div className={styles.journalCard}>
      <div className={styles.imageWrapper}>
        <MediaRenderer media={journal?.Media} width={334} height={434} />
      </div>
      <div className={styles.contentWrapper}>
      <div className={styles.categoryName}>
        <div className={styles.name}>INSIGHTS</div>
        <div className={styles.date}>09 / 29 / 2025</div>
      </div>
      <Heading level={4}>{journal?.Name}</Heading>
      <div className={styles.description}>
        <Paragraph>
          <BlocksRenderer content={journal?.Description || []} />
        </Paragraph>
      </div>
      <div className={styles.readMore}>
        <LinkWithArrow text="READ MORE" href={`journal/${journal?.Slug}`} />
      </div>
      </div>
    </div>
  )
}
