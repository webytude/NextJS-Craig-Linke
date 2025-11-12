"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ProjectFilterBase from "../components/ProjectFilterBase";
import styles from "./journal.module.css";
import Divider from "../components/ui/Divider";
import Spacer from "../components/ui/Spacer";
import JournalCard from "../components/JournalCard";
import TwoColumnLayout from "../components/layout/TwoColumnLayout";

const projects = [
  {
    id: 1,
    title: "Beach Villa",
    category: "NEWS",
    image: "/images/project2.jpg",
  },
  {
    id: 2,
    title: "Urban Loft",
    category: "UPDATES",
    image: "/images/project3.jpg",
  },
  {
    id: 3,
    title: "Urban Loft 1",
    category: "CLIENT COLLABORATION",
    image: "/images/project3.jpg",
  },
  {
    id: 4,
    title: "Urban Loft 1",
    category: "CLIENT COLLABORATION",
    image: "/images/project3.jpg",
  },
  {
    id: 5,
    title: "Urban Loft 1",
    category: "CLIENT COLLABORATION",
    image: "/images/project3.jpg",
  },
  {
    id: 6,
    title: "Urban Loft 1",
    category: "CLIENT COLLABORATION",
    image: "/images/project3.jpg",
  },
  {
    id: 7,
    title: "Urban Loft 1",
    category: "CLIENT COLLABORATION",
    image: "/images/project3.jpg",
  },
  {
    id: 8,
    title: "Urban Loft 1",
    category: "CLIENT COLLABORATION",
    image: "/images/project3.jpg",
  },
];

export default function Journal() {
  const [visibleCount, setVisibleCount] = useState(12);
  const loaderRef = useRef(null);

  const handleInfiniteScroll = (filteredProjects) => {
    const visibleProjects = filteredProjects.slice(0, visibleCount);

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

    // Animation variants
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
      <div className="stickyBox">
        {firstItem && (
          <motion.div
            key={firstItem.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <JournalCard {...firstItem} />
          </motion.div>
        )}
      </div>
    );

    const rightContent = (
      <div>
        <motion.div
          //className={styles.grid}
          layout
          initial="hidden"
          animate="visible"
        >
          <AnimatePresence>
            {restItems.map((p, i) => (
              <motion.div
                key={p.id}
                custom={i}
                variants={fadeInVariants}
                initial="hidden"
                animate="visible"
                exit={{ opacity: 0 }}
                layout
              >
                <JournalCard {...p} />
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
      </div>
    );

    return (
      <>
        <div className={styles.subNav}>
          <button className={styles.active}>OVERVIEW</button>
          <button>INDEX</button>
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
        <Spacer desktop={130} />
        <Divider color="#8B6B68" />
      </>
    );
  };

  return (
    <ProjectFilterBase
      projects={projects}
      renderProjects={handleInfiniteScroll}
    />
  );
}
