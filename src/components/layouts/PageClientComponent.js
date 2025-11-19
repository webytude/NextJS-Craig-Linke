'use client';

import React, { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import BlockRenderer from "./BlockRenderer";
import DefaultLayout from "./DefaultLayout";

export default function PageClientComponent({ page, heading }) {
  
  console.log("PAGE ", page);
  
  useEffect(() => {
    if (!page || !page.page_color) return;

    const body = document.body;
    const newClass = `bg-${page.page_color}`;

    body.classList.forEach((cls) => {
      if (cls.startsWith("bg-")) {
        body.classList.remove(cls);
      }
    });

    // Add the new class
    body.classList.add(newClass);

    return () => {
      body.classList.remove(newClass);
    };
  }, [page?.slug, page?.page_color, page]);

  const blocks = page.blocks || [];

  const renderContent = (
    <AnimatePresence mode="wait">
      <motion.div
        key={page.slug}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
      >
        {blocks.map((block, index) => {
          if (!block) return null;

          const id =
            'heading' in block && typeof block.heading === 'string'
              ? block.heading.toLowerCase().replace(/\s+/g, '-')
              : `section-${index}`;

          return (
            <section id={id} key={block.__typename + index} className="scroll-mt-24">
              {BlockRenderer(block)}
            </section>
          );
        })}
      </motion.div>
    </AnimatePresence>
  );

  return <DefaultLayout page={page}>{renderContent}</DefaultLayout>;
}
