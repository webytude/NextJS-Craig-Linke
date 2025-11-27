"use client";

import { ASTHETICS_QUERY_SLUG } from "@/queries/queries";
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

export default function AestheticsDetail() {
  const router = useRouter();
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
  const [sectionWidth, setSectionWidth] = useState(0);
  const animationRef = useRef(null);
  const oldRef = useRef(null);
  const newRef = useRef(null);

  const { data, loading, error } = useQuery(ASTHETICS_QUERY_SLUG, {
    fetchPolicy: "cache-first",
    notifyOnNetworkStatusChange: true,
  });

  const astheticsData = data?.astheticsDetails || [];
  const targetSlug = currentSlug || "new-heritage";
  const activeData = astheticsData.find((item) => item.Slug === targetSlug);

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
    if (!containerRef.current) return;
    
    const firstSection = containerRef.current.querySelector(`.${styles.section}`);
    if (firstSection) {
      setSectionWidth(firstSection.offsetWidth);
    }

    const handleResize = () => {
      if (!firstSection) return;
      setSectionWidth(firstSection.offsetWidth);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const updateWidth = () => setScreenWidth(window.innerWidth);
      updateWidth();
      window.addEventListener("resize", updateWidth);
      return () => window.removeEventListener("resize", updateWidth);
    }
  }, []);

  useEffect(() => {
  const measure = () => {
    const el = incomingData ? newRef.current : oldRef.current;
    if (!el) return;

    const firstSection = el.querySelector(`.${styles.section}`);
    if (firstSection) {
      setSectionWidth(firstSection.offsetWidth);
    }
  };

  measure();
  window.addEventListener("resize", measure);
  return () => window.removeEventListener("resize", measure);
}, [incomingData]);

  const maxDrag = screenWidth * (displayData?.Blocks?.length || 1);

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

  return () => activeEl.removeEventListener("wheel", handleWheel);
}, [incomingData, maxDrag]);

  useEffect(() => {
    const unsubscribe = x.on("change", (value) => {
      setShowNav(value > -screenWidth * 0.3);
    });
    return () => unsubscribe();
  }, [x, screenWidth]);

  const scrollToSection = (index) => {
    const target = -index * screenWidth;

    if (animationRef.current) animationRef.current.stop();

    animationRef.current = animate(x, target, {
      type: "spring",
      stiffness: 120,
      damping: 20,
      onComplete: () => (animationRef.current = null),
    });
  };

  useEffect(() => {
    const finalTheme = "Malt";
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

  

  const renderContent = (activeData) => (
    <motion.div
      ref={containerRef}
      className={styles.container}
      drag="x"
      dragConstraints={{ left: -maxDrag, right: 0 }}
      style={{ x }}
    >
      <section className={`${styles.section} ${styles.one}`}>
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
          <div className={`${styles.child} ${styles.topLeft}`}>
            <ul className={styles.topNav}>
              <li>
                <Link href={"#"}>OVERVIEW</Link>
              </li>
              <li>
                <Link href={"#"}>MATERIAL APPROACH</Link>
              </li>
              <li>
                <Link href={"#"}>COLOURS AND TONES</Link>
              </li>
              <li>
                <Link href={"#"}>RELATED AESTHETICS </Link>
              </li>
            </ul>
          </div>
          <div className={`${styles.child} ${styles.topRight}`}>
            <Paragraph>
              <BlocksRenderer content={activeData.Description || []} />
            </Paragraph>
          </div>
          <div className={`${styles.child} ${styles.bottomLeft}`}>
            <div className={`${styles.navItem}`}>
              {astheticsData.map((item) => {
                const isActive = pathname === `/aesthetics/${item.Slug}`;
                return (
                  <Link
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
          <div className={`${styles.child} ${styles.bottomRight}`}>
            <LinkWithArrow text={"SCROLL"} href={"#"} />
          </div>
          <div className={`${styles.child} ${styles.center}`}>
            <Heading level={1} className={styles.mainHeading}>
              {activeData.Name}
            </Heading>
          </div>
        </motion.div>
      </section>
      {activeData.Blocks.map((block, index) => (
        // <section key={index} className={`${styles.section} media-section`}>
          <BlockRenderer key={index} block={block} />
        // </section>
      ))}
    </motion.div>
  );

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
            style={{
              position: "absolute",
              width: "100%",
              height: "100%",
              top: 0,
              left: 0,
            }}
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
            style={{
              position: "absolute",
              width: "100%",
              height: "100%",
              top: 0,
              left: 0,
            }}
          >
            {renderContent(incomingData)}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
