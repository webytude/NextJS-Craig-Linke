import MediaRenderer from "@/components/common/MediaRenderer";
import TwoColumnLayout from "@/components/layouts/TwoColumnLayout";
import FadeUp from "@/components/ui/animations/FadeUp";
import SlideRight from "@/components/ui/animations/SlideRight";
import Box from "@/components/ui/Box/Box";
import Divider from "@/components/ui/Divider";
import Heading from "@/components/ui/Heading";
import Paragraph from "@/components/ui/Paragraph";
import { BlocksRenderer } from "@strapi/blocks-react-renderer";
import styles from './contentHero.module.css';

export default function ContentHero({ data, headingLevel = 1 }) {

  const { Title, ShowInReverseLayout, Media, Heading: headingText, ContentHeroModule } = data;

  const leftContent = (
    <>
        <Box fullHeight justify="center">
      <FadeUp classes="p20 text-center" style={{maxWidth:570, margin: 'auto'}}>
        <div className="text-light uppercase">{Title}</div>
        <Heading level={headingLevel} className={styles.heading}>
            <BlocksRenderer content={headingText || []} />
        </Heading>
        <Paragraph className="text-light" style={{ maxWidth: 420, margin: 'auto'}}>
            <BlocksRenderer content={ContentHeroModule || []} />
        </Paragraph>
      </FadeUp>
      </Box>
    </>
  );

  const rightContent = (
    <>
        <Box fullHeight justify="center">
        <SlideRight className={styles.center}>
            <MediaRenderer media={Media} width={514} height={642} classes={"image"} altFallback={Title} />
        </SlideRight>
        </Box>
    </>
  );

  return (
    <>
      <section className="contentHero fitToScreen">
        <TwoColumnLayout reverse={ShowInReverseLayout} fullHeight left={leftContent} right={rightContent} style={{ maxWidth: 1250, margin: 'auto'}} />
      </section>
      <Divider />
    </>
  );
}
