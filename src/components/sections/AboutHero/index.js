import MediaRenderer from "@/components/common/MediaRenderer";
import TwoColumnLayout from "@/components/layouts/TwoColumnLayout";
import Box from "@/components/ui/Box/Box";
import Divider from "@/components/ui/Divider";
import LinkWithArrow from "@/components/ui/Link";
import Paragraph from "@/components/ui/Paragraph";
import { BlocksRenderer } from "@strapi/blocks-react-renderer";
import Link from "next/link";
import styles from "./aboutHero.module.css";
import FadeUp from "@/components/ui/animations/FadeUp";
import Heading from "@/components/ui/Heading";
import SlideLeft from "@/components/ui/animations/SlideLeft";

export default function AboutHero({ data, quickLinks }) {
  const { Title, SubTitle, ShortText, RightSideMedia } = data;

  const handleScroll = (e, id) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const leftContent = (
    <>
      <Box fullHeight direction="column" justify="space-between" mobileGap="90px" borderBottom>
        <div className="text-light uppercase">{Title}</div>
        <FadeUp><Heading level={1} style={{ maxWidth: 476 }}>{SubTitle}</Heading></FadeUp>
      </Box>
      <Box className="hide-desktop" borderBottom>
        <FadeUp style={{ width: '100%' }}>
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
      >
        <div className={`${styles.navItem} p20`}>
          <FadeUp>
          {quickLinks && quickLinks.length > 0 ? (
             quickLinks.map((link, index) => (
                <div key={index}>
                  <Link 
                    href={`#${link.id}`} 
                    onClick={(e) => handleScroll(e, link.id)}
                    style={{ textDecoration: 'none', cursor: 'pointer' }}
                  >
                    <span className={styles.icon}>( )</span>
                    <span className={styles.label}>{link.label}</span>
                  </Link>
                </div>
             ))
          ) : (
             null
          )}
          </FadeUp>
        </div>
        <div className="p20 text-right">
          <div className="text-light uppercase">
            <FadeUp>
              {ShortText}
            </FadeUp>
          </div>
        </div>
      </Box>
    </>
  );

  const rightContent = (
    <>
      <div className="p20 hide-mobile">
        <SlideLeft>
          <MediaRenderer media={RightSideMedia} classes={"image"} />
        </SlideLeft>
      </div>
    </>
  );

  return (
    <>
      <section className="aboutHero">
        <TwoColumnLayout left={leftContent} right={rightContent} showDivider />
      </section>
      <Divider />
    </>
  );
}
