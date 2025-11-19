import Image from "next/image";
import styles from "./projectCardOverly.module.css";
import LinkWithArrow from "../ui/Link";

export default function ProjectCardOverly() {
  return (
    <div className={styles.projectHighlight}>
      <div className={styles.imgWrapper}>
        <video
            className={styles.backgroundVideo}
            src="/images/VXXZXZVC.mp4"
            autoPlay
            muted
            loop
            playsInline
            width={'100%'}
            // height={942}
            />
      </div>
      <div className={styles.proOverlyContent}>
        <div className="flex justify-space-between p20">
          <div className="text-light">ENDURING ARTISANAL HOMES</div>
          <div className="as">
            <LinkWithArrow text="ABOUT" href="/about" />
          </div>
        </div>
        <div className={styles.contentBottom}>
          <div className="flex justify-space-between">
            <h3 className={styles.title}>Springfield Residence </h3>
            <div className={styles.description}>
                Shea and the design team layer natural materials like linen, wool, jute, and reclaimed wood to create interiors that feel lived-in and organic. Whether a handwoven rug, a stone wall, or patinaed brass, each element adds warmth and character to the space.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
