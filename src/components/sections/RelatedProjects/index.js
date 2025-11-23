import ProjectCard from "@/components/common/ProjectCard";
import Heading from "@/components/ui/Heading";
import Spacer from "@/components/ui/Spacer";
import styles from "./relatedProjects.module.css";
import { motion } from "framer-motion";

export default function RelatedProjects({ data }) {

    const sectionData = data[0];

    const {Title = '', SelectProjects} = sectionData;


  return (
    <section className="RelatedProjects">
        <div className="container">
          <Spacer desktop={122} />
          <Heading level={4} align="center">
            {Title}
          </Heading>
          <Spacer desktop={40} />
          <div className="relatedProjects">
            <div className={styles.grid}>
                {SelectProjects.map((p, i) => (
                  <ProjectCard project={p} />
                ))}
            </div>
          </div>
          <Spacer desktop={122} />
        </div>
    </section>
  )
}
