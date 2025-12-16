"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import styles from "./AestheticsGlobalLayer.module.css";
import { useAestheticsScroll } from "@/context/AestheticsContext";
import { useEffect, useRef, useState } from "react";

export default function AestheticsGlobalLayer({ allAestheticsData }) {
  const pathname = usePathname();
  const currentSlug = pathname.split("/").pop();
  
  const activeData = allAestheticsData.find((item) => item.Slug === currentSlug);
  
  const x = useAestheticsScroll();
  
  const bgImage = activeData?.DesktopMedia?.ImageORCarousel?.[0]?.url || "";
  const isVideo = activeData?.DesktopMedia?.EnableMuxVideo;
  
  // const [isFirstLoad, setIsFirstLoad] = useState(true);
  const [hoveredSlug, setHoveredSlug] = useState(null);
  const isFirstLoad = useRef(true);

  useEffect(() => {
    // setIsFirstLoad(false);
    isFirstLoad.current = false;
  }, []);

  return (
    <>
    <motion.div style={{ x }} className={styles.movableLayer}>
      <div className={styles.fixedBackground}>
        <AnimatePresence mode="popLayout">
          <motion.div
            key={currentSlug} 
            className={styles.imageWrapper}
            initial={{ y: isFirstLoad.current ? "0%" : "100%" }} 
            animate={{ y: "0%" }} 
            exit={{ y: "-20%", opacity: 0.5 }} 
            transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
          >
            {isVideo ? (
               <div className={styles.placeholderVideo}>Video Component Here</div>
            ) : (
              <Image
                src={bgImage || ''}
                alt="Background"
                fill
                style={{ objectFit: "cover" }}
                priority
              />
            )}
            <div className={styles.overlay}></div>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className={styles.fixedNav}>
        <ul>
          {allAestheticsData.map((item) => {
            const isActive = currentSlug === item.Slug;
            const isHovered = hoveredSlug === item.Slug;
            const showActiveStyle = isActive || isHovered;
            return (
              <li key={item.Slug} onMouseEnter={() => setHoveredSlug(item.Slug)}
            onMouseLeave={() => setHoveredSlug(null)}>
                <Link href={`/aesthetics/${item.Slug}`} className={showActiveStyle ? styles.activeLink : styles.link}>
                  <span className={styles.icon}>{showActiveStyle ? "(•)" : "( )"}</span>
                  {item.Name}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
      </motion.div>
    </>
  );
}