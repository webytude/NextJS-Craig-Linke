import Link from 'next/link';
import styles from './projectCard.module.css';
import Image from 'next/image';

export default function ProjectCard() {
  return (
    <div>
      <div className="featureProjectList">
        <ul>
            <li className={styles.projectCard}>
            <Link href={'#'}>
                <div className={styles.imageWrapper}>
                <Image
                    src="/images/hero.png"
                    width={334}
                    height={464}
                    alt="Picture of the author"
                />
                </div>
                <h3 className={styles.proTitle}>Beach House</h3>
            </Link>
            </li>
            <li className={styles.projectCard}>
            <Link href={'#'}>
                <div className={styles.imageWrapper}>
                <Image
                    src="/images/hero.png"
                    width={334}
                    height={464}
                    alt="Picture of the author"
                />
                </div>
                <h3 className={styles.proTitle}>Beach House</h3>
            </Link>
            </li>
            <li className={styles.projectCard}>
            <Link href={'#'}>
                <div className={styles.imageWrapper}>
                <Image
                    src="/images/hero.png"
                    width={334}
                    height={464}
                    alt="Picture of the author"
                />
                </div>
                <h3 className={styles.proTitle}>Beach House</h3>
            </Link>
            </li>
        </ul>
        </div>
    </div>
  )
}
