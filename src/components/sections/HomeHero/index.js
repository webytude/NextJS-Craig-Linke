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
      <Box fullHeight direction="column" justify="space-between" borderBottom>
        <h1 className="headingOne">{Title}</h1>
        <div className="flex justify-space-between fullWidth">
          <div className="text-light uppercase">{ShortText}</div>
          {Button && (
            <div>
              <LinkWithArrow text={Button.ButtonText} href={Button.ButtonURL} />
            </div>
          )}
        </div>
      </Box>
      <Box
        fullHeight
        direction="row"
        justify="space-between"
        align="flex-end"
        padding="0"
        equalChildren
        showDivider
      >
        <div className="p20">
          <MediaRenderer media={LeftSideMedia} />
        </div>
        <div className="p20 text-right">
          {/* <LinkWithArrow text="READ MORE" href="#" /> */}
        </div>
      </Box>
    </>
  );

  const rightContent = (
    <>
      <div className="p20">
        <MediaRenderer media={RightSideMedia} />
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
