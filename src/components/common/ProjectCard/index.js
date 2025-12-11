import Link from "next/link";
import styles from "./projectCard.module.css";
import Image from "next/image";
import MediaRenderer from "../MediaRenderer";
import FadeUp from "@/components/ui/animations/FadeUp";

export default function ProjectCard({ project }) {
  const { Name, Media, Slug } = project;
  return (
    <div className="text-center">
      <Link href={`projects/${Slug}`}>
        <div className={styles.imageWrapper}>
            <MediaRenderer media={Media} width={338} height={480} classes={'image'} />
        </div>
        <h3 className={styles.proTitle}>{Name}</h3>
      </Link>
    </div>
  );
}
