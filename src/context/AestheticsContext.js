"use client";

import { createContext, useContext } from "react";
import { useMotionValue } from "framer-motion";

const AestheticsContext = createContext(null);

export function AestheticsProvider({ children }) {
  const x = useMotionValue(0);

  return (
    <AestheticsContext.Provider value={x}>
      {children}
    </AestheticsContext.Provider>
  );
}

export const useAestheticsScroll = () => {
  const context = useContext(AestheticsContext);
  if (!context) {
    throw new Error("useAestheticsScroll must be used within a AestheticsProvider");
  }
  return context;
};