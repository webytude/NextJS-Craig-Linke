import MediaRenderer from "@/components/common/MediaRenderer";
import TwoColumnLayout from "@/components/layouts/TwoColumnLayout";
import Box from "@/components/ui/Box/Box";
import Divider from "@/components/ui/Divider";
import LinkWithArrow from "@/components/ui/Link";
import Paragraph from "@/components/ui/Paragraph";
import { BlocksRenderer } from "@strapi/blocks-react-renderer";
import Link from "next/link";
import styles from "./aboutHero.module.css";

export default function AboutHero({ data }) {
  const { Title, SubTitle, Buttons, ShortText, RightSideMedia } = data;

  const leftContent = (
    <>
      <Box fullHeight direction="column" justify="space-between" borderBottom>
        <div className="text-light uppercase">{Title}</div>
        <h1 className="headingOne" style={{ maxWidth: 476 }}>
          {SubTitle}
        </h1>
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
          {Buttons.map((item, index) => (
            <div key={index}>
              <Link href={item.ButtonURL || "#"}>
                <span className={styles.icon}>( )</span>
                <span className={styles.label}>{item.ButtonText}</span>
              </Link>
            </div>
          ))}
        </div>
        <div className="p20 text-right">
          <div className="text-light uppercase">{ShortText}</div>
        </div>
      </Box>
    </>
  );

  const rightContent = (
    <>
      <div className="p20">
        <MediaRenderer media={RightSideMedia} classes={"image"} />
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
