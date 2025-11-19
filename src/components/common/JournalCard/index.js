import Image from 'next/image';
import styles from './journalCard.module.css';
import Heading from '@/components/ui/Heading';
import Paragraph from '@/components/ui/Paragraph';
import LinkWithArrow from '@/components/ui/Link';

export default function JournalCard() {
  return (
    <div className={styles.journalCard}>
      <div className={styles.imageWrapper}>
        <Image
            src="/images/journal1.png"
            width={334}
            height={434}
            alt="Picture of the author"
        />
      </div>
      <div className={styles.contentWrapper}>
      <div className={styles.categoryName}>
        <div className={styles.name}>INSIGHTS</div>
        <div className={styles.date}>09 / 29 / 2025</div>
      </div>
      <Heading level={4}>Mixing natural fibres and finishesfor modern interiors.</Heading>
      <div className={styles.description}>
        <Paragraph>
          From linen and wool to stone and timber, natural textures bring warmth, depth, and a timeless feel to modern spaces.
        </Paragraph>
      </div>
      <div className={styles.readMore}>
        <LinkWithArrow text="READ MORE" href="#" />
      </div>
      </div>
    </div>
  )
}
