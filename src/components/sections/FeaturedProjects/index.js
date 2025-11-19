import ProjectCard from "@/components/common/ProjectCard";
import ProjectCardOverly from "@/components/common/ProjectCardOverly";
import TwoColumnLayout from "@/components/layouts/TwoColumnLayout";
import LinkWithArrow from "@/components/ui/Link";
import styles from "./featuredProjects.module.css";

export default function FeaturedProjects({ data }) {

  const { Title, Button, SelectProjects } = data;

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
          {/* <div className="text-light uppercase">{Title}</div> */}
          {/* {Button && (
            <div>
              <LinkWithArrow text={Button.ButtonText} href={Button.ButtonURL} />
            </div>
          )} */}
        </div>
        <div className="featureProjectList">
          <ul>
            {/* {SelectProjects.map((item, index) => (
              <li key={index} className={styles.projectCard}>
                <ProjectCard project={item} />
              </li>
            ))} */}
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
