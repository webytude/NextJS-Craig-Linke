import MediaRenderer from "@/components/common/MediaRenderer";
import TwoColumnLayout from "@/components/layouts/TwoColumnLayout";
import SlideLeft from "@/components/ui/animations/SlideLeft";
import Divider from "@/components/ui/Divider";
import Paragraph from "@/components/ui/Paragraph";
import { BlocksRenderer } from "@strapi/blocks-react-renderer";
import styles from "./guidingPrinciples.module.css";
import Heading from "@/components/ui/Heading";

export default function GuidingPrinciples({ data }) {
  const { PrinciplesHeading, Media, GuidingLists } = data;

  const leftContent = (
    <>
      <SlideLeft className="p20">
        <MediaRenderer media={Media} width={337} height={481} />
      </SlideLeft>
    </>
  );

  const rightContent = (
    <div className="p20">
      {GuidingLists.map((item, index) => {
        return (
          <div key={index} className={styles.step}>
            <div className={styles.left}>
              <span className={`${styles.stepNumber} headingTwo text-light`}>
                {item.Number}
              </span>
            </div>
            <div className={styles.right}>
              <h3 className="headingTwo text-light">{item.Title}</h3>
              <Paragraph>{item.Description}</Paragraph>
            </div>
          </div>
        );
      })}
    </div>
  );

  return (
    <>
      <section className={styles.ourProcess}>
        <Heading level={2} className={styles.heading}>
        {PrinciplesHeading}
        </Heading>
        <Divider />
        <div className={styles.guidingPrinciples}>
        <TwoColumnLayout left={leftContent} right={rightContent} />
        </div>
      </section>
    </>
  );
}
