import React from 'react'
import ApolloWrapper from './ApolloWrapper'
import Header from '@/components/common/Header'
import Footer from '@/components/common/Footer'
import BodyTheme from '@/components/layouts/BodyTheme'

export default function LayoutClient({ children, globalData }) {
  return (
    <ApolloWrapper>
      <BodyTheme />
      <Header globalData={globalData} />
      <main>{children}</main>
      <Footer globalData={globalData} />
    </ApolloWrapper>
  )
}
