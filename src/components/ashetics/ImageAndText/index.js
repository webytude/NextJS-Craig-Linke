import styles from './imageAndText.module.css';
import Paragraph from '@/components/ui/Paragraph';
import { BlocksRenderer } from '@strapi/blocks-react-renderer';
import Box from '@/components/ui/Box/Box';
import MediaRenderer from '@/components/common/MediaRenderer';
import Heading from '@/components/ui/Heading';
import astheticsStyles from '../style/asthetics..module.css';

export default function ImageAndText({ data }) {
  const { Title, Content, Media } = data;
  return (
    <section className={`${astheticsStyles.section} ${astheticsStyles.imageAndText}`}> 
      {/* //className={`${astheticsStyles.section} imageAndText`} */}
      <Box fullHeight direction="column" justify="space-between">
        <div>
          <div className={styles.imageWrapper}>
            <MediaRenderer media={Media} width={272} height={381} />
          </div>
          <div className='uppercase'>{Title}</div>
        </div>
        <div className={styles.content}>
          <Heading level={2}>{data.Heading}</Heading>
          <div className={styles.description}>
            <Paragraph>
              <BlocksRenderer content={Content || []} />
            </Paragraph>
          </div>
        </div>
      </Box>
    </section>
  )
}
