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
    <>
      <h1 style={{position:'absolute',width:'1px',height:'1px',padding:0,margin:'-1px',overflow:'hidden',clip:'rect(0,0,0,0)',whiteSpace:'nowrap',border:0}}>Craig Linke Projects</h1>
      <ProjectFilterBase
        projects={project}
        renderProjects={(filteredProjects) => (
          <InfiniteProjects filteredProjects={filteredProjects} />
        )}
      />
    </>
  );
}
