"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import styles from "./AestheticsGlobalLayer.module.css";
import { useAestheticsNav, useAestheticsScroll } from "@/context/AestheticsContext";
import { useEffect, useRef, useState } from "react";
import LazyMuxPlayer from "@/components/common/LazyMuxPlayer";

export default function AestheticsGlobalLayer({ allAestheticsData }) {
  const pathname = usePathname();
  const currentSlug = pathname.split("/").pop();

  const { internalNav, setInternalNav } = useAestheticsNav();
  
  const activeData = allAestheticsData.find((item) => item.Slug === currentSlug);
  
  const x = useAestheticsScroll();
  
  const bgImage = activeData?.DesktopMedia?.ImageORCarousel?.[0]?.url;
  const isVideo = activeData?.DesktopMedia?.EnableMuxVideo;

  const [hoveredSlug, setHoveredSlug] = useState(null);
  const isFirstLoad = useRef(true);

  useEffect(() => {
    isFirstLoad.current = false;
  }, []);

  useEffect(() => {
    setInternalNav(false);
  }, []);

  return (
    <>
    <motion.div style={{ x }} className={styles.movableLayer}>
      <div className={styles.fixedBackground}>
        <AnimatePresence mode="popLayout">
          <motion.div
            key={currentSlug} 
            className={styles.imageWrapper}
            initial={{ y: internalNav ? "100%" : "0%" }} 
            animate={{ y: "0%" }} 
            exit={{ y: internalNav ? "-20%" : "0%", opacity: 0.5 }} 
            transition={{ duration: internalNav ? 0.5 : 0, ease: [0.76, 0, 0.24, 1] }}
          >
            {isVideo ? (
               <LazyMuxPlayer
                  playbackId={activeData?.DesktopMedia?.MuxVideo.playback_id}
                  streamType="on-demand"
                  autoPlay
                  muted
                  loop
                  playsInline
                  controls={false}
                  preload="none"
                  style={{ width: "100%", height: '100%', '--controls': 'none', '--media-object-fit': 'cover', '--media-object-position': 'center', objectFit: 'cover' }}
                />
            ) : (
              bgImage ? (<Image
                src={bgImage || ''}
                alt="Background"
                fill
                style={{ objectFit: "cover" }}
                sizes="100vw"
                loading="eager"
                fetchPriority="high"
                quality={75}
              />) : null
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
                <Link href={`/aesthetics-details/${item.Slug}`} onClick={() => setInternalNav(true)} className={showActiveStyle ? styles.activeLink : styles.link}>
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
