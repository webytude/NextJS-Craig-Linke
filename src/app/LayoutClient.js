'use client';

import React from 'react'
import dynamic from 'next/dynamic'
import ApolloWrapper from './ApolloWrapper'
import Header from '@/components/common/Header'
import BodyTheme from '@/components/layouts/BodyTheme'
import { usePathname } from 'next/navigation'

/*
 * Intro loading animation disabled at the client's request.
 *
 * To restore it, re-enable useState, the Loader and Framer Motion imports, the loader
 * state/effects/handlers below, and wrap the active ApolloWrapper markup with
 * the Loader/motion markup retained at the bottom of this file.
 *
 * import React, { useEffect, useState } from 'react';
 * import Loader from '@/components/Loader';
 * import { motion } from 'framer-motion';
 */

const Footer = dynamic(() => import('@/components/common/Footer'), {
  ssr: true,
  loading: () => null,
});

export default function LayoutClient({ children, globalData }) {
  const pathname = usePathname();

  /*
  const [showLoader, setShowLoader] = useState(true);
  const [loaderExitStarted, setLoaderExitStarted] = useState(false);
  const [loaderAnimationComplete, setLoaderAnimationComplete] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);
  const [isAnimationComplete, setIsAnimationComplete] = useState(!showLoader);
  */

  const isAestheticsPage = pathname?.startsWith('/aesthetics-details');

  /*
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
  */

  return (
      <ApolloWrapper>
        <BodyTheme />
        {!isAestheticsPage && <Header globalData={globalData} />}
        <main>{children}</main>
        <Footer hideOnMobile={isAestheticsPage ? 'hide-desktop' : ''} globalData={globalData} />
      </ApolloWrapper>
  )
}

/*
 * Disabled intro render:
 *
 * <>
 *   {showLoader && (
 *     <Loader
 *       onExitStart={handleLoaderExitStart}
 *       onExitComplete={handleLoaderExitComplete}
 *     />
 *   )}
 *   <motion.div
 *     initial={{ y: showLoader ? '100%' : 0 }}
 *     animate={{ y: 0 }}
 *     transition={{
 *       delay: showLoader ? 2.3 : 0,
 *       duration: showLoader ? 4 : 0,
 *       ease: [0.76, 0, 0.24, 1]
 *     }}
 *   >
 *     <ApolloWrapper>
        <BodyTheme />
        {!isAestheticsPage && <Header globalData={globalData} />}
        <main>{children}</main>
        <Footer hideOnMobile={isAestheticsPage ? 'hide-desktop' : ''} globalData={globalData} />
      </ApolloWrapper>
 *   </motion.div>
 * </>
 */
