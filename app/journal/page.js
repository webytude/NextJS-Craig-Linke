"use client";

import Image from "next/image";
import styles from './journal.module.css';
import ProjectFilterBase from "../components/ProjectFilterBase";

export default function Journal() {
  const projects = [
    { id: 1, title: "Beach Villa", category: "Outdoor Living", image: "/images/project2.jpg" },
    { id: 2, title: "Urban Loft", category: "Interior Design", image: "/images/project3.jpg" },
  ];

  const renderListLayout = (filteredProjects) => (
    <div className={styles.list}>
      {filteredProjects.map((p) => (
        <div key={p.id} className={styles.row}>
          <div className={styles.thumb}>
            <Image src={p.image} alt={p.title} width={300} height={200} />
          </div>
          <div className={styles.content}>
            <h3>{p.title}</h3>
            <p>{p.category}</p>
          </div>
        </div>
      ))}
    </div>
  );

  return <ProjectFilterBase projects={projects} renderProjects={renderListLayout} />;
}
