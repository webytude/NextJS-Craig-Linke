"use client";
import { useState } from "react";
import styles from "./projectFilterBase.module.css";

export default function ProjectFilterBase({ projects = [], renderProjects, categories = [] }) {
  const [activeCategory, setActiveCategory] = useState("All");

  const categoryList = ["All", ...new Set(categories.length ? categories : projects.map(p => p.category))];

  const filteredProjects =
    activeCategory === "All"
      ? projects
      : projects.filter((p) => p.category === activeCategory);

  return (
    <div className={styles.wrapper}>
      {/* Tabs */}
      <div className={styles.navContainer}>
        {categoryList.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`${styles.navItem} ${activeCategory === cat ? styles.active : ""}`}
          >
            <span className={styles.icon}>{activeCategory === cat ? "(•)" : "( )"}</span>
            <span className={styles.label}>{cat}</span>
          </button>
        ))}
      </div>

      {/* Render passed UI */}
      <div className={styles.listArea}>
        {renderProjects(filteredProjects)}
      </div>
    </div>
  );
}
