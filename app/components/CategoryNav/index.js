"use client";
import React, { useState } from "react";
import styles from "./CategoryNav.module.css";

const CategoryNav = ({ items = [], onSelect }) => {
  const [active, setActive] = useState(items[0]?.id || null);

  const handleSelect = (id) => {
    setActive(id);
    if (onSelect) onSelect(id);
  };

  return (
    <div className={styles.navContainer}>
      {items.map((item) => (
        <button
          key={item.id}
          onClick={() => handleSelect(item.id)}
          className={`${styles.navItem} ${
            active === item.id ? styles.active : ""
          }`}
        >
          <span className={styles.icon}>
            {active === item.id ? "(•)" : "( )"}
          </span>
          <span className={styles.label}>{item.label}</span>
        </button>
      ))}
    </div>
  );
};

export default CategoryNav;
