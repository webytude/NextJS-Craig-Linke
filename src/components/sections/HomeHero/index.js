import Box from "@/components/ui/Box/Box";
import styles from "./homeHero.module.css";
import TwoColumnLayout from "@/components/layouts/TwoColumnLayout";
import LinkWithArrow from "@/components/ui/Link";
import Image from "next/image";
import MediaRenderer from "@/components/common/MediaRenderer";
import Divider from "@/components/ui/Divider";
import Heading from "@/components/ui/Heading";
import FadeUp from "@/components/ui/animations/FadeUp";
import SlideLeft from "@/components/ui/animations/SlideLeft";
import SlideRight from "@/components/ui/animations/SlideRight";

export default function HomeHero({ data }) {
  const { Title, ShortText, Button, LeftSideMedia, RightSideMedia } = data;

  const leftContent = (
    <>
      <Box
        fullHeight
        direction="column"
        justify="space-between"
        mobileGap="90px"
        borderBottom
        padding="0"
      >
        <FadeUp classes="p20">
          <Heading level={1} style={{ maxWidth: 580 }}>
            {Title}
          </Heading>
        </FadeUp>
        <div className="flex justify-space-between fullWidth p20">
          <FadeUp>
            <div className="uppercase hero-text-light">{ShortText}</div>
          </FadeUp>
          {Button && (
            <div className="hide-mobile">
              <FadeUp>
                <LinkWithArrow
                  text={Button.ButtonText}
                  href={Button.ButtonURL}
                />
              </FadeUp>
            </div>
          )}
        </div>
      </Box>
      <Box className="hide-desktop" borderBottom>
        <FadeUp>
          <MediaRenderer media={RightSideMedia} classes={"image"} />
        </FadeUp>
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
          <SlideRight className="p20 fullHeight">
            <MediaRenderer media={LeftSideMedia} classes={"image"} />
          </SlideRight>
          <div className="p20">
            {Button && (
              <FadeUp>
                <div className="text-center hide-desktop">
                  <LinkWithArrow
                    text={Button.ButtonText}
                    href={Button.ButtonURL}
                  />
                </div>
              </FadeUp>
            )}
          </div>
      </Box>
    </>
  );

  const rightContent = (
    <>
        <SlideLeft className="p20 hide-mobile fullHeight">
          <MediaRenderer media={RightSideMedia} classes={"image"} />
        </SlideLeft>
    </>
  );

  return (
    <>
      <section className={styles.homeHero}>
        <TwoColumnLayout fullHeight left={leftContent} right={rightContent} showDivider />
      </section>
      <Divider />
    </>
  );
}
