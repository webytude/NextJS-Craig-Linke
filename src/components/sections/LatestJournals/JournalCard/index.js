import Image from 'next/image';
import styles from './journalCard.module.css';
import Heading from '@/components/ui/Heading';
import Paragraph from '@/components/ui/Paragraph';
import LinkWithArrow from '@/components/ui/Link';
import { BlocksRenderer } from '@strapi/blocks-react-renderer';
import MediaRenderer from '@/components/common/MediaRenderer';
import Link from 'next/link';

export default function JournalCard({ data }) {
  if (!data) return null;

  const { Name, Slug, Media, Journals } = data;

  return (
    <div className={styles.journalCard}>
      <Heading className={styles.title} level={4}>{Name}</Heading>
      <div className={styles.imageWrapper}>
        <Link href={`/journals/${Slug}`}>
        <MediaRenderer media={Media} width={322} height={434} />
        </Link>
      </div>
      <div className={styles.description}>
        <Paragraph align='center'>
          <BlocksRenderer content={Journals || []} />
        </Paragraph>
      </div>
      <div className={styles.readMore}>
        <LinkWithArrow text="READ MORE" href={`/journals/${Slug}`} />
      </div>
    </div>
  )
}
