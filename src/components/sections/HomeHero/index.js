import Box from "@/components/ui/Box/Box";
import styles from "./homeHero.module.css";
import TwoColumnLayout from "@/components/layouts/TwoColumnLayout";
import LinkWithArrow from "@/components/ui/Link";
import Image from "next/image";
import MediaRenderer from "@/components/common/MediaRenderer";
import Divider from "@/components/ui/Divider";

export default function HomeHero({ data }) {
  const { Title, ShortText, Button, LeftSideMedia, RightSideMedia } = data;

  const leftContent = (
    <>
      <Box fullHeight direction="column" justify="space-between" mobileGap="90px" borderBottom>
        <h1 className="headingOne" style={{ maxWidth: 560 }}>
          {Title}
        </h1>
        <div className="flex justify-space-between fullWidth">
          <div className="uppercase hero-text-light">{ShortText}</div>
          {Button && (
            <div className="hide-mobile">
              <LinkWithArrow text={Button.ButtonText} href={Button.ButtonURL} />
            </div>
          )}
        </div>
      </Box>
      <Box className="hide-desktop" borderBottom>
        <MediaRenderer media={RightSideMedia} classes={"image"} />
      </Box>
      <Box
        fullHeight
        direction="row"
        justify="space-between"
        align="flex-end"
        padding="0"
        equalChildren
        showDivider
        mobileDirection="row-reverse"
        mobileJustify="center"
        mobileAlign="center"
      >
        <div className="p20">
          <MediaRenderer media={LeftSideMedia} />
        </div>
        <div className="p20">
          {Button && (
            <div className="text-center hide-desktop">
              <LinkWithArrow text={Button.ButtonText} href={Button.ButtonURL} />
            </div>
          )}
        </div>
      </Box>
    </>
  );

  const rightContent = (
    <>
      <div className="p20 hide-mobile">
        <MediaRenderer media={RightSideMedia} classes={"image"} />
      </div>
    </>
  );

  return (
    <>
      <section className="home-hero">
        <TwoColumnLayout left={leftContent} right={rightContent} showDivider />
      </section>
      <Divider />
    </>
  );
}
