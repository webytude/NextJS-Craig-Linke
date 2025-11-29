import Link from "next/link";
import styles from "./projectCard.module.css";
import Image from "next/image";
import MediaRenderer from "../MediaRenderer";
import HoverZoom from "@/components/ui/animations/HoverZoom";
import FadeUp from "@/components/ui/animations/FadeUp";

export default function ProjectCard({ project }) {
  const { Name, Media, Slug } = project;
  return (
    <div className="text-center">
      <FadeUp>
      <Link href={`projects/${Slug}`}>
        <div className={styles.imageWrapper}>
          <HoverZoom>
            <MediaRenderer media={Media} width={338} height={480} />
          </HoverZoom>
        </div>
        <h3 className={styles.proTitle}>{Name}</h3>
      </Link>
      </FadeUp>
    </div>
  );
}
