"use client";

import { createContext, useContext, useState } from "react";
import { useMotionValue } from "framer-motion";

const AestheticsContext = createContext(null);

export function AestheticsProvider({ children }) {
  const x = useMotionValue(0);

  const [internalNav, setInternalNav] = useState(false);

  return (
    <AestheticsContext.Provider value={{
        x,
        internalNav,
        setInternalNav,
      }}>
      {children}
    </AestheticsContext.Provider>
  );
}

export const useAestheticsScroll = () => {
  const context = useContext(AestheticsContext);
  if (!context) {
    throw new Error("useAestheticsScroll must be used within a AestheticsProvider");
  }
  return context.x;
};

export const useAestheticsNav = () => {
  const context = useContext(AestheticsContext);
  if (!context) {
    throw new Error("useAestheticsNav must be used within AestheticsProvider");
  }
  return {
    internalNav: context.internalNav,
    setInternalNav: context.setInternalNav,
  };
};