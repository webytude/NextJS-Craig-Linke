'use client';

import React, { useEffect, useState } from 'react'
import ApolloWrapper from './ApolloWrapper'
import Header from '@/components/common/Header'
import Footer from '@/components/common/Footer'
import BodyTheme from '@/components/layouts/BodyTheme'
import Loader from '@/components/Loader';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';

export default function LayoutClient({ children, globalData }) {
  const pathname = usePathname();
  const [showLoader, setShowLoader] = useState(true);
  const [loaderExitStarted, setLoaderExitStarted] = useState(false);
  const [loaderAnimationComplete, setLoaderAnimationComplete] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);
  const [isAnimationComplete, setIsAnimationComplete] = useState(!showLoader);

  const isAestheticsPage = pathname?.startsWith('/asthetics-details');

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
      {showLoader && (
        <Loader onExitStart={handleLoaderExitStart} onExitComplete={handleLoaderExitComplete} />
      )}
      {/* <Loader onExitStart={handleLoaderExitStart} onExitComplete={handleLoaderExitComplete} /> */}

      <motion.div
        // initial={{ y: showLoader ? '100%' : '0%' }}
        // animate={{ y: (showLoader && !loaderExitStarted) ? '100%' : '0%' }}
        // transition={{ duration: showLoader ? 1 : 0,  ease: [0.83, 0, 0.17, 1] }}
        // onAnimationComplete={() => {
        //   setIsAnimationComplete(true);
        // }}
        // style={{
        //   transform: isAnimationComplete ? 'none' : undefined,
        //   width: '100%',
        //   minHeight: '100vh'
        // }}
        initial={{ y: showLoader ? '100%' : 0 }}
        animate={{ 
           y: 0
        }}
        transition={{
          delay: showLoader ? 2.3 : 0,
          duration: showLoader ? 4 : 0,
          ease: [0.76, 0, 0.24, 1]
        }}
      >
      <ApolloWrapper>
        <BodyTheme />
        {!isAestheticsPage && <Header globalData={globalData} />}
        <main>{children}</main>
        {/* {!isAestheticsPage && <Footer globalData={globalData} />} */}
        <Footer hideOnMobile={isAestheticsPage ? 'hide-desktop' : ''} globalData={globalData} />
      </ApolloWrapper>
      </motion.div>
    </>
  )
}
