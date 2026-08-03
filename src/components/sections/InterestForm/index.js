import TwoColumnLayout from "@/components/layouts/TwoColumnLayout";
import Divider from "@/components/ui/Divider";
import Heading from "@/components/ui/Heading";
import Paragraph from "@/components/ui/Paragraph";
import { BlocksRenderer } from "@strapi/blocks-react-renderer";
import styles from "./interestForm.module.css";
import InterestForms from "./InterestForm";

export default function InterestForm({ data }) {
  const { Title, InterestContent } = data;

  const leftContent = (
    <div className="p20">
      <Paragraph style={{ maxWidth: 420 }}>
        <BlocksRenderer content={InterestContent || []} />
      </Paragraph>
    </div>
  );

  const rightContent = <div className="p20">
    <InterestForms />
  </div>;

  return (
    <>
      <section>
        <Heading level={2} className={styles.heading}>
          {Title}
        </Heading>
        <Divider />
        <div className={styles.interestForm}>
          <TwoColumnLayout left={leftContent} right={rightContent} />
        </div>
      </section>
    </>
  );
}
