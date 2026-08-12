"use client";

import React from "react";
import dynamic from "next/dynamic";
import ApolloWrapper from "./ApolloWrapper";
import Header from "@/components/common/Header";
import BodyTheme from "@/components/layouts/BodyTheme";
import { usePathname } from "next/navigation";

const Footer = dynamic(() => import("@/components/common/Footer"), {
  ssr: true,
  loading: () => null,
});

export default function LayoutClient({ children, globalData }) {
  const pathname = usePathname();

  const isAestheticsPage = pathname?.startsWith("/aesthetics-details");

  return (
    <ApolloWrapper>
      <BodyTheme />
      {!isAestheticsPage && <Header globalData={globalData} />}
      <main>{children}</main>
      <Footer
        hideOnMobile={isAestheticsPage ? "hide-desktop" : ""}
        globalData={globalData}
      />
    </ApolloWrapper>
  );
}
