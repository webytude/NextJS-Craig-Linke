"use client";

import { ASTHETICS_QUERY_SLUG, GLOBAL_QUERY } from "@/queries/queries";
import { useQuery } from "@apollo/client/react";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  motion,
  useMotionValue,
  animate,
  AnimatePresence,
} from "framer-motion";
import styles from "../aesthetics.module.css";
import Paragraph from "@/components/ui/Paragraph";
import Loading from "@/components/common/Loading";
import PageNotFound from "@/app/PageNotFound";
import { useParams, usePathname, useRouter } from "next/navigation";
import BlockRenderer from "@/components/layouts/BlockRenderer";
import { BlocksRenderer } from "@strapi/blocks-react-renderer";
import Image from "next/image";
import Heading from "@/components/ui/Heading";
import LinkWithArrow from "@/components/ui/Link";
import Header from "@/components/common/Header";
import FadeUp from "@/components/ui/animations/FadeUp";

export default function AestheticsClient({ asthetics }) {
  const params = useParams();
  const pathname = usePathname();
  const currentSlug = params?.slug;
  const containerRef = useRef(null);
  const x = useMotionValue(0);
  const [screenWidth, setScreenWidth] = useState(0);
  const [displayData, setDisplayData] = useState(null);
  const [incomingData, setIncomingData] = useState(null);
  const [showInnerContent, setShowInnerContent] = useState(false);
  const [maxDrag, setMaxDrag] = useState(0);
  const oldRef = useRef(null);
  const newRef = useRef(null);


  const activeData = asthetics.find((p) => p.Slug === currentSlug);

  useEffect(() => {
    if (!incomingData) return;

    setShowInnerContent(false);

    const t = setTimeout(() => {
      setShowInnerContent(true);
    }, 300);

    return () => clearTimeout(t);
  }, [incomingData]);

  useEffect(() => {
    if (activeData && !displayData) {
      setDisplayData(activeData);
    }
  }, [activeData]);

  useEffect(() => {
    if (!activeData) return;

    setIncomingData(activeData);

    const timer = setTimeout(() => {
      setDisplayData(activeData);
      setIncomingData(null);
    }, 800);

    return () => clearTimeout(timer);
  }, [activeData]);

  const renderContent = (activeData, isIncoming = false) => {
    const isMobile = screenWidth < 768;

    return (
      <>
        <motion.div
          ref={containerRef}
          className={`${styles.container} aesthetics-container`}
          drag={isMobile ? false : "x"}
          dragConstraints={{ left: -maxDrag, right: 0 }}
          style={isMobile ? {} : { x }}
        >
          <section
            className={`${styles.one}`}
            style={{
              width: "100vw",
              flexShrink: "0",
              justifyContent: "center",
              alignItems: "center",
              height: "100vh",
              display: "flex",
              position: "relative",
            }}
          >
            <div className={styles.backgroundWrapper} style={{ overflow: 'hidden' }}>
              <motion.div 
               style={{ width: "100%", height: "100%" }}
               initial={isIncoming ? { y: "100%" } : { y: "0%" }} 
               animate={{ y: "0%" }}
               transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
            >
              {activeData?.DesktopMedia.EnableMuxVideo &&
                activeData?.DesktopMedia.MuxVideo?.playback_id && (
                  <MuxPlayer
                    playbackId={activeData?.DesktopMedia.MuxVideo.playback_id}
                    streamType="on-demand"
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="auto"
                    style={{
                      aspectRatio: "16 / 9",
                      width: "100%",
                      height: "100%",
                    }}
                  />
                )}
              {!activeData?.DesktopMedia?.EnableMuxVideo &&
                Array.isArray(activeData?.DesktopMedia?.ImageORCarousel) &&
                activeData?.DesktopMedia.ImageORCarousel.length === 1 && (
                  <Image
                    src={activeData?.DesktopMedia.ImageORCarousel[0]?.url}
                    alt={
                      activeData?.DesktopMedia.ImageORCarousel[0]
                        ?.alternativeText || ""
                    }
                    width={1905}
                    height={1271}
                    className={styles.mainMedia}
                  />
                )}
                </motion.div>
            </div>
            <div className={styles.overlay}></div>
            <motion.div
              className={styles.content}
            >
              <div className={`${styles.child} ${styles.bottomLeft}`}>
                  <div className={`${styles.navItem}`}>
                    {asthetics.map((item) => {
                      const isActive = pathname === `/aesthetics/${item.Slug}`;
                      return (
                        <Link
                          key={item.Slug}
                          href={item.Slug}
                          className={isActive ? "activeLink" : "normalLink"}
                        >
                          <span className={styles.icon}>
                            {isActive ? "(•)" : "( )"}
                          </span>
                          <span className={styles.label}>{item.Name}</span>
                        </Link>
                      );
                    })}
                  </div>
              </div>
            </motion.div>
          </section>
        </motion.div>
      </>
    );
  };

  return (
    <div className={styles.wrapper}>
      <AnimatePresence mode="popLayout">
        {displayData && (
          <motion.div
            key="old-content"
            ref={oldRef}
            className={styles.content}
          >
            {renderContent(displayData, false)}
          </motion.div>
        )}

        {incomingData && (
          <motion.div
            key="new-content"
            ref={newRef}
            className={styles.content}
          >
            {renderContent(incomingData, true)}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
