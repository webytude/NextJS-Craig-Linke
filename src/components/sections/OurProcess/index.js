import MediaRenderer from "@/components/common/MediaRenderer";
import TwoColumnLayout from "@/components/layouts/TwoColumnLayout";
import SlideLeft from "@/components/ui/animations/SlideLeft";
import Divider from "@/components/ui/Divider";
import Paragraph from "@/components/ui/Paragraph";
import { BlocksRenderer } from "@strapi/blocks-react-renderer";
import styles from './ourProcess.module.css';

export default function OurProcess({ data }) {
  const { Media, ProcessSteps } = data;
  const leftContent = (
    <>
      <SlideLeft className="p20 stickyBox">
          <MediaRenderer media={Media} width={337} height={481} />
        </SlideLeft>
    </>
  );

  const rightContent = (
    <div className="p20">
      {ProcessSteps.map((item, index) => {
      const stepNumber = String(index + 1).padStart(2, "0");
      return (
        <div key={index} className={styles.step}>
          <div className={styles.left}>
            <span className={`${styles.number} headingTwo`}>{stepNumber}</span>
          </div>
          <div className={styles.right}>
            <h3 className="headingTwo">{item.Title}</h3>
            <Paragraph>
              <BlocksRenderer content={item.Content || []} />
            </Paragraph>
          </div>
          
        </div>
      )
      })}
    </div>
  );

  return (
    <>
      <section className={styles.ourProcess}>
        <TwoColumnLayout left={leftContent} right={rightContent} />
      </section>
      <Divider />
    </>
  );
}
