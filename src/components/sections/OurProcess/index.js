import MediaRenderer from "@/components/common/MediaRenderer";
import TwoColumnLayout from "@/components/layouts/TwoColumnLayout";
import SlideLeft from "@/components/ui/animations/SlideLeft";
import Divider from "@/components/ui/Divider";
import Paragraph from "@/components/ui/Paragraph";
import { BlocksRenderer } from "@strapi/blocks-react-renderer";
import styles from './ourProcess.module.css';

export default function OurProcess({ data }) {
  const { Media, ProcessSteps, Padding } = data;

  const {
  DesktopTopPadding,
  DesktopBottomPadding,
  MobileTopPadding,
  MobileBottomPadding,
} = Padding;

  console.log('OurProcess', data)

  const styleVars = {};

  if (DesktopTopPadding) {
    styleVars["--desktop-pt"] = `${DesktopTopPadding}px`;
  }

  if (DesktopBottomPadding) {
    styleVars["--desktop-pb"] = `${DesktopBottomPadding}px`;
  }

  if (MobileTopPadding) {
    styleVars["--mobile-pt"] = `${MobileTopPadding}px`;
  }

  if (MobileBottomPadding) {
    styleVars["--mobile-pb"] = `${MobileBottomPadding}px`;
  }

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
        <div key={index} className={styles.step} style={{}}>
          <div className={styles.left}>
            <span className={`${styles.stepNumber} headingTwo`}>{stepNumber}</span>
          </div>
          <div className={styles.right}>
            <h3 className="headingTwo">{item.Title}</h3>
            <Paragraph>
              <BlocksRenderer content={item.Content || []} />
            </Paragraph>
            <MediaRenderer media={item.Media} classes={styles.ProcessMedia} />
          </div>
        </div>
      )
      })}
    </div>
  );

  return (
    <>
      <section className={styles.ourProcess} style={styleVars}>
        <TwoColumnLayout left={leftContent} right={rightContent} />
      </section>
      <Divider />
    </>
  );
}
