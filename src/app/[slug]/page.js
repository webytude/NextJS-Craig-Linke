"use client";

import { PAGES_QUERY } from "@/queries/queries";
import { useParams } from "next/navigation";
import BlockRenderer from "@/components/layouts/BlockRenderer";
import { useQuery } from "@apollo/client/react";
import { useEffect } from "react";
import Loading from "@/components/common/Loading";
import PageNotFound from "../PageNotFound";

const generateId = (text) => {
  if (!text) return "";
  return text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
};

export default function page() {
  const { slug } = useParams();
  const { data, loading, error } = useQuery(PAGES_QUERY);
  const page = !loading && !error ? data?.pages?.find(p => p.Slug === slug) : null;

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
  
  const quickViewLinks = page.Blocks
  .filter(block => block.ShowInQuickView === true && block.Title)
  .map(block => ({
    label: block.Title,
    id: generateId(block.Title)
  }));

  console.log('PAGE DATA', page)

    return (
    <>
      {page.Blocks.map((block, index) => (
        <BlockRenderer key={index} block={block} quickViewLinks={quickViewLinks} blockId={block.ShowInQuickView === true ? generateId(block.Title) : null} />
      ))}
    </>
  );
}

