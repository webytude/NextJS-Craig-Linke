'use client';

import React, { useEffect, useState } from 'react'
import ApolloWrapper from './ApolloWrapper'
import Header from '@/components/common/Header'
import Footer from '@/components/common/Footer'
import BodyTheme from '@/components/layouts/BodyTheme'
import Loader from '@/components/Loader';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
// import { getLenis } from "@/components/common/SmoothScrolling";

export default function LayoutClient({ children, globalData }) {
  const pathname = usePathname();
  const [showLoader, setShowLoader] = useState(true);
  const [loaderExitStarted, setLoaderExitStarted] = useState(false);
  const [loaderAnimationComplete, setLoaderAnimationComplete] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);
  const [isAnimationComplete, setIsAnimationComplete] = useState(!showLoader);

  const isAestheticsPage = pathname?.startsWith('/aesthetics-details');

  // useEffect(() => {
  //   const lenis = getLenis();

  //   if (!lenis) return;

  //   const timeout = setTimeout(() => {
  //     const hash = window.location.hash;

  //     if (hash) {
  //       const element = document.querySelector(hash);
  //       if (element) {
  //         lenis.scrollTo(element, { duration: 1.2 });
  //       }
  //     } else {
  //       lenis.scrollTo(0, { immediate: true });
  //     }
  //   }, 300);

  //   return () => clearTimeout(timeout);
  // }, [pathname, loaderExitStarted]);

  useEffect(() => {
    if (!loaderExitStarted) {
      setIsAnimationComplete(false);
    }
  }, [loaderExitStarted]);

  useEffect(() => {
     if (typeof window !== 'undefined') {
      const visitedBefore = localStorage.getItem('visitedBefore');
      if (visitedBefore) {
        setShowLoader(false);
       setLoaderExitStarted(true);
        setLoaderAnimationComplete(true);
      } else {
        localStorage.setItem('visitedBefore', 'true');
        setShowLoader(true);
      }
    }
    setIsInitialized(true); 
  }, []);

  const handleLoaderExitStart = () => {
    setLoaderExitStarted(true); 
  };

  const handleLoaderExitComplete = () => {
    setShowLoader(false); 
    setLoaderAnimationComplete(true); 
  };

  if (!isInitialized) {
    return null;
  }

  return (
    <>
      {/* {showLoader && (
        <Loader onExitStart={handleLoaderExitStart} onExitComplete={handleLoaderExitComplete} />
      )}

      <motion.div
        initial={{ y: showLoader ? '100%' : 0 }}
        animate={{ 
           y: 0
        }}
        transition={{
          delay: showLoader ? 2.3 : 0,
          duration: showLoader ? 4 : 0,
          ease: [0.76, 0, 0.24, 1]
        }}
      > */}
      <ApolloWrapper>
        <BodyTheme />
        {!isAestheticsPage && <Header globalData={globalData} />}
        <main>{children}</main>
        <Footer hideOnMobile={isAestheticsPage ? 'hide-desktop' : ''} globalData={globalData} />
      </ApolloWrapper>
      {/* </motion.div> */}
    </>
  )
}
