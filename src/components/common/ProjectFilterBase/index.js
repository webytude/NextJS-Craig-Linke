"use client";
import { useState } from "react";
import styles from "./projectFilterBase.module.css";
import FadeUp from "@/components/ui/animations/FadeUp";

export default function ProjectFilterBase({
  projects = [],
  renderProjects,
  initialCategory = "All",
  categoryKey = "ProjectCategory",
}) {
  const [activeCategory, setActiveCategory] = useState(initialCategory);

  // const categoryList = ["All", ...new Set(categories.length ? categories : projects.map(p => p.category))];

  const getAllCategories = () => {
    const categoriesSet = new Set();
    projects.forEach((project) => {
      const categories = project[categoryKey]

      if (
        Array.isArray(categories) &&
        categories.length > 0
      ) {
        categories.forEach((cat) => {
          if (cat && cat.Name) {
            categoriesSet.add(cat.Name);
          }
        });
      }
    });
    return ["All", ...Array.from(categoriesSet)];
  };

  const categoryList = getAllCategories();

  const filteredProjects =
    activeCategory === "All"
      ? projects
      : projects.filter(
          (project) =>
            Array.isArray(project[categoryKey]) &&
            project[categoryKey].some(
              (cat) => cat && cat.Name === activeCategory
            )
        );

  return (
    <div className={styles.wrapper}>
      {/* Tabs */}
      <div className={styles.navContainer}>
        
        {categoryList.map((cat, index) => (
          <FadeUp>
          <button
            key={index}
            onClick={() => setActiveCategory(cat)}
            className={`${styles.navItem} ${
              activeCategory === cat ? styles.active : ""
            }`}
          >
            <span className={styles.icon}>
              {activeCategory === cat ? "(•)" : "( )"}
            </span>
            <span className={styles.label}>{cat}</span>
          </button>
          </FadeUp>
        ))}
      </div>

      {/* Render passed UI */}
      <div className={styles.listArea}>{renderProjects(filteredProjects)}</div>
    </div>
  );
}
