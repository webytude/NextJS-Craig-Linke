"use client";

import { motion } from "framer-motion";

export default function FadeIn({ children, duration = 0.6, delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -60 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration, delay, ease: "easeIn" }}
      viewport={{ once: true }}
    >
      {children}
    </motion.div>
  );
}
