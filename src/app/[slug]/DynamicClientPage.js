"use client";

import { useEffect } from "react";
import BlockRenderer from "@/components/layouts/BlockRenderer";
import PageNotFound from "../PageNotFound";

const generateId = (text) => {
  if (!text) return "";
  return text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
};

export default function DynamicClientPage({ page }) {

  useEffect(() => {
    const finalTheme = page?.ThemeColor && page.ThemeColor.trim() !== ""
      ? page.ThemeColor
      : "default-theme";

    window.__PAGE_THEME_COLOR__ = finalTheme;
    window.dispatchEvent(new Event("theme-change"));
  }, [page?.ThemeColor]);

  if (!page) return <PageNotFound />;

  const quickViewLinks = page.Blocks
  .filter(block => block.ShowInQuickView === true && block.Title)
  .map(block => ({
    label: block.Title,
    id: generateId(block.Title)
  }));

  return (
    <>
      {page.Blocks.map((block, index) => (
        <BlockRenderer key={index} block={block} quickViewLinks={quickViewLinks} blockId={block.ShowInQuickView === true ? generateId(block.Title) : null} />
      ))}
    </>
  );
}