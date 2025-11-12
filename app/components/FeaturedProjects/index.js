import TwoColumnLayout from "../layout/TwoColumnLayout";
import ProjectCard from "../ProjectCard";
import ProjectCardOverly from "../ProjectCardOverly";
import LinkWithArrow from "../ui/Link";

export default function FeaturedProjects() {
  const leftContent = (
    <>
      <div className="stickyBox p20">
        <ProjectCardOverly />
      </div>
    </>
  );

  const rightContent = (
    <>
      <div className="featuredProject p20">
        <div className="flex justify-space-between pt20 pb20">
          <div className="text-light">FEATURED PROJECTS</div>
          <div className="as">
            <LinkWithArrow text="EXPLORE ALL" href="/projects" />
          </div>
        </div>
        <div className="featureProjectList">
          <ul>
            <li className={styles.projectCard}>
              <ProjectCard />
            </li>
            <li className={styles.projectCard}>
              <ProjectCard />
            </li>
            <li className={styles.projectCard}>
              <ProjectCard />
            </li>
          </ul>
        </div>
      </div>
    </>
  );
  return (
    <section className="project positionRelative">
      <TwoColumnLayout left={leftContent} right={rightContent} showDivider />
    </section>
  );
}
