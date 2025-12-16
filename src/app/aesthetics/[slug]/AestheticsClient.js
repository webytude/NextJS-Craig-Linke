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
  useTransform,
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
import { useAestheticsScroll } from "@/context/AestheticsContext";
import Fade from "@/components/ui/animations/Fade";

export default function AestheticsClient({ asthetics }) {
  const params = useParams();
  const pathname = usePathname();
  const currentSlug = params?.slug;

  const wrapperRef = useRef(null); 
  const containerRef = useRef(null);

  const x = useAestheticsScroll();

  const animationRef = useRef(null);

  const [screenWidth, setScreenWidth] = useState(0);
  const [maxDrag, setMaxDrag] = useState(0);
  const [showNav, setShowNav] = useState(true);

  // const [bgRange, setBgRange] = useState([0, 0]);
  // const [hasRelatedBlock, setHasRelatedBlock] = useState(false);

  const activeData = asthetics.find((p) => p.Slug === currentSlug);

  useEffect(() => {
    x.set(0);
  }, [currentSlug, x]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const updateWidth = () => setScreenWidth(window.innerWidth);
      updateWidth();
      window.addEventListener("resize", updateWidth);
      return () => window.removeEventListener("resize", updateWidth);
    }
  }, []);

  useEffect(() => {
    if (!containerRef.current) return;

    const scrollContainer = containerRef.current;

    const calculatedMaxDrag = scrollContainer.scrollWidth - window.innerWidth;
    setMaxDrag(Math.max(0, calculatedMaxDrag));

    // const relatedIndex = activeData.Blocks.findIndex(
    //   (block) => block.__typename === "ComponentSectionRelatedAesthetics"
    // );

    // if (relatedIndex !== -1) {
    //    setHasRelatedBlock(true);

    //    const domSections = scrollContainer.children;
    //    console.log('domSections', domSections)

    //    const targetSection = domSections[relatedIndex + 1]; 
    //    console.log('targetSection', targetSection)

    //    if (targetSection) {
    //       const sectionLeft = targetSection.offsetLeft;
    //       console.log('sectionLeft', sectionLeft)

    //       const viewportW = window.innerWidth;
    //       console.log('viewportW', viewportW)

    //       const startPoint = -(sectionLeft - viewportW); 
    //       console.log('startPoint', startPoint)

    //       const endPoint = -(sectionLeft - (viewportW * 0.2)); 
    //       console.log('endPoint', endPoint)

    //       setBgRange([startPoint, endPoint]);
    //    }
    // } else {
    //   setHasRelatedBlock(false);
    // }

    x.set(0); 

  }, [activeData, screenWidth, x]);

  useEffect(() => {
    if (screenWidth < 768) return;

    const activeEl = wrapperRef.current;
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
  }, [maxDrag, x, screenWidth]);

  useEffect(() => {
    const unsubscribe = x.on("change", (value) => {
      setShowNav(value > -screenWidth * 0.3);
    });
    return () => unsubscribe();
  }, [x, screenWidth]);

  useEffect(() => {
    const finalTheme = "Malt page-aesthetics";
    window.__PAGE_THEME_COLOR__ = finalTheme;
    window.dispatchEvent(new Event("theme-change"));
  }, []);

   const scrollToSection = (blockIndex) => {
    if (!containerRef.current) return;

    const sections = containerRef.current.children;
    
    const targetSection = sections[blockIndex + 1];

    if (targetSection) {
      if (screenWidth < 768) {
        targetSection.scrollIntoView({ behavior: "smooth", inline: "start" });
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

  // const backgroundColor = useTransform(
  //   x,
  //   hasRelatedBlock ? bgRange : [0, 0],
  //   ["", "#6C5D50"]
  // );

  if (!activeData) return null;

  const isMobile = screenWidth < 768;

  return (
    <motion.div className={styles.wrapper} ref={wrapperRef}>
        <motion.div
          ref={containerRef}
          className={`${styles.container} aesthetics-container`}
          drag={isMobile ? false : "x"}
          dragConstraints={{ left: -maxDrag, right: 0 }}
          dragElastic={{ right: 0, left: 0.2 }}
          dragTransition={{ bounceStiffness: 600, bounceDamping: 20 }}
          style={isMobile ? {} : { x }}
        >
          <section
            className={`${styles.one}`}
            style={{
              width: "100vw",
              flexShrink: "0",
              justifyContent: "center",
              alignItems: "center",
              height: "calc(100vh - 53px)",
              display: "flex",
              position: "relative",
            }}
          >
            
            <motion.div
              className={styles.content}
            >
              <div className={`${styles.child} ${styles.topLeft} hide-mobile`}>
                  <Fade>
                  <ul className={styles.topNav}>
                    {activeData.Blocks.map((item, index) => {
                      if (item.ShowInQuickView && item.Title) {
                        return (
                          <li key={item.id || index}>
                            <Link
                              href={"#"}
                              onClick={(e) => {
                                e.preventDefault();
                                scrollToSection(index);
                              }}
                            >
                              {item.Title}
                            </Link>
                          </li>
                        );
                      }
                      return null;
                    })}
                  </ul>
                  </Fade>
              </div>
              <div className={`${styles.child} ${styles.topRight}`}>
                  <Fade>
                  <Paragraph>
                    <BlocksRenderer content={activeData.Description || []} />
                  </Paragraph>
                  </Fade>
              </div>
              <div
                className={`${styles.child} ${styles.bottomRight} hide-mobile`}
              >
                <LinkWithArrow text={"SCROLL"} href={"#"} />
              </div>
              <div className={`${styles.child} ${styles.center}`}>
                <Fade>
                  <Heading level={1} className={styles.mainHeading}>
                    {activeData.Name}
                  </Heading>
                  </Fade>
              </div>
            </motion.div>
          </section>
          {activeData.Blocks.map((block, index) => (
            <section key={index}>
              <BlockRenderer key={index} block={block} />
            </section>
          ))}
        </motion.div>
    </motion.div>
  );
}
