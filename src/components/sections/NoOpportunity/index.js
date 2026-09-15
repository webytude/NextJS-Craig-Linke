import TwoColumnLayout from "@/components/layouts/TwoColumnLayout";
import Heading from "@/components/ui/Heading";
import Paragraph from "@/components/ui/Paragraph";
import { BlocksRenderer } from "@strapi/blocks-react-renderer";
import styles from "./noOpportunity.module.css";

export default function NoOpportunity({ data }) {
  const { NoOpportunityHeading, NoOpportunityDescription } = data;
  return (
    <section className={`${styles.noOpportunitySection}`}>
      <div className="p20">
        <Heading level={2}>
          {NoOpportunityHeading}
        </Heading>
      </div>
      <div>
        <Paragraph>
          <BlocksRenderer content={NoOpportunityDescription || []} />
        </Paragraph>
      </div>
    </section>
  );
}
