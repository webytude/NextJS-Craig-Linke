import MediaRenderer from "@/components/common/MediaRenderer";
import TwoColumnLayout from "@/components/layouts/TwoColumnLayout";
import Box from "@/components/ui/Box/Box";
import Divider from "@/components/ui/Divider";
import Link from "next/link";
import styles from "./contactHero.module.css";
import Paragraph from "@/components/ui/Paragraph";
import ContactForm from "../ContactForm";
import Spacer from "@/components/ui/Spacer";

export default function ContactHero({ data }) {
  const { Title, Description, Address, Email, Number, Media, FormSideMedia } =
    data;

  const leftContent = (
    <>
      <Box fullHeight direction="column" justify="space-between" borderBottom>
        <div className="text-light uppercase">{Title}</div>
        <h1 className="headingOne" style={{ maxWidth: 476 }}>
          {Description}
        </h1>
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
          <div className={styles.contactDetail}>
            <div>
              <div clas sName={`text-light uppercase ${styles.subHeading}`}>
                ADDRESS
              </div>
              <Paragraph style={{fontSize: 12 }}>{Address}</Paragraph>
            </div>
            <div>
              <div className={`text-light uppercase ${styles.subHeading}`}>
                EMAIL
              </div>
              <Paragraph style={{fontSize: 12 }}>{Email}</Paragraph>
            </div>
            <div>
              <div className={`text-light uppercase ${styles.subHeading}`}>
                NUMBER
              </div>
              <Paragraph style={{fontSize: 12 }}>{Number}</Paragraph>
            </div>
          </div>
        </div>
        <div className="p20 text-right" />
      </Box>
    </>
  );

  const rightContent = (
    <>
      <div className="p20">
        <MediaRenderer media={Media} classes={"image"} />
      </div>
    </>
  );

  const leftContentSecond = (
    <div className="p20">
      <MediaRenderer media={FormSideMedia} width={244} height={329} />
    </div>
  );

  const rightContentSecond = (
    <div className="p20">
      <ContactForm />
    </div>
  );

  return (
    <>
      <section className="contactHero">
        <TwoColumnLayout left={leftContent} right={rightContent} showDivider />
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
