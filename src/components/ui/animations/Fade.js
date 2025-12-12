"use client";

import { motion } from "framer-motion";

export default function Fade({ children, duration = 1, delay = 0.5, style, classes }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 0 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration, delay, ease: "easeOut" }}
      viewport={{ once: true, amount: 0.2 }}
      style={style}
      className={classes}
    >
      {children}
    </motion.div>
  );
}
