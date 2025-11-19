"use client";

import { useEffect, useState } from "react";

const DEFAULT_THEME = "default-theme";

export default function BodyTheme() {

  const applyTheme = () => {
    let theme = window.__PAGE_THEME_COLOR__;

    if (!theme || theme.trim() === "") {
      theme = DEFAULT_THEME;
    }

    document.body.className = theme;
  };
  
  useEffect(() => {
    // Apply theme on load
    applyTheme();

    // Listen for theme changes
    window.addEventListener("theme-change", applyTheme);

    return () => {
      window.removeEventListener("theme-change", applyTheme);
    };
  }, []);

  return null;
}
