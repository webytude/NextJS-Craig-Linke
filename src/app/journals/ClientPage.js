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
    <>
      <h1 style={{position:'absolute',width:'1px',height:'1px',padding:0,margin:'-1px',overflow:'hidden',clip:'rect(0,0,0,0)',whiteSpace:'nowrap',border:0}}>Craig Linke Journal</h1>
      <ProjectFilterBase
        projects={journal}
        categoryKey={'JournalCategory'}
        renderProjects={(filteredProjects) => (
          <InfiniteJournal filteredProjects={filteredProjects} />
        )}
      />
    </>
  );
}
