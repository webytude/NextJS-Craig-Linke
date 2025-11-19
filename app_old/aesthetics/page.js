"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useMotionValue, animate } from "framer-motion";
import styles from "./aesthetics.module.css";

export default function Aesthetics() {
  const containerRef = useRef(null);
  const x = useMotionValue(0);
  const [screenWidth, setScreenWidth] = useState(0);
  const [showNav, setShowNav] = useState(true);
  const sections = ["home", "about", "services", "contact"];
  const animationRef = useRef(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const updateWidth = () => setScreenWidth(window.innerWidth);
      updateWidth();
      window.addEventListener("resize", updateWidth);
      return () => window.removeEventListener("resize", updateWidth);
    }
  }, []);

  const maxDrag = screenWidth * (sections.length - 1);

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

  return (
    <div className={styles.wrapper}>
      {showNav && (
        <nav className={styles.navbar}>
          <ul>
            {sections.map((s, i) => (
              <li key={s} onClick={() => scrollToSection(i)}>
                {s.charAt(0).toUpperCase() + s.slice(1)}
              </li>
            ))}
          </ul>
        </nav>
      )}

      <motion.div
        ref={containerRef}
        className={styles.container}
        drag="x"
        dragConstraints={{ left: -maxDrag, right: 0 }}
        style={{ x }}
      >
        <section className={`${styles.section} ${styles.one}`}>
          <h1>Home</h1>
        </section>

        <section className={`${styles.section} ${styles.two}`}>
          <h1>About</h1>
        </section>

        <section className={`${styles.section} ${styles.three}`}>
          <h1>Services</h1>
        </section>

        <section className={`${styles.section} ${styles.four}`}>
          <h1>Contact</h1>
        </section>
      </motion.div>
    </div>
  );
}
