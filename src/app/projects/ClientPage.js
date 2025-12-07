"use client";

import ProjectFilterBase from "@/components/common/ProjectFilterBase";
import InfiniteProjects from "@/components/project/InfiniteProjects";
import { useEffect } from "react";

export default function ProjectsClient({ project }) {
  
  useEffect(() => {
    const finalTheme = "White";
    window.__PAGE_THEME_COLOR__ = finalTheme;
    window.dispatchEvent(new Event("theme-change"));
  }, []);

  return (
    <ProjectFilterBase
      projects={project}
      renderProjects={(filteredProjects) => (
        <InfiniteProjects filteredProjects={filteredProjects} />
      )}
    />
  );
}
