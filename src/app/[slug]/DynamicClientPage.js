"use client";

import { useEffect } from "react";
import BlockRenderer from "@/components/layouts/BlockRenderer";
import Loading from "@/components/common/Loading";
import PageNotFound from "../PageNotFound";

export default function DynamicClientPage({ initialPageData, loading, error, slug }) {

  const page = !loading && !error ? initialPageData?.pages?.find(p => p.Slug === slug) : null;

  useEffect(() => {
    const finalTheme = page?.ThemeColor && page.ThemeColor.trim() !== ""
      ? page.ThemeColor
      : "default-theme";

    window.__PAGE_THEME_COLOR__ = finalTheme;
    window.dispatchEvent(new Event("theme-change"));
  }, [page?.ThemeColor]);

  if (loading) return <Loading />;
  if (error) return <p>Error loading data</p>;
  if (!page) return <PageNotFound />;

  return (
    <>
      {page.Blocks.map((block, index) => (
        <BlockRenderer key={index} block={block} />
      ))}
    </>
  );
}