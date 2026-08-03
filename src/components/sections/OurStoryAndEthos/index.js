import MediaRenderer from "@/components/common/MediaRenderer";
import TwoColumnLayout from "@/components/layouts/TwoColumnLayout";
import FadeUp from "@/components/ui/animations/FadeUp";
import SlideRight from "@/components/ui/animations/SlideRight";
import Box from "@/components/ui/Box/Box";
import Heading from "@/components/ui/Heading";
import Paragraph from "@/components/ui/Paragraph";
import { BlocksRenderer } from "@strapi/blocks-react-renderer";
import styles from './OurStoryAndEthos.module.css';
import Divider from "@/components/ui/Divider";

export default function OurStoryAndEthos({ data }) {
    const { EthosHeading, Media, EthosContent } = data;

    const leftContent = (
    <>
        <Box fullHeight justify="center">
        <SlideRight className={styles.center}>
            <MediaRenderer media={Media} width={514} height={642} classes={"image"} altFallback={""} />
        </SlideRight>
        </Box>
    </>
  );

  const rightContent = (
    <>
        <Box fullHeight justify="center">
        <Paragraph className="text-light" style={{ maxWidth: 572}}>
            <BlocksRenderer content={EthosContent || []} />
        </Paragraph>      
      </Box>
    </>
  );

    return (
        <>
              <section className="contentHero fitToScreen">
                <Heading level={2} className={styles.heading}>
                  {EthosHeading}
                </Heading>
                <Divider />
                <TwoColumnLayout fullHeight left={leftContent} right={rightContent} style={{ maxWidth: 1250, margin: 'auto'}} />
              </section>
            </>
    )
}