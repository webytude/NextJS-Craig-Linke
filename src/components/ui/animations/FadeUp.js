"use client";

import { motion } from "framer-motion";

export default function FadeUp({ children, duration = 0.6, delay = 0, style }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration, delay, ease: "easeOut" }}
      viewport={{ once: true, amount: 0.2 }}
      style={style}
    >
      {children}
    </motion.div>
  );
}
