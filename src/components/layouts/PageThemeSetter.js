"use client";

import { useEffect } from "react";

const DEFAULT_THEME = "default-theme";

export default function PageThemeSetter({ theme }) {
  useEffect(() => {
    const finalTheme = theme && theme.trim() !== "" ? theme : DEFAULT_THEME;

    window.__PAGE_THEME_COLOR__ = finalTheme;
    window.dispatchEvent(new Event("theme-change"));
  }, [theme]);

  return null;
}
