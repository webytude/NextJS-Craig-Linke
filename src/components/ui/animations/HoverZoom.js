"use client";
import { motion } from "framer-motion";

export default function HoverZoom({ children }) {
  return (
    <motion.div
      whileHover={{ scale: 1.05, rotate: 0.5 }}
      transition={{ type: "spring", stiffness: 200, damping: 15 }}
      style={{ overflow: "hidden", }}
    >
      {children}
    </motion.div>
  );
}