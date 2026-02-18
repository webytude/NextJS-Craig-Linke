"use client";

import { useEffect } from "react";
import Lenis from "lenis";

let lenisInstance = null;

export const getLenis = () => lenisInstance;

const SmoothScrolling = () => {
  useEffect(() => {
    lenisInstance = new Lenis({
      duration: 3,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    function raf(time) {
      lenisInstance.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenisInstance?.destroy();
      lenisInstance = null;
    };
  }, []);

  return null;
};

export default SmoothScrolling;