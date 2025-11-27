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

  // motion value
  const x = useMotionValue(0);

  // data + animation states
  const [displayData, setDisplayData] = useState(null);   // currently visible data (old)
  const [incomingData, setIncomingData] = useState(null); // new data being animated in
  const [showInnerContent, setShowInnerContent] = useState(false);

  // width / drag
  const [totalWidth, setTotalWidth] = useState(0); // sum of section widths for active container

  // refs: keep wrapper refs separate and container refs separate
  const oldWrapperRef = useRef(null);     // wrapper motion.div for old page
  const newWrapperRef = useRef(null);     // wrapper motion.div for new page
  const oldContainerRef = useRef(null);   // inner container that receives drag+x for old
  const newContainerRef = useRef(null);   // inner container that receives drag+x for new

  const animationRef = useRef(null);

  const { data, loading, error } = useQuery(ASTHETICS_QUERY_SLUG, {
    fetchPolicy: "cache-first",
    notifyOnNetworkStatusChange: true,
  });

  const astheticsData = data?.astheticsDetails || [];
  const targetSlug = currentSlug || "new-heritage";
  const activeData = astheticsData.find((item) => item.Slug === targetSlug);

  /* ------------------ content fade-in delay ------------------ */
  useEffect(() => {
    if (!incomingData) return;
    setShowInnerContent(false);
    const t = setTimeout(() => setShowInnerContent(true), 300);
    return () => clearTimeout(t);
  }, [incomingData]);

  /* ------------------ initial displayData ------------------ */
  useEffect(() => {
    if (activeData && !displayData) setDisplayData(activeData);
  }, [activeData]);

  /* ------------------ measure total width of visible container ------------------
     We measure from the active container (incoming ? newContainerRef : oldContainerRef)
     and sum offsetWidth of all elements having .section class inside it.
  -----------------------------------------------------------------------------*/
  useEffect(() => {
    const measure = () => {
      const container = incomingData ? newContainerRef.current : oldContainerRef.current;
      if (!container) {
        setTotalWidth(0);
        return;
      }
      const secs = container.querySelectorAll(`.${styles.section}`);
      if (!secs || !secs.length) {
        setTotalWidth(0);
        return;
      }
      let sum = 0;
      secs.forEach((s) => {
        sum += s.offsetWidth;
      });
      setTotalWidth(sum);
      // Also clamp x into new bounds immediately when sizes change:
      const viewport = typeof window !== "undefined" ? window.innerWidth : 0;
      const minX = Math.min(0, viewport - sum); // negative or 0
      // clamp current value
      const cur = x.get();
      if (cur < minX) x.set(minX);
      if (cur > 0) x.set(0);
    };

    // measure on mount and when incoming/displayData changes
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [incomingData, displayData]); // re-run when active slides change

  /* ------------------ compute maxDrag / constraints ------------------
     Framer expects dragConstraints object where left is negative (min) and right is 0 (max)
     We compute minX = viewportWidth - totalWidth (<= 0). If totalWidth <= viewportWidth, minX = 0 (no drag).
  ------------------------------------------------------------------*/
  const viewportWidth = typeof window !== "undefined" ? window.innerWidth : 0;
  const minX = Math.min(0, viewportWidth - (totalWidth || 0)); // negative value or 0

  /* ------------------ wheel handler attached to active wrapper ------------------ */
  useEffect(() => {
    const activeWrapper = incomingData ? newWrapperRef.current : oldWrapperRef.current;
    if (!activeWrapper) return;

    const handleWheel = (e) => {
      // only horizontal-style scroll: use deltaY to move x
      e.preventDefault();
      const delta = -e.deltaY; // invert as you want
      const cur = x.get();
      const next = cur + delta;
      // clamp between minX and 0
      const clamped = Math.max(minX, Math.min(0, next));
      x.set(clamped);
    };

    activeWrapper.addEventListener("wheel", handleWheel, { passive: false });
    return () => activeWrapper.removeEventListener("wheel", handleWheel);
  }, [incomingData, minX]);

  /* ------------------ keep nav state (example) ------------------ */
  useEffect(() => {
    const unsub = x.on("change", (v) => {
      // whatever you used earlier; we keep behavior
      // setShowNav(v > -viewportWidth * 0.3) // if you have showNav state
    });
    return () => unsub();
  }, [x, viewportWidth]);

  /* ------------------ scrollToSection using animate() ------------------ */
  const scrollToSection = (index) => {
    const target = -index * viewportWidth; // if you want to snap to full viewport increments
    if (animationRef.current) animationRef.current.stop();
    animationRef.current = animate(x, target, {
      type: "spring",
      stiffness: 120,
      damping: 20,
      onComplete: () => (animationRef.current = null),
    });
  };

  /* ------------------ theme (unchanged) ------------------ */
  useEffect(() => {
    const finalTheme = "Malt";
    window.__PAGE_THEME_COLOR__ = finalTheme;
    window.dispatchEvent(new Event("theme-change"));
  }, []);

  /* ------------------ handle activeData change -> incoming animation ------------------ */
  useEffect(() => {
    if (!activeData) return;
    setIncomingData(activeData);

    const t = setTimeout(() => {
      setDisplayData(activeData);
      setIncomingData(null);
      // when animation ends, optionally reset x to 0 so new page starts at leftmost
      // x.set(0);
    }, 800); // matches your slide-up duration
    return () => clearTimeout(t);
  }, [activeData]);

  if (loading) return <Loading />;
  if (error) return <p>Error loading data</p>;

  /* ------------------ slides rendering helper: returns only slide elements (no container wrapper) ------------------ */
  const renderSlides = (dataForSlides) => (
    <>
      {/* first main slide */}
      <section className={`${styles.section} ${styles.one}`}>
        <div className={styles.backgroundWrapper}>
          {dataForSlides?.DesktopMedia.EnableMuxVideo &&
            dataForSlides?.DesktopMedia.MuxVideo?.playback_id && (
              <MuxPlayer
                playbackId={dataForSlides?.DesktopMedia.MuxVideo.playback_id}
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

          {!dataForSlides?.DesktopMedia?.EnableMuxVideo &&
            Array.isArray(dataForSlides?.DesktopMedia?.ImageORCarousel) &&
            dataForSlides?.DesktopMedia.ImageORCarousel.length === 1 && (
              <Image
                src={dataForSlides?.DesktopMedia.ImageORCarousel[0]?.url}
                alt={
                  dataForSlides?.DesktopMedia.ImageORCarousel[0]
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
          transition={{ duration: 0.45 }}
        >
          <div className={`${styles.child} ${styles.topLeft}`}>
            <ul className={styles.topNav}>
              <li><Link href={"#"}>OVERVIEW</Link></li>
              <li><Link href={"#"}>MATERIAL APPROACH</Link></li>
              <li><Link href={"#"}>COLOURS AND TONES</Link></li>
              <li><Link href={"#"}>RELATED AESTHETICS </Link></li>
            </ul>
          </div>

          <div className={`${styles.child} ${styles.topRight}`}>
            <Paragraph>
              <BlocksRenderer content={dataForSlides.Description || []} />
            </Paragraph>
          </div>

          <div className={`${styles.child} ${styles.bottomLeft}`}>
            <div className={styles.navItem}>
              {astheticsData.map((item) => {
                const isActive = pathname === `/aesthetics/${item.Slug}`;
                return (
                  <Link key={item.Slug} href={item.Slug} className={isActive ? "activeLink" : "normalLink"}>
                    <span className={styles.icon}>{isActive ? "(•)" : "( )"}</span>
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
              {dataForSlides.Name}
            </Heading>
          </div>
        </motion.div>
      </section>

      {/* dynamic slides — each BlockRenderer must return a <section className={styles.section}> ... </section> */}
      {dataForSlides.Blocks.map((block, idx) => (
        <BlockRenderer key={idx} block={block} />
      ))}
    </>
  );

  /* ------------------ FINAL RETURN: wrapper layers + inner draggable container ------------------ */
  return (
    <div className={styles.wrapper}>
      <AnimatePresence>
        {/* OLD layer (kept visible until new finishes) */}
        {displayData && (
          <motion.div
            key="old-layer"
            ref={oldWrapperRef}
            initial={false}
            animate={{ opacity: incomingData ? 1 : 1 }}
            exit={{ opacity: 0 }}
            style={{ position: "absolute", inset: 0 }}
          >
            {/* container that receives drag & x for OLD layer */}
            <motion.div
              ref={oldContainerRef}
              className={styles.container}
              drag="x"
              dragConstraints={{ left: minX, right: 0 }}
              style={{ x }}
            >
              {renderSlides(displayData)}
            </motion.div>
          </motion.div>
        )}

        {/* NEW layer (slides up) */}
        {incomingData && (
          <motion.div
            key="new-layer"
            ref={newWrapperRef}
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            style={{ position: "absolute", inset: 0 }}
          >
            {/* container that receives drag & x for NEW layer */}
            <motion.div
              ref={newContainerRef}
              className={styles.container}
              drag="x"
              dragConstraints={{ left: minX, right: 0 }}
              style={{ x }}
            >
              {renderSlides(incomingData)}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}