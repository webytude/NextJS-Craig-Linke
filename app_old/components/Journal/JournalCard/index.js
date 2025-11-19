import Image from 'next/image';
import styles from './journalCard.module.css';
import LinkWithArrow from '../../ui/Link';
import Paragraph from '../../ui/Paragraph';
import Heading from '../../ui/Heading';

export default function JournalCard() {
  return (
    <div className={styles.journalCard}>
      <Heading level={4}>Mixing natural fibres and finishesfor modern interiors.</Heading>
      <div className={styles.imageWrapper}>
        <Image
            src="/images/journal1.png"
            width={322}
            height={434}
            alt="Picture of the author"
        />
      </div>
      <div className={styles.description}>
        <Paragraph align='center'>
          From linen and wool to stone and timber, natural textures bring warmth, depth, and a timeless feel to modern spaces.
        </Paragraph>
      </div>
      <div className={styles.readMore}>
        <LinkWithArrow text="READ MORE" href="#" />
      </div>
    </div>
  )
}
