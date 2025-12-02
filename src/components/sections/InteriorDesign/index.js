import TwoColumnLayout from "@/components/layouts/TwoColumnLayout";
import Box from "@/components/ui/Box/Box";
import LinkWithArrow from "@/components/ui/Link";
import Paragraph from "@/components/ui/Paragraph";
import styles from "./interiorDesign.module.css";
import { BlocksRenderer } from "@strapi/blocks-react-renderer";
import MediaRenderer from "@/components/common/MediaRenderer";
import Divider from "@/components/ui/Divider";
import Spacer from "@/components/ui/Spacer";
import Heading from "@/components/ui/Heading";
import FadeUp from "@/components/ui/animations/FadeUp";
import SlideRight from "@/components/ui/animations/SlideRight";
import SlideLeft from "@/components/ui/animations/SlideLeft";

export default function InteriorDesign({ data }) {
  const { Title, SubTitle, InteriorDesign, Media, Button } = data;

  const leftContent = (
    <>
      {/* === TOP BOX === */}
      <Box fullHeight direction="column" justify="space-between" borderBottom mobileBorderBottom={false} mobileGap="30px">
        <div className="text-light uppercase">{Title}</div>
        {/* <h1 className="headingOne" style={{ maxWidth: 470 }}>{SubTitle}</h1> */}
        <FadeUp>
          <Heading level={2} style={{ maxWidth: 470 }}>{SubTitle}</Heading>
        </FadeUp>

      <div className="hide-desktop">
        <FadeUp>
        <Paragraph>
          <BlocksRenderer content={InteriorDesign || []} />
        </Paragraph>
        </FadeUp>
        <Spacer mobile={30} />
        <FadeUp>
        <LinkWithArrow text={Button.ButtonText} href={Button.ButtonURL} />
        </FadeUp>
      </div>
      </Box>

      {/* === BOTTOM BOX === */}
      <Box
        fullHeight
        direction="row"
        justify="space-between"
        align="flex-end"
        padding="0"
        equalChildren
        showDivider
        className="hide-mobile"
      >
        <div className="p20">
          <FadeUp>
          <Paragraph>
            <BlocksRenderer content={InteriorDesign || []} />
          </Paragraph>
          </FadeUp>
        </div>
        <div className="p20 text-right">
          <FadeUp>
          <LinkWithArrow text={Button.ButtonText} href={Button.ButtonURL} />
          </FadeUp>
        </div>
      </Box>
    </>
  );

  const rightContent = (
    <>
      <div className="p20">
        <SlideLeft>
          <MediaRenderer media={Media} classes={'image'} />
        </SlideLeft>
      </div>
    </>
  );

  return (
    <>
    <Divider className="hide-desktop" style={{ marginTop: '35px'}} />
    <section className="InteriorDesign">
      <TwoColumnLayout left={leftContent} right={rightContent} showDivider showMobileDivider={false} />
    </section>
    <Divider />
    </>
  );
}
