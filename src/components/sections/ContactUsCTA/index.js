import { BlocksRenderer } from '@strapi/blocks-react-renderer';
import styles from './contactusCTA.module.css';
import Link from 'next/link';
import MediaRenderer from '@/components/common/MediaRenderer';
import Heading from '@/components/ui/Heading';
import LinkWithArrow from '@/components/ui/Link';
import Divider from '@/components/ui/Divider';

export default function ContactUsCTA({ data }) {

    const { Title, Description, Media, Button } =
    data;

  return (
    <section className={styles.wrapper}>
        <div className={styles.container}>
            <Divider className={styles.divider} />
            <div className={styles.imageBox}>
                <MediaRenderer media={Media} classes={"image"} />
            </div>
            <div className={styles.content}>
                <Heading level={3}>
                    {Title}
                </Heading>
                <p>{Description}</p>
                <LinkWithArrow
                    text={Button?.ButtonText || 'Read More'}
                    href={Button?.ButtonURL || '#'}
                />
            </div>
        </div>
    </section>
  )
}
