import MediaRenderer from "@/components/common/MediaRenderer";
import TwoColumnLayout from "@/components/layouts/TwoColumnLayout";
import FadeUp from "@/components/ui/animations/FadeUp";
import Box from "@/components/ui/Box/Box";
import Heading from "@/components/ui/Heading";
import Paragraph from "@/components/ui/Paragraph";
import { BlocksRenderer } from "@strapi/blocks-react-renderer";
import astheticsStyles from "../style/asthetics..module.css";
import SlideLeft from "@/components/ui/animations/SlideLeft";

export default function MediaWithTopBottomContent({ data }) {
  const { Title, TopContent, BottomContent, Media } = data;

  const leftContent = (
    <>
      <Box
        fullHeight
        direction="column"
        justify="space-between"
        borderBottom
        borderColor="#EAEAE8"
        mobileBorderBottom={false}
        mobileGap={'20px'}
      >
        <div className="uppercase"><FadeUp>{Title}</FadeUp></div>
        <div className="heading" style={{ maxWidth: 500 }}>
          <FadeUp>
          <BlocksRenderer content={TopContent || []} />
          </FadeUp>
        </div>
      </Box>

      <Box
        fullHeight
        direction="row"
        justify="space-between"
        align="flex-end"
        padding="0"
        equalChildren
        mobileDirection="column"
      >
        <div className="p20">
          <FadeUp>
          <Paragraph>
            <BlocksRenderer content={BottomContent || []} />
          </Paragraph>
          </FadeUp>
        </div>
        <div className="p20 text-right hide-mobile" />
      </Box>
    </>
  );

  const rightContent = (
    <>
      <div className="p20">
        <SlideLeft>
        <MediaRenderer media={Media} classes={"image"} />
        </SlideLeft>
      </div>
    </>
  );

  return (
    <section
      className={`${astheticsStyles.section} ${astheticsStyles.full} ${astheticsStyles.mediaWithTopBottomContent}`}
    >
      <TwoColumnLayout
        left={leftContent}
        right={rightContent}
        showDivider
        showMobileDivider={false}
        fullHeight
        dividerColor="#EAEAE8"
      />
    </section>
  );
}
