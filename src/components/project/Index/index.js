'use client';

import LinkWithArrow from "@/components/ui/Link";
import styles from "./index.module.css";
import { motion, AnimatePresence } from "framer-motion";
import TwoColumnLayout from "@/components/layouts/TwoColumnLayout";
import { useEffect, useState } from "react";
import Image from "next/image";

export default function Index({ onClose, projects }) {
    const [hoveredImage, setHoveredImage] = useState(null);

    useEffect(() => {
    if (projects && projects.length > 0) {
      setHoveredImage(projects[0].Media.ImageORCarousel[0].url);
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
    initial: { opacity: 0, scale: 0.99 }, // શરૂઆતની સ્થિતિ: પારદર્શક અને થોડી નાની
    animate: { opacity: 1, scale: 1, transition: { duration: 0.6, ease: "easeOut" } }, // દેખાય ત્યારે: અસ્પષ્ટ અને સામાન્ય સાઈઝ
    exit: { opacity: 0, scale: 0.99, transition: { duration: 0.4, ease: "easeIn" } } // નીકળે ત્યારે: પારદર્શક અને નાની
  };

  console.log('index project', projects)

  const leftContent = (
     <div className={styles.projectList}>
      {projects && projects.map((projectItem) => (
        <a
          key={projectItem.Slug}
          href={`/projects/${projectItem.Slug}`}
          className={styles.projectNameLink}
          onMouseEnter={() => setHoveredImage(projectItem.Media.ImageORCarousel[0].url)}
          onMouseLeave={() => {
            // if (projects && projects.length > 0) setHoveredImage(projects[0].Media.ImageORCarousel[0].url);
          }}
        >
          {projectItem.Name}
        </a>
      ))}
    </div>
  )

  const rightContent = (
    <div className={styles.projectImageContainer}>
        <AnimatePresence mode="wait">
{hoveredImage ? (
        <motion.div
          key={hoveredImage}
          variants={imageVariants}
          initial={"initial"}
          animate={"animate"}
          exit="exit"
          className={styles.projectImageWrapper}
        >
          <Image
            src={hoveredImage}
            alt="Project Image"
            width={431}
            height={627}
          />
        </motion.div>
      ) : (
        <motion.p
            key="placeholder" // placeholder માટે પણ એક key આપો
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
  )

  return (
    <motion.div
      variants={indexVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className={styles.indexWrapper}
    >
      <button onClick={onClose}>Back</button>
      <TwoColumnLayout left={leftContent} right={rightContent} showDivider />
    </motion.div>
  );
}
