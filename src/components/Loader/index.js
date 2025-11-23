"use client";

import { AnimatePresence, motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import styles from './loader.module.css';
import SplashScreen from './splashScreen';

const Loader = ({ onExitStart, onExitComplete }) => {
  const [triggerExit, setTriggerExit] = useState(false);

  useEffect(() => {
    const splashScreenAnimationDuration = 3000; 
    const delayBeforeExit = splashScreenAnimationDuration + 100;

    const exitTimer = setTimeout(() => {
      setTriggerExit(true);
      onExitStart();
    }, delayBeforeExit);

    return () => {
      clearTimeout(exitTimer);
    };
  }, [onExitStart]);

  return (
    <>
    <AnimatePresence
      onExitComplete={() => {
        console.log("Loader exit animation complete!");
        if (onExitComplete) {
          onExitComplete();
        }
      }}
    >
      {!triggerExit && ( 
        <motion.div
          key="loader"
          initial={{ y: 0 }}
          animate={{ y: 0 }}
          exit={{ y: "-100%" }} 
          transition={{
            duration: 1.2, 
            ease: [0.83, 0, 0.17, 1],
          }}
          className={styles.loaderContainer}
          style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100vh', zIndex: 1000 }}
        >
          <SplashScreen />
        </motion.div>
      )}
    </AnimatePresence>
    </>
  );
};

export default Loader;