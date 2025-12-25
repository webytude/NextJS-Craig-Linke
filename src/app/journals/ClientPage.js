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
import Loading from "@/components/common/Loading";
import PageNotFound from "../PageNotFound";

export default function JournalClient({ journal }) {

  useEffect(() => {
    const finalTheme = "Pinot";
    window.__PAGE_THEME_COLOR__ = finalTheme;
    window.dispatchEvent(new Event("theme-change"));
  }, []);

  return (
    <ProjectFilterBase
      projects={journal}
      categoryKey={'JournalCategory'}
      renderProjects={(filteredProjects) => (
        <InfiniteJournal filteredProjects={filteredProjects} />
      )}
    />
  );
}
