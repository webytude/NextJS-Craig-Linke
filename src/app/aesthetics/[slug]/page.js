"use client";

import { ASTHETICS_QUERY_SLUG } from "@/queries/queries";
import { useQuery } from "@apollo/client/react";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { motion, useMotionValue, animate } from "framer-motion";
import styles from "../aesthetics.module.css";
import Paragraph from "@/components/ui/Paragraph";
import Loading from "@/components/common/Loading";
import PageNotFound from "@/app/PageNotFound";
import { useParams, useRouter } from "next/navigation";
import BlockRenderer from "@/components/layouts/BlockRenderer";
import { BlocksRenderer } from "@strapi/blocks-react-renderer";
import Image from "next/image";
import Heading from "@/components/ui/Heading";
import LinkWithArrow from "@/components/ui/Link";

export default function AestheticsDetail() {
  const router = useRouter();
  const params = useParams();

  const currentSlug = params?.slug;

  const containerRef = useRef(null);
  const x = useMotionValue(0);
  const [screenWidth, setScreenWidth] = useState(0);
  const [showNav, setShowNav] = useState(true);
  const sections = ["home", "about", "services", "contact"];
  const animationRef = useRef(null);

  const { data, loading, error } = useQuery(ASTHETICS_QUERY_SLUG, {
    fetchPolicy: "cache-first",
    notifyOnNetworkStatusChange: true,
  });

  const astheticsData = data?.astheticsDetails || [];
  const targetSlug = currentSlug || "new-heritage";
  const activeData = astheticsData.find((item) => item.Slug === targetSlug);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const updateWidth = () => setScreenWidth(window.innerWidth);
      updateWidth();
      window.addEventListener("resize", updateWidth);
      return () => window.removeEventListener("resize", updateWidth);
    }
  }, []);

  const maxDrag = screenWidth * (activeData?.Blocks.length - 1);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const handleWheel = (e) => {
      e.preventDefault();
      const delta = -e.deltaY;
      const current = x.get();
      const next = current + delta;

      x.set(Math.max(-maxDrag, Math.min(0, next)));
    };

    el.addEventListener("wheel", handleWheel, { passive: false });
    return () => el.removeEventListener("wheel", handleWheel);
  }, [x, maxDrag]);

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

  if (loading) return <Loading />;
  if (error) return <p>Error loading data</p>;
  if (!astheticsData) return <PageNotFound />;

  console.log("activeData", activeData);

  return (
    <div className={styles.wrapper}>
      {/* {showNav && (
        <nav className={styles.navbar}>
          <ul>
            {sections.map((s, i) => (
              <li key={s} onClick={() => scrollToSection(i)}>
                {s.charAt(0).toUpperCase() + s.slice(1)}
              </li>
            ))}
          </ul>
        </nav>
      )} */}

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
          <div className={styles.content}>
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
                <Link href="#">
                  <span className={styles.icon}>( )</span>
                  <span className={styles.label}>NEW HERITAGE</span>
                </Link>
                <Link href="#">
                  <span className={styles.icon}>( )</span>
                  <span className={styles.label}>TAILORED AESTHETIC </span>
                </Link>
                <Link href="#">
                  <span className={styles.icon}>( )</span>
                  <span className={styles.label}>CONTEMPORARY CLASSIC</span>
                </Link>
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
          </div>
        </section>
        {activeData.Blocks.map((block, index) => (
          <section key={index} className={`${styles.section}`}>
            <BlockRenderer block={block} />
          </section>
        ))}
      </motion.div>
    </div>
  );
}
