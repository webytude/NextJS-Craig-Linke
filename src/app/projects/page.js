"use client";

import Loading from "@/components/common/Loading";
import ProjectFilterBase from "@/components/common/ProjectFilterBase";
import InfiniteProjects from "@/components/project/InfiniteProjects";
import { PROJECTS_QUERY } from "@/queries/queries";
import { useQuery } from "@apollo/client/react";
import { useEffect } from "react";

export default function Projects() {
  const { data, loading, error } = useQuery(PROJECTS_QUERY, {
    fetchPolicy: "cache-first",
    notifyOnNetworkStatusChange: true,
  });

  const projectData = data?.projects;

  useEffect(() => {
    const finalTheme = "White";
    window.__PAGE_THEME_COLOR__ = finalTheme;
    window.dispatchEvent(new Event("theme-change"));
  }, []);

  if (loading) return <Loading />;
  if (error) return <p>Error loading data</p>;
  if (!projectData) return <p>Page not found</p>;

  return (
    <ProjectFilterBase
      projects={projectData}
      renderProjects={(filteredProjects) => (
        <InfiniteProjects filteredProjects={filteredProjects} />
      )}
    />
  );
}
