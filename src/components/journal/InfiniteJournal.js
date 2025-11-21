"use client";

import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ProjectCard from "../common/ProjectCard";
import styles from "./InfiniteJournal.module.css";
import Divider from "../ui/Divider";
import Spacer from "../ui/Spacer";
import JournalCardOverly from "../common/JournalCardOverly";
import JournalCard from "../common/JournalCard";
import TwoColumnLayout from "../layouts/TwoColumnLayout";

export default function InfiniteJournal({ filteredProjects }) {
  const [visibleCount, setVisibleCount] = useState(12);
  const loaderRef = useRef(null);

  const visibleProjects = filteredProjects.slice(0, visibleCount);

  // Infinite Scroll Effect
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const first = entries[0];
        if (first.isIntersecting && visibleCount < filteredProjects.length) {
          setVisibleCount((prev) => prev + 5);
        }
      },
      { threshold: 1 }
    );

    const currentLoader = loaderRef.current;
    if (currentLoader) observer.observe(currentLoader);
    return () => {
      if (currentLoader) observer.unobserve(currentLoader);
    };
  }, [filteredProjects.length, visibleCount]);
  
  const fadeInVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.06, duration: 0.4, ease: "easeOut" },
    }),
  };

  const [firstItem, ...restItems] = visibleProjects;

  const leftContent = (
    <div className="stickyBox p20">
      {firstItem && (
        <motion.div
          key={firstItem.Slug}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <JournalCardOverly firstItem={firstItem} />
        </motion.div>
      )}
    </div>
  );

  const rightContent = (
    <>
      <motion.div
        className={styles.list}
        layout
        initial="hidden"
        animate="visible"
      >
        <AnimatePresence>
          {restItems.map((p, i) => (
            <motion.div
              key={i}
              custom={i}
              variants={fadeInVariants}
              initial="hidden"
              animate="visible"
              exit={{ opacity: 0 }}
              layout
            >
              <JournalCard journal={p} />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {visibleCount < filteredProjects.length && (
        <div ref={loaderRef} className={styles.loader}>
          <motion.p
            initial={{ opacity: 0.3 }}
            animate={{ opacity: 1 }}
            transition={{
              duration: 0.6,
              repeat: Infinity,
              repeatType: "reverse",
            }}
          >
            Loading more...
          </motion.p>
        </div>
      )}
    </>
  );

  return (
    <>
      <div className={styles.subNav}>
        <button className={styles.active}>OVERVIEW</button>
        {/* <button>INDEX</button>  */}
      </div>
      
      <Divider color="#8B6B68" />

      {filteredProjects.length === 0 ? (
          <motion.div
            className={styles.noProjects}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <p>No projects found for this category.</p>
          </motion.div>
        ) : (
          <section className="positionRelative">
            <TwoColumnLayout left={leftContent} right={rightContent} />
          </section>
        )}
        <Divider color="#8B6B68" />
    </>
  );
}
