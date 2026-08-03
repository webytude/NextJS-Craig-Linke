import MediaRenderer from "@/components/common/MediaRenderer";
import TwoColumnLayout from "@/components/layouts/TwoColumnLayout";
import SlideRight from "@/components/ui/animations/SlideRight";
import Box from "@/components/ui/Box/Box";
import Divider from "@/components/ui/Divider";
import styles from './careersIntro.module.css';
import FadeUp from "@/components/ui/animations/FadeUp";
import Heading from "@/components/ui/Heading";
import { BlocksRenderer } from "@strapi/blocks-react-renderer";
import Paragraph from "@/components/ui/Paragraph";

export default function CareersIntro({ data }) {
    const { Title, SubTitle, CareersDescription, RightSideMedia } = data;

    const leftContent = (
    <>
        <Box fullHeight justify="center">
      <FadeUp classes="p20 text-center" style={{maxWidth:570, margin: 'auto'}}>
        <div className="text-light uppercase">{Title}</div>
        <Heading className={styles.heading}>
            {SubTitle}
        </Heading>
        <Paragraph className="text-light" style={{ maxWidth: 420, margin: 'auto'}}>
            <BlocksRenderer content={CareersDescription || []} />
        </Paragraph>
      </FadeUp>
      </Box>
    </>
  );

  const rightContent = (
    <>
        <Box fullHeight justify="center">
        <SlideRight className={styles.center}>
            <MediaRenderer media={RightSideMedia} width={514} height={642} classes={"image"} altFallback={Title} />
        </SlideRight>
        </Box>
    </>
  );

    return (
        <>
        <section className="contentHero fitToScreen">
        <TwoColumnLayout fullHeight left={leftContent} right={rightContent} style={{ maxWidth: 1250, margin: 'auto'}} />
        </section>
        <Divider />
        </>
    )
}