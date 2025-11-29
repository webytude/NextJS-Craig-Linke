import styles from './imageAndText.module.css';
import Paragraph from '@/components/ui/Paragraph';
import { BlocksRenderer } from '@strapi/blocks-react-renderer';
import Box from '@/components/ui/Box/Box';
import MediaRenderer from '@/components/common/MediaRenderer';
import Heading from '@/components/ui/Heading';
import astheticsStyles from '../style/asthetics..module.css';
import FadeUp from '@/components/ui/animations/FadeUp';

export default function ImageAndText({ data }) {
  const { Title, Content, Media } = data;
  return (
    <section className={`${astheticsStyles.section} ${astheticsStyles.imageAndText}`}> 
      {/* //className={`${astheticsStyles.section} imageAndText`} */}
      <Box fullHeight direction="column" justify="space-between" mobileGap={'20px'}>
        <div className={styles.txtWrapper}>
          <div className={styles.imageWrapper}>
            <FadeUp>
            <MediaRenderer media={Media} width={272} height={381} />
            </FadeUp>
          </div>
          <div className='uppercase'>
            <FadeUp>
            {Title}
            </FadeUp>
          </div>
        </div>
        <div className={styles.content}>
          <Heading level={2}><FadeUp>{data.Heading}</FadeUp></Heading>
          <div className={styles.description}>
            <FadeUp>
            <Paragraph>
              <BlocksRenderer content={Content || []} />
            </Paragraph>
            </FadeUp>
          </div>
        </div>
      </Box>
    </section>
  )
}
