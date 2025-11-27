import MediaRenderer from "@/components/common/MediaRenderer";
import TwoColumnLayout from "@/components/layouts/TwoColumnLayout";
import FadeUp from "@/components/ui/animations/FadeUp";
import Box from "@/components/ui/Box/Box";
import Heading from "@/components/ui/Heading";
import Paragraph from "@/components/ui/Paragraph";
import { BlocksRenderer } from "@strapi/blocks-react-renderer";
import astheticsStyles from "../style/asthetics..module.css";

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
        <div className="uppercase">{Title}</div>
        <div className="heading" style={{ maxWidth: 500 }}>
          <BlocksRenderer content={TopContent || []} />
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
          <Paragraph>
            <BlocksRenderer content={BottomContent || []} />
          </Paragraph>
        </div>
        <div className="p20 text-right hide-mobile" />
      </Box>
    </>
  );

  const rightContent = (
    <>
      <div className="p20">
        <MediaRenderer media={Media} classes={"image"} />
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
