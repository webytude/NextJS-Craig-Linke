"use client";

import JournalCard from "@/components/common/JournalCard";
import JournalCardOverly from "@/components/common/JournalCardOverly";
import ProjectFilterBase from "@/components/common/ProjectFilterBase";
import TwoColumnLayout from "@/components/layouts/TwoColumnLayout";
import Divider from "@/components/ui/Divider";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import styles from "./journal.module.css";
import { useQuery } from "@apollo/client/react";
import { JOURNALS_QUERY } from "@/queries/queries";
import InfiniteJournal from "@/components/journal/InfiniteJournal";

export default function Journal() {

  const { data, loading, error } = useQuery(JOURNALS_QUERY, {
    fetchPolicy: "cache-first",
    notifyOnNetworkStatusChange: true,
  });

  const journalData = data?.journals;

  useEffect(() => {
    const finalTheme = "Pinot";
    window.__PAGE_THEME_COLOR__ = finalTheme;
    window.dispatchEvent(new Event("theme-change"));
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading data</p>;
  if (!journalData) return <p>Page not found</p>;

  return (
    <ProjectFilterBase
      projects={journalData}
      categoryKey={'JournalCategory'}
      renderProjects={(filteredProjects) => (
        <InfiniteJournal filteredProjects={filteredProjects} />
      )}
    />
  );
}
