"use client";

import BlockRenderer from "@/components/layouts/BlockRenderer";
import { useEffect } from "react";

const generateId = (text) => {
  if (!text) return "";
  return text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
};

export default function JournalClient({ journal }) {
    useEffect(() => {
        const finalTheme = "Pinot";
        window.__PAGE_THEME_COLOR__ = finalTheme;
        window.dispatchEvent(new Event("theme-change"));
    }, []);

    if (!journal) return <p>Project not found.</p>;

    const quickViewLinks = journal.Blocks
    .filter(block => block.ShowInQuickView === true && block.Title)
    .map(block => ({
        label: block.Title,
        id: generateId(block.Title)
    }));

    return (
    <>
        {journal.Blocks.map((block, index) => (
            <BlockRenderer 
                key={index} 
                block={block} 
                quickViewLinks={quickViewLinks} 
                blockId={block.ShowInQuickView === true ? generateId(block.Title) : null} 
            />
        ))}
    </>
    );
}