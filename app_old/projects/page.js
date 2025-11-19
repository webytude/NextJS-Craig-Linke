"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ProjectFilterBase from "../components/ProjectFilterBase";
import styles from "./projects.module.css";
import Link from "next/link";
import ProjectCard from "../components/ProjectCard";
import Divider from "../components/ui/Divider";
import Spacer from "../components/ui/Spacer";

const projects = [
  {
    id: 1,
    title: "Villa Interior",
    category: "interior design",
    image: "/images/project1.jpg",
    slug: "villa-interior",
  },
  {
    id: 2,
    title: "Outdoor Lounge",
    category: "outdoor living",
    image: "/images/project2.jpg",
    slug: "outdoor-lounge",
  },
  {
    id: 3,
    title: "Luxury Home",
    category: " renovation",
    image: "/images/project3.jpg",
    slug: "luxury-home",
  },
  {
    id: 4,
    title: "Luxury Home",
    category: " renovation",
    image: "/images/project3.jpg",
    slug: "luxury-home",
  },
  {
    id: 5,
    title: "Luxury Home",
    category: " renovation",
    image: "/images/project3.jpg",
    slug: "luxury-home",
  },
  {
    id: 6,
    title: "Luxury Home",
    category: " renovation",
    image: "/images/project3.jpg",
    slug: "luxury-home",
  },
  {
    id: 7,
    title: "Luxury Home",
    category: " renovation",
    image: "/images/project3.jpg",
    slug: "luxury-home",
  },
  {
    id: 8,
    title: "Luxury Home",
    category: " renovation",
    image: "/images/project3.jpg",
    slug: "luxury-home",
  },
  {
    id: 9,
    title: "Luxury Home",
    category: " renovation",
    image: "/images/project3.jpg",
    slug: "luxury-home",
  },
  {
    id: 10,
    title: "Luxury Home",
    category: " renovation",
    image: "/images/project3.jpg",
    slug: "luxury-home",
  },
  {
    id: 11,
    title: "Luxury Home",
    category: " renovation",
    image: "/images/project3.jpg",
    slug: "luxury-home",
  },
  {
    id: 12,
    title: "Luxury Home",
    category: " renovation",
    image: "/images/project3.jpg",
    slug: "luxury-home",
  },
  {
    id: 13,
    title: "Luxury Home",
    category: " renovation",
    image: "/images/project3.jpg",
    slug: "luxury-home",
  },
  {
    id: 14,
    title: "Luxury Home",
    category: " renovation",
    image: "/images/project3.jpg",
    slug: "luxury-home",
  },
  {
    id: 15,
    title: "Luxury Home",
    category: " renovation",
    image: "/images/project3.jpg",
    slug: "luxury-home",
  },
  {
    id: 16,
    title: "Luxury Home",
    category: " renovation",
    image: "/images/project3.jpg",
    slug: "luxury-home",
  },
];

export default function Project() {
  const [visibleCount, setVisibleCount] = useState(12);
  const loaderRef = useRef(null);

  const handleInfiniteScroll = (filteredProjects) => {
    const visibleProjects = filteredProjects.slice(0, visibleCount);

    useEffect(() => {
      const observer = new IntersectionObserver(
        (entries) => {
          const first = entries[0];
          if (first.isIntersecting && visibleCount < filteredProjects.length) {
            setVisibleCount((prev) => prev + 12);
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
            transition={{ duration: 0.4 }}
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
                    <ProjectCard {...p} />
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
        )}
        <Spacer desktop={130} />
        <Divider color="#D0D0D0" />
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
