"use client";

import LinkWithArrow from "@/components/ui/Link";
import styles from "./index.module.css";
import { motion, AnimatePresence } from "framer-motion";
import TwoColumnLayout from "@/components/layouts/TwoColumnLayout";
import { useEffect, useState } from "react";
import Image from "next/image";
import MediaRenderer from "@/components/common/MediaRenderer";
import Link from "next/link";
import Heading from "@/components/ui/Heading";
import Box from "@/components/ui/Box/Box";

export default function Index({ onClose, projects }) {
  const [hoveredMedia, setHoveredMedia] = useState(null);

  useEffect(() => {
    if (projects && projects.length > 0) {
      setHoveredMedia(projects[0].Media);
    }
  }, [projects]);

  const indexVariants = {
    hidden: { opacity: 0, y: "100%" },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 100, damping: 20 },
    },
    exit: { opacity: 0, y: "100%", transition: { ease: "easeInOut" } },
  };

  const imageVariants = {
    initial: { opacity: 0, scale: 0.99 },
    animate: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.6, ease: "easeOut" },
    },
    exit: {
      opacity: 0,
      scale: 0.99,
      transition: { duration: 0.4, ease: "easeIn" },
    },
  };

  const leftContent = (
    <>
      <Box direction="row" align="flex-end" fullHeight padding="0">
        <div className={`${styles.projectList} fullWidth`}>
          <button className={styles.backBtn} onClick={onClose}>
            <span className={styles.arrow}>
              <svg
                width="10"
                height="10"
                viewBox="0 0 10 10"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M8.7417 4.79035H1.17033"
                  stroke="#EAEAE8"
                  stroke-width="0.917469"
                  stroke-linecap="square"
                  stroke-linejoin="round"
                />
                <path
                  d="M4.6001 0.64875L0.458496 4.79035L4.6001 8.93195"
                  stroke="#EAEAE8"
                  stroke-width="0.917469"
                  stroke-linecap="square"
                  stroke-linejoin="round"
                />
              </svg>
            </span>{" "}
            Back
          </button>
          <ul>
            {projects &&
              projects.map((projectItem, index) => {
                const projectNumber = index + 1;
                const formattedNumber =
                  projectNumber < 10 ? `0${projectNumber}` : `${projectNumber}`;
                return (
                  <li
                    key={projectItem.Slug}
                    onMouseEnter={() => setHoveredMedia(projectItem.Media)}
                  >
                    <Link
                      href={`/projects/${projectItem.Slug}`}
                      className={styles.projectNameLink}
                    >
                      <span className={styles.projectNumber}>
                        {formattedNumber}
                      </span>
                      <Heading level={4}>{projectItem.Name}</Heading>
                      <span className={styles.exploreText}>EXPLORE</span>
                    </Link>
                  </li>
                );
              })}
          </ul>
        </div>
      </Box>
    </>
  );

  const rightContent = (
    <div className={styles.projectImageContainer}>
      <AnimatePresence mode="wait">
        {hoveredMedia ? (
          <motion.div
            key={
              hoveredMedia.EnableMuxVideo && hoveredMedia.MuxVideo?.playback_id
                ? hoveredMedia.MuxVideo.playback_id
                : hoveredMedia.ImageORCarousel?.[0]?.url || "default-media"
            }
            variants={imageVariants}
            initial={"initial"}
            animate={"animate"}
            exit="exit"
            className={`p20 text-right`}
          >
            <MediaRenderer media={hoveredMedia} width={431} height={627} />
          </motion.div>
        ) : (
          <motion.p
            key="placeholder"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            Hover over a project to see its image
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );

  return (
    <motion.div
      variants={indexVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className={styles.indexWrapper}
    >
      <TwoColumnLayout
        left={leftContent}
        right={rightContent}
        showDivider
        fullHeight
      />
    </motion.div>
  );
}
