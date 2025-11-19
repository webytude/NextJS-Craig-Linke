'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function PageNotFound() {
  return (
    <AnimatePresence mode="wait">
      <motion.section
        key="button-section"
        className="relative h-screen bg-[#B6C380] flex items-center overflow-hidden button-section z-[9999] error-sec"
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 40 }}
        transition={{ duration: 0.6 }}
      >
        <div className="container mx-auto px-4">
          <motion.div
            className="relative z-10 flex items-center justify-center w-full"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <h1 className="company-title flex justify-center md:justify-between w-full md:!text-[44px] !text-[#2B332A] leading-none">
              <span>4</span>
              <span>0</span>
              <span>4</span>
            </h1>
          </motion.div>

          {/* About TBC Section */}
          404
        </div>
      </motion.section>
    </AnimatePresence>
  );
}
