"use client";

import { AnimatePresence, motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import styles from './loader.module.css';
import SplashScreen from './splashScreen';

const Loader = ({ onFinish }) => {
  const [loading, setLoading] = useState(false);
  const [exit, setExit] = useState(false);
  // const [showLoader, setShowLoader] = useState(false);

  // useEffect(() => {
  //   const hasSeenLoader = localStorage.getItem("hasSeenLoader");
  //   if (!hasSeenLoader) {
  //     setShowLoader(true);
  //     localStorage.setItem("hasSeenLoader", "true");

  //     setTimeout(() => {
  //       setLoading(true);
  //     }, 2000);

  //     setTimeout(() => {
  //       setShowLoader(false);
  //     }, 3400);
  //   }
  // }, [])

  // useEffect(() => {
  //   const timer = setTimeout(() => setLoading(true), 2000);
  //   return () => clearTimeout(timer);
  // }, []);

  useEffect(() => {
    const timer = setTimeout(() => setExit(true), 2000); // hold splash
    const done = setTimeout(() => onFinish(), 3200); // 2s splash + 1.2s exit
    return () => {
      clearTimeout(timer);
      clearTimeout(done);
    };
  }, [onFinish]);

  return (
    <>
    {/* <div className={styles.mainWrapper}> */}
      {/* === Loader Screen === */}
    <AnimatePresence>
    {/* {showLoader && (
    <div className={styles.loaderWrapper}> */}
      <motion.div
        key="loader"
        initial={{ y: 0 }}
        animate={{ y: exit ? "-100%" : 0 }}
        exit={{ y: "-100%" }}
        transition={{
          duration: 1.2,
          ease: [0.83, 0, 0.17, 1],
        }}
        className={styles.loaderContainer}
      >
        <SplashScreen />
      </motion.div>
    {/* </div>
    )} */}
    </AnimatePresence>

    {/* === Home Page === */}
    {/* <motion.div
      key="home"
        initial={{ y: showLoader ? "100%" : "0%" }}
        animate={{ y: showLoader && loading ? "0%" : "0%" }}
        transition={{
          duration: 1.2,
          ease: [0.83, 0, 0.17, 1],
        }}
      className={styles.homeWrapper}
    >
      {children}
    </motion.div>
    </div> */}
    </>
  );
};

export default Loader;