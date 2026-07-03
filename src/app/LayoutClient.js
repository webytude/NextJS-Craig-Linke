'use client';

import React from 'react'
import ApolloWrapper from './ApolloWrapper'
import Header from '@/components/common/Header'
import Footer from '@/components/common/Footer'
import BodyTheme from '@/components/layouts/BodyTheme'
import { usePathname } from 'next/navigation';

export default function LayoutClient({ children, globalData }) {
  const pathname = usePathname();

  const isAestheticsPage = pathname?.startsWith('/aesthetics-details');

  return (
    <>
      <ApolloWrapper>
        <BodyTheme />
        {!isAestheticsPage && <Header globalData={globalData} />}
        <main>{children}</main>
        <Footer hideOnMobile={isAestheticsPage ? 'hide-desktop' : ''} globalData={globalData} />
      </ApolloWrapper>
    </>
  )
}
