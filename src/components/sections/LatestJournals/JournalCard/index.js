import Image from 'next/image';
import styles from './journalCard.module.css';
import Heading from '@/components/ui/Heading';
import Paragraph from '@/components/ui/Paragraph';
import LinkWithArrow from '@/components/ui/Link';
import { BlocksRenderer } from '@strapi/blocks-react-renderer';
import MediaRenderer from '@/components/common/MediaRenderer';

export default function JournalCard({ data }) {
  if (!data) return null;

  const { Name, Slug, Media, Journals } = data;

  return (
    <div className={styles.journalCard}>
      <Heading level={4}>{Name}</Heading>
      <div className={styles.imageWrapper}>
        <MediaRenderer media={Media} />
      </div>
      <div className={styles.description}>
        <Paragraph align='center'>
          <BlocksRenderer content={Journals || []} />
        </Paragraph>
      </div>
      <div className={styles.readMore}>
        <LinkWithArrow text="READ MORE" href={Slug} />
      </div>
    </div>
  )
}
