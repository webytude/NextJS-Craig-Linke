'use client';

import React, { useEffect, useState } from 'react'
import ApolloWrapper from './ApolloWrapper'
import Header from '@/components/common/Header'
import Footer from '@/components/common/Footer'
import BodyTheme from '@/components/layouts/BodyTheme'
import Loader from '@/components/Loader';
import { usePathname } from 'next/navigation';

export default function LayoutClient({ children, globalData }) {
  const pathname = usePathname();
  const [showLoader, setShowLoader] = useState(true);
  const [loaderExitStarted, setLoaderExitStarted] = useState(false);
  const [loaderAnimationComplete, setLoaderAnimationComplete] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);

  const isAestheticsPage = pathname?.startsWith('/aesthetics');

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
      <div
        style={{
          transform: loaderExitStarted ? 'translateY(0%)' : 'translateY(100%)',
          transition: 'transform 1s cubic-bezier(0.83, 0, 0.17, 1)', 
          width: '100%',
          minHeight: '100vh',
        }}
      >
      <ApolloWrapper>
        <BodyTheme />
        {!isAestheticsPage && <Header globalData={globalData} />}
        <main>{children}</main>
        {!isAestheticsPage && <Footer globalData={globalData} />}
      </ApolloWrapper>
      </div>
    </>
  )
}
