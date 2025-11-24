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

export default function InteriorDesign({ data }) {
  const { Title, SubTitle, InteriorDesign, Media, Button } = data;

  const leftContent = (
    <>
      {/* === TOP BOX === */}
      <Box fullHeight direction="column" justify="space-between" borderBottom mobileBorderBottom={false} mobileGap="30px">
        <div className="text-light uppercase">{Title}</div>
        {/* <h1 className="headingOne" style={{ maxWidth: 470 }}>{SubTitle}</h1> */}
        <Heading level={2} style={{ maxWidth: 470 }}>{SubTitle}</Heading>

      <div className="hide-desktop">
        <Paragraph>
          <BlocksRenderer content={InteriorDesign || []} />
        </Paragraph>
        <Spacer mobile={30} />
        <LinkWithArrow text={Button.ButtonText} href={Button.ButtonURL} />
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
          <Paragraph>
            <BlocksRenderer content={InteriorDesign || []} />
          </Paragraph>
        </div>
        <div className="p20 text-right">
          <LinkWithArrow text={Button.ButtonText} href={Button.ButtonURL} />
        </div>
      </Box>
    </>
  );

  const rightContent = (
    <>
      <div className="p20">
        <MediaRenderer media={Media} classes={'image'} />
      </div>
    </>
  );

  return (
    <>
    <Divider />
    <section className="InteriorDesign">
      <TwoColumnLayout left={leftContent} right={rightContent} showDivider showMobileDivider={false} />
    </section>
    <Divider />
    </>
  );
}
