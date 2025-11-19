import Image from "next/image";
import styles from "./page.module.css";
import Box from "./components/ui/Box/Box";
import Grid from "./components/ui/Grid/Grid";
import LinkWithArrow from "./components/ui/Link";
import Divider from "./components/ui/Divider";
import Link from "next/link";
import ProjectCard from "./components/ProjectCard";
import ProjectCardOverly from "./components/ProjectCardOverly";
import JournalCard from "./components/Journal/JournalCard";
import Spacer from "./components/ui/Spacer";
import Aesthetics from "./components/Aesthetics";
import InteriorDesign from "./components/InteriorDesign";
import Hero from "./components/Hero";
import Journal from "./components/Journal";
import FeaturedProjects from "./components/FeaturedProjects";

export default function Home() {
  return (
    <div className={styles.page}>
      <Hero />
      <Divider />
      <FeaturedProjects />
      <Divider />
      <Aesthetics />
      <InteriorDesign />
      <Divider />
      <Journal />      
      <Divider />
    </div>
  );
}
