"use client";

import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ProjectCard from "../common/ProjectCard";
import styles from "./InfiniteProjects.module.css";
import Divider from "../ui/Divider";
import Spacer from "../ui/Spacer";

export default function InfiniteProjects({ filteredProjects }) {
  const [visibleCount, setVisibleCount] = useState(12);
  const loaderRef = useRef(null);

  // Infinite Scroll Effect
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (
          entries[0].isIntersecting &&
          visibleCount < filteredProjects.length
        ) {
          setVisibleCount((prev) => prev + 12);
        }
      },
      { threshold: 1 }
    );

    const loader = loaderRef.current;
    if (loader) observer.observe(loader);

    return () => loader && observer.unobserve(loader);
  }, [filteredProjects.length, visibleCount]);

  const visibleProjects = filteredProjects.slice(0, visibleCount);

  // Animations
  const fadeInVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.06, duration: 0.4, ease: "easeOut" },
    }),
  };

  return (
    <>
      <div className={styles.subNav}>
        <button className={styles.active}>OVERVIEW</button>
        <button>INDEX</button>
      </div>
      <Divider color="#D0D0D0" />
      {filteredProjects.length === 0 ? (
        <motion.div
          className={styles.noProjects}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <p>No projects found for this category.</p>
        </motion.div>
      ) : (
        <>
          <motion.div
            className={styles.grid}
            layout
            initial="hidden"
            animate="visible"
          >
            <AnimatePresence>
              {visibleProjects.map((p, i) => (
                <motion.div
                  key={p.id}
                  custom={i}
                  variants={fadeInVariants}
                  initial="hidden"
                  animate="visible"
                  exit={{ opacity: 0 }}
                  layout
                >
                  <ProjectCard project={p} />
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
          <Spacer desktop={130} />
        </>
      )}
    </>
  );
}
