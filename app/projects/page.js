"use client";

import Image from "next/image";
import ProjectFilterBase from "../components/ProjectFilterBase";
import styles from './projects.module.css';
import Link from "next/link";

export default function Project() {
  const projects = [
    { id: 1, title: "Villa Interior", category: "Interior Design", image: "/images/project1.jpg", slug: "villa-interior", },
    { id: 2, title: "Outdoor Lounge", category: "Outdoor Living", image: "/images/project2.jpg", slug: "outdoor-lounge", },
    { id: 3, title: "Luxury Home", category: "Interior Design", image: "/images/project3.jpg", slug: "luxury-home", },
  ];

  const renderGridLayout = (filteredProjects) => (
    <div className={styles.grid}>
      {filteredProjects.map((p) => (
        <Link key={p.id} href={`/projects/${p.slug}`} className={styles.card}>
          <Image src={p.image} alt={p.title} fill className={styles.image} />
          <div className={styles.info}>
            <h4>{p.title}</h4>
            <p>{p.category}</p>
          </div>
        </Link>
      ))}
    </div>
  );

  return <ProjectFilterBase projects={projects} renderProjects={renderGridLayout} />
}
