import MediaRenderer from "@/components/common/MediaRenderer";
import TwoColumnLayout from "@/components/layouts/TwoColumnLayout";
import Box from "@/components/ui/Box/Box";
import Divider from "@/components/ui/Divider";
import Link from "next/link";
import styles from "./contactHero.module.css";
import Paragraph from "@/components/ui/Paragraph";
import ContactForm from "../ContactForm";
import Spacer from "@/components/ui/Spacer";
import FadeUp from "@/components/ui/animations/FadeUp";
import Heading from "@/components/ui/Heading";
import SlideLeft from "@/components/ui/animations/SlideLeft";

export default function ContactHero({ data }) {
  const { Title, Description, Address, Email, Number, Media, FormSideMedia } =
    data;

  const leftContent = (
    <>
      <Box
        fullHeight
        direction="column"
        justify="space-between"
        mobileGap="90px"
        borderBottom
      >
        <div className="text-light uppercase">{Title}</div>
        <FadeUp>
          <Heading level={1} style={{ maxWidth: 476 }}>
            {Description}
          </Heading>
        </FadeUp>
      </Box>
      <Box className="hide-desktop" borderBottom>
        <SlideLeft>
          <MediaRenderer media={Media} classes={"image"} />
        </SlideLeft>
      </Box>
      <Box
        fullHeight
        direction="row"
        justify="space-between"
        align="flex-end"
        padding="0"
        equalChildren
        showDivider={true}
        hideMobileDivider={true}
      >
        <div className="p20">
          <div className={styles.contactDetail}>
            <FadeUp>
              <div>
                <div className={`text-light uppercase ${styles.subHeading}`}>
                  ADDRESS
                </div>
                <Paragraph style={{ fontSize: 12 }}>{Address}</Paragraph>
              </div>
              <div>
                <div className={`text-light uppercase ${styles.subHeading}`}>
                  EMAIL
                </div>
                <Paragraph style={{ fontSize: 12 }}>{Email}</Paragraph>
              </div>
              <div>
                <div className={`text-light uppercase ${styles.subHeading}`}>
                  NUMBER
                </div>
                <Paragraph style={{ fontSize: 12 }}>{Number}</Paragraph>
              </div>
            </FadeUp>
          </div>
        </div>
        <div className="p20 text-right hide-mobile" />
      </Box>
    </>
  );

  const rightContent = (
    <>
      <div className="p20 hide-mobile">
        <SlideLeft>
          <MediaRenderer media={Media} classes={"image"} />
        </SlideLeft>
      </div>
    </>
  );

  const leftContentSecond = (
    <div className="p20">
      <SlideLeft>
        <MediaRenderer media={FormSideMedia} width={244} height={329} />
      </SlideLeft>
    </div>
  );

  const rightContentSecond = (
    <div className="p20">
      <FadeUp>
        <ContactForm />
      </FadeUp>
    </div>
  );

  return (
    <>
      <section className="contactHero">
        <TwoColumnLayout
          left={leftContent}
          right={rightContent}
          showDivider
          showMobileDivider={false}
        />
      </section>
      <Divider />
      <section className="contactForm">
        <Spacer desktop={92} />
        <TwoColumnLayout left={leftContentSecond} right={rightContentSecond} />
        <Spacer desktop={92} />
      </section>
    </>
  );
}
