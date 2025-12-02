"use client";

import { useEffect } from "react";
import BlockRenderer from "./layouts/BlockRenderer";

const generateId = (text) => text?.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '') || "";

export default function UniversalPageClient({ data, defaultTheme }) {
  
  useEffect(() => {
    const finalTheme = data?.ThemeColor || defaultTheme || "default-theme";
    window.__PAGE_THEME_COLOR__ = finalTheme;
    window.dispatchEvent(new Event("theme-change"));
  }, [data?.ThemeColor, defaultTheme]);

  if (!data) return null;

  const quickViewLinks = data.Blocks
    ?.filter(block => block.ShowInQuickView === true && block.Title)
    .map(block => ({
      label: block.Title,
      id: generateId(block.Title)
    })) || [];

  return (
    <>
      {data.Blocks?.map((block, index) => (
        <BlockRenderer 
            key={index} 
            block={block} 
            quickViewLinks={quickViewLinks} 
            blockId={block.ShowInQuickView ? generateId(block.Title) : null} 
        />
      ))}
    </>
  );
}