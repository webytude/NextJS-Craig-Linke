"use client";
import { useState } from "react";
import styles from "./projectFilterBase.module.css";

/**
 * Reusable project filter logic
 * 
 * Props:
 * - projects: [{ id, title, category, image, ... }]
 * - renderProjects: function(projects[]) => JSX
 * - categories: optional custom category array
 */
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
      <div className={styles.tabs}>
        {categoryList.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`${styles.tab} ${activeCategory === cat ? styles.active : ""}`}
          >
            {cat}
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
