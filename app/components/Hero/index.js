import Image from "next/image";
import styles from "./hero.module.css";
import Box from "../ui/Box/Box";
import Paragraph from "../ui/Paragraph";
import LinkWithArrow from "../ui/Link";
import TwoColumnLayout from "../layout/TwoColumnLayout";

export default function Hero() {
  const leftContent = (
    <>
      <Box fullHeight direction="column" justify="space-between" borderBottom>
        <h1 className="headingOne">
          Craig Linke is a boutique, Adelaide based building and interior design
          company. We specialise in architectural builds and custom renovation
          projects.
        </h1>
        <div className="flex justify-space-between fullWidth">
          <div className="text-light">INTERIOR DESIGN</div>
          <div>
            <LinkWithArrow text="ABOUT" href="/about" />
          </div>
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
      >
        <div className="p20">
          <video
            className={styles.backgroundVideo}
            src="/images/file_1.mp4"
            autoPlay
            muted
            loop
            playsInline
            width="100%"
          />
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
        <Image
          src="/images/hero.png"
          alt="Interior design"
          width={716}
          height={889}
          className="image"
        />
      </div>
    </>
  );
  return (
    <section>
      <TwoColumnLayout left={leftContent} right={rightContent} showDivider />
    </section>
  );
}
