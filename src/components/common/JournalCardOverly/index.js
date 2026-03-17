import Image from "next/image";
import styles from "./journalCardOverly.module.css";
import Heading from "@/components/ui/Heading";
import Paragraph from "@/components/ui/Paragraph";
import LinkWithArrow from "@/components/ui/Link";
import { BlocksRenderer } from "@strapi/blocks-react-renderer";
import MediaRenderer from "../MediaRenderer";
import Link from "next/link";

export default function JournalCardOverly({ firstItem }) {
  return (
    <div className={styles.projectHighlight}>
      <div className={styles.imgWrapper}>        
          <MediaRenderer media={firstItem?.Media} width={912} classes={'image'} />
          <div className={styles.overly} />
      </div>
      <div className={styles.proOverlyContent}>
        <div className={styles.contentBottom}>
          <div className={styles.contentWrapper}>
          <div className={styles.categoryName}>
            <div className={styles.name}>INSIGHTS</div>
            <div className={styles.date}>
              {new Date(firstItem?.Date)
              .toLocaleDateString("en-US", {
                month: "2-digit",
                day: "2-digit",
                year: "2-digit",
              })
              .replace(/\//g, " / ")}
            </div>
          </div>
          <Heading level={4}>{firstItem?.Name}</Heading>
          <div className={styles.description}>
            <Paragraph>
              <BlocksRenderer content={firstItem?.Description || []} />
            </Paragraph>
          </div>
          <div className={styles.readMore}>
            <LinkWithArrow text="READ MORE" href={`/journals/${firstItem.Slug}`} />
          </div>
          </div>
        </div>
        <Link href={`/journals/${firstItem?.Slug}`} className={styles.contentLink}></Link>
      </div>
    </div>
  );
}
