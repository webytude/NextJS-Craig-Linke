import TwoColumnLayout from "@/components/layouts/TwoColumnLayout";
import Divider from "@/components/ui/Divider";
import Heading from "@/components/ui/Heading";
import styles from "./currentOpportunity.module.css";
import Paragraph from "@/components/ui/Paragraph";
import { BlocksRenderer } from "@strapi/blocks-react-renderer";
import LinkWithArrow from "@/components/ui/Link";

export default function CurrentOpportunity({ data }) {
  const { Title, SubTitle, OverviewLabel, OverviewDescription, Button } = data;

  const leftContent = (
    <>
    <div className="p20">
      <div className={`${styles.title} text-light`}>{Title}</div>
      <Heading level={2} className={styles.heading}>
        {SubTitle}
      </Heading>
      </div>
    </>
  );

  const rightContent = (
    <div className="p20">
      <div className={`${styles.title} text-light`}>{OverviewLabel}</div>
      <div className={styles.overview}>
      <Paragraph
        style={{ maxWidth: 420 }}
      >
        <BlocksRenderer content={OverviewDescription || []} />
      </Paragraph>
      <div className={styles.buttonWrapper}>
        <LinkWithArrow
            text={Button?.ButtonText || 'APPLY NOW'}
            href={Button?.ButtonURL || '#'}
        />
        </div>
      </div>
    </div>
  );

  return (
    <>
      <section className={styles.ourProcess}>
        <TwoColumnLayout left={leftContent} right={rightContent} />
      </section>
    </>
  );
}
