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

export default function AestheticsDetail() {
  // const router = useRouter();
  const params = useParams();
  const pathname = usePathname();

  const currentSlug = params?.slug;

  const containerRef = useRef(null);
  const x = useMotionValue(0);
  const [screenWidth, setScreenWidth] = useState(0);
  const [showNav, setShowNav] = useState(true);
  const sections = ["home", "about", "services", "contact"];
  const [displayData, setDisplayData] = useState(null);
  const [incomingData, setIncomingData] = useState(null);
  const [showInnerContent, setShowInnerContent] = useState(false);
  const [maxDrag, setMaxDrag] = useState(0);
  const animationRef = useRef(null);
  const oldRef = useRef(null);
  const newRef = useRef(null);

  // const isMobile = screenWidth < 768;

  const { data, loading, error } = useQuery(ASTHETICS_QUERY_SLUG, {
    fetchPolicy: "cache-first",
    notifyOnNetworkStatusChange: true,
  });

  const headerData = useQuery(GLOBAL_QUERY, {
    fetchPolicy: "cache-first",
    notifyOnNetworkStatusChange: true,
  });

  const astheticsData = data?.astheticsDetails || [];
  const targetSlug = currentSlug || "new-heritage";
  const activeData = astheticsData.find((item) => item.Slug === targetSlug);
  const globalData = headerData?.data?.global;

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
    if (typeof window !== "undefined") {
      const updateWidth = () => setScreenWidth(window.innerWidth);
      updateWidth();
      window.addEventListener("resize", updateWidth);
      return () => window.removeEventListener("resize", updateWidth);
    }
  }, []);

  useEffect(() => {
    const activeElWrapper = incomingData ? newRef.current : oldRef.current;
    if (!activeElWrapper) return;
    const scrollContainer = activeElWrapper.querySelector(
      `.${styles.container}`
    );

    if (scrollContainer) {
      const calculatedMaxDrag = scrollContainer.scrollWidth - window.innerWidth;
      setMaxDrag(Math.max(0, calculatedMaxDrag));
    }
  }, [incomingData, activeData, screenWidth]);

  // const maxDrag = screenWidth * activeData?.Blocks.length;

  // useEffect(() => {
  //   const el = containerRef.current;
  //   if (!el) return;

  //   const handleWheel = (e) => {
  //     e.preventDefault();
  //     const delta = -e.deltaY;
  //     const current = x.get();
  //     const next = current + delta;

  //     x.set(Math.max(-maxDrag, Math.min(0, next)));
  //   };

  //   el.addEventListener("wheel", handleWheel, { passive: false });
  //   return () => el.removeEventListener("wheel", handleWheel);
  // }, [x, maxDrag]);

  useEffect(() => {
    if (screenWidth < 768) return;
    const activeEl = incomingData ? newRef.current : oldRef.current;
    if (!activeEl) return;

    const handleWheel = (e) => {
      e.preventDefault();
      const delta = -e.deltaY;
      const current = x.get();
      const next = current + delta;
      x.set(Math.max(-maxDrag, Math.min(0, next)));
    };

    activeEl.addEventListener("wheel", handleWheel, { passive: false });

    return () => {
      activeEl.removeEventListener("wheel", handleWheel);
    };
  }, [incomingData, maxDrag, x]);

  useEffect(() => {
    const unsubscribe = x.on("change", (value) => {
      setShowNav(value > -screenWidth * 0.3);
    });
    return () => unsubscribe();
  }, [x, screenWidth]);

  const scrollToSection = (blockIndex) => {
    const activeElWrapper = incomingData ? newRef.current : oldRef.current;
    if (!activeElWrapper) return;

    const scrollContainer = activeElWrapper.querySelector(`.${styles.container}`);
    if (!scrollContainer) return;

    const sections = scrollContainer.children;
    
    const targetSection = sections[blockIndex + 1];

    if (targetSection) {
      if (screenWidth < 768) {
        targetSection.scrollIntoView({ behavior: 'smooth', inline: 'start' });
      } else {
        const targetPosition = -targetSection.offsetLeft;

        if (animationRef.current) animationRef.current.stop();

        animationRef.current = animate(x, targetPosition, {
          type: "spring",
          stiffness: 60,
          damping: 20,
          onComplete: () => (animationRef.current = null),
        });
      }
    }
  };

  useEffect(() => {
    const finalTheme = "Malt page-aesthetics";
    window.__PAGE_THEME_COLOR__ = finalTheme;
    window.dispatchEvent(new Event("theme-change"));
  }, []);

  useEffect(() => {
    if (!activeData) return;

    setIncomingData(activeData);

    const timer = setTimeout(() => {
      setDisplayData(activeData);
      setIncomingData(null);
    }, 800);

    return () => clearTimeout(timer);
  }, [activeData]);

  if (loading) return <Loading />;
  if (error) return <p>Error loading data</p>;

  const renderContent = (activeData) => {
    const isMobile = screenWidth < 768;

    return (
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
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: showInnerContent ? 1 : 0 }}
            transition={{ duration: 0.5 }}
            className={styles.header}
            onPointerDownCapture={(e) => e.stopPropagation()}
          >
            <Header globalData={globalData} />
          </motion.div>

          <div className={styles.backgroundWrapper}>
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
          </div>
          <div className={styles.overlay}></div>
          <motion.div
            className={styles.content}
            initial={{ opacity: 0 }}
            animate={{ opacity: showInnerContent ? 1 : 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className={`${styles.child} ${styles.topLeft} hide-mobile`}>
              <FadeUp>
              <ul className={styles.topNav}>
                {activeData.Blocks.map((item, index) => {
                  if (item.ShowInQuickView && item.Title) {
                    return (
                      <li key={item.id || index}>
                        <Link href={"#"} 
                          onClick={(e) => {
                            e.preventDefault();
                            scrollToSection(index);
                          }}>{item.Title}</Link>
                      </li>
                    );
                  }
                  return null;
                })}
              </ul>
              </FadeUp>
            </div>
            <div className={`${styles.child} ${styles.topRight}`}>
              <FadeUp>
              <Paragraph>
                <BlocksRenderer content={activeData.Description || []} />
              </Paragraph>
              </FadeUp>
            </div>
            <div className={`${styles.child} ${styles.bottomLeft}`}>
              <FadeUp>
              <div className={`${styles.navItem}`}>
                {astheticsData.map((item) => {
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
              </FadeUp>
            </div>
            <div
              className={`${styles.child} ${styles.bottomRight} hide-mobile`}
            >
              <LinkWithArrow text={"SCROLL"} href={"#"} />
            </div>
            <div className={`${styles.child} ${styles.center}`}>
              <FadeUp>
              <Heading level={1} className={styles.mainHeading}>
                {activeData.Name}
              </Heading>
              </FadeUp>
            </div>
          </motion.div>
        </section>
        {activeData.Blocks.map((block, index) => (
          <section key={index}>
            <div className={`${styles.headerSpacer} hide-mobile`} />
            <BlockRenderer key={index} block={block} />
          </section>
        ))}
      </motion.div>
    );
  };

  return (
    <div className={styles.wrapper}>
      <AnimatePresence>
        {displayData && (
          <motion.div
            key="old-content"
            ref={oldRef}
            initial={false}
            animate={{ opacity: incomingData ? 1 : 1 }}
            exit={{ opacity: 0 }}
            className={styles.content}
          >
            {renderContent(displayData)}
          </motion.div>
        )}

        {incomingData && (
          <motion.div
            key="new-content"
            ref={newRef}
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className={styles.content}
          >
            {renderContent(incomingData)}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
