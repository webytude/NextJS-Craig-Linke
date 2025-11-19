import Image from "next/image";
import styles from "./projectCardOverly.module.css";
import LinkWithArrow from "@/components/ui/Link";
import MediaRenderer from "../MediaRenderer";
import { BlocksRenderer } from "@strapi/blocks-react-renderer";

export default function ProjectCardOverly({ bottomDescription, bottomTitle, button, media, topTitle}) {

  return (
    <div className={styles.projectHighlight}>
      <div className={styles.imgWrapper}>
        <Image
          src={media?.url || ""}
          alt={media?.alternativeText || ""}
          width={800}
          height={600}
          className="image"
        />
      </div>
      <div className={styles.proOverlyContent}>
        <div className="flex justify-space-between p20">
          <div className="text-light">{topTitle}</div>
          <div>
            <LinkWithArrow
                text={button?.ButtonText}
                href={button?.ButtonURL}
              />
          </div>
        </div>
        <div className={styles.contentBottom}>
          <div className="flex justify-space-between">
            <h3 className={styles.title}>{bottomTitle}</h3>
            <div className={styles.description}>
              <BlocksRenderer content={bottomDescription || []} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
