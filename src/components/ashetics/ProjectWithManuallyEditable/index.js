import AsheticsCard from '@/components/common/AsheticsCard'
import astheticsStyles from '../style/asthetics..module.css';
import styles from './projectWithManuallyEditable.module.css';
import Heading from '@/components/ui/Heading';
import FadeUp from '@/components/ui/animations/FadeUp';
import Link from 'next/link';
import MediaRenderer from '@/components/common/MediaRenderer';
import Paragraph from '@/components/ui/Paragraph';
import { BlocksRenderer } from '@strapi/blocks-react-renderer';
import LinkWithArrow from '@/components/ui/Link';

export default function ProjectWithManuallyEditable({ data }) {
  return (
    <section className={`${astheticsStyles.section} ${astheticsStyles.projectWithManuallyEditable}`}>
    {/* <AsheticsCard data={data} /> */}
      <div className={styles.asheticsCard}>
        <FadeUp>
          <Heading className={'hide-mobile'} level={4}>{data?.Title}</Heading>
          <div className={styles.imageWrapper}>
              <Link href={data?.Button?.ButtonUR || `${data?.Slug}` || "#"}>
                <MediaRenderer media={data?.Media || data?.DesktopMedia} width={349} height={495} />
              </Link>
          </div>
          <div className={styles.contentWrapper}>
          <Heading className='hide-desktop' level={4}>{data?.Title}</Heading>
          <div className={styles.description}>
            <Paragraph>
              <BlocksRenderer content={data?.Description || []} />
            </Paragraph>
          </div>
          <div className={styles.readMore}>
            <LinkWithArrow text={data?.Button?.ButtonText} href={data?.Button?.ButtonUR} />
          </div>
          </div>
        </FadeUp>
      </div>
    </section>
  )
}
