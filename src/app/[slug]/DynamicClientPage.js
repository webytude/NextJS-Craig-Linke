"use client";

import { useEffect } from "react";
import BlockRenderer from "@/components/layouts/BlockRenderer";
import PageNotFound from "../PageNotFound";

const generateId = (text) => {
  if (!text) return "";
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");
};

export default function DynamicClientPage({ page }) {
  useEffect(() => {
    const finalTheme =
      page?.ThemeColor && page.ThemeColor.trim() !== ""
        ? page.ThemeColor
        : "default-theme";

    window.__PAGE_THEME_COLOR__ = finalTheme;
    window.dispatchEvent(new Event("theme-change"));
  }, [page?.ThemeColor]);

  if (!page) return <PageNotFound />;

  const quickViewLinks = page.Blocks.filter(
    (block) => block.ShowInQuickView === true && block.Title,
  ).map((block) => ({
    label: block.Title,
    id: generateId(block.Title),
  }));

  const H1_BLOCK_TYPES = new Set([
    'ComponentSectionHomeHero',
    'ComponentSectionAboutHero',
    'ComponentSectionContactHero',
    'ComponentSectionServices',
    'ComponentSectionNewContactHero',
    'ComponentSectionContentHeroModule',
  ]);
  const firstH1Index = page.Blocks.findIndex(b => H1_BLOCK_TYPES.has(b.__typename));

  return (
    <>
      {firstH1Index === -1 && (
        <h1 style={{position:'absolute',width:'1px',height:'1px',padding:0,margin:'-1px',overflow:'hidden',clip:'rect(0,0,0,0)',whiteSpace:'nowrap',border:0}}>
          {page.Name}
        </h1>
      )}
      {page.Blocks.map((block, index) => {
        const isFirstH1 = index === firstH1Index;
        return (
          <BlockRenderer
            key={index}
            block={block}
            quickViewLinks={quickViewLinks}
            blockId={block.ShowInQuickView === true ? generateId(block.Title) : null}
            isFirstH1={isFirstH1}
          />
        );
      })}
    </>
  );
}
