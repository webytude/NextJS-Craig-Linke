"use client";
import React, { useEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * PageLayout automatically assigns variant class based on route.
 * You can customize the route -> variant mapping easily.
 */
export default function PageLayout({ children }) {
  const pathname = usePathname();

  useEffect(() => {
    const body = document.body;

    // Remove any old variant classes
    body.classList.remove("default", "variant2", "variant3");

    // Map routes to variants
    if (pathname === "/" || pathname.startsWith("/home")) {
      body.classList.add("default");
    } else if (
      pathname.startsWith("/projects") ||
      pathname.startsWith("/project-detail")
    ) {
      body.classList.add("variant2");
    } else if (pathname.startsWith("/content") || pathname.startsWith("/journal")) {
      body.classList.add("variant3");
    } else {
      // fallback (default)
      body.classList.add("default");
    }
  }, [pathname]);

  return <main>{children}</main>;
}
