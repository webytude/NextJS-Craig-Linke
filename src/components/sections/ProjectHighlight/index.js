import ProjectCardOverly from "@/components/common/ProjectCardOverly";
import styles from "./projectHighlight.module.css";
import { renderRichText } from "@/utils/richText";
import LinkWithArrow from "@/components/ui/Link";
import ProjectCard from "@/components/common/ProjectCard";
import TwoColumnLayout from "@/components/layouts/TwoColumnLayout";
import Divider from "@/components/ui/Divider";
import FadeUp from "@/components/ui/animations/FadeUp";

export default function ProjectHighlight({ data }) {
  const {
    BottomDescription,
    BottomTitle,
    Button,
    FeaturedProjects,
    Media,
    TopTitle,
  } = data;

  const leftContent = (
    <>
      <div className="stickyBox p20">
        <ProjectCardOverly
          bottomDescription={BottomDescription}
          bottomTitle={BottomTitle}
          button={Button}
          media={Media}
          topTitle={TopTitle}
        />
      </div>
    </>
  );

  const rightContent = (
    <>
      <div className="featuredProject p20">
        <div className={`flex justify-space-between pt20 pb20 no-padding-mobile ${styles.stickyHeader}`}>
          <FadeUp><div className="text-light uppercase">{FeaturedProjects.Title}</div></FadeUp>
          {FeaturedProjects.Button && (
            <FadeUp>
              <LinkWithArrow
                text={FeaturedProjects.Button.ButtonText}
                href={FeaturedProjects.Button.ButtonURL}
              />
            </FadeUp>
          )}
        </div>
        <div className={styles.featureProjectList}>
          <FadeUp>
          <ul>
            {FeaturedProjects.SelectProjects.map((item, index) => (
              <li key={index} className={styles.projectCard}>
                <ProjectCard project={item} />
              </li>
            ))}
          </ul>
          </FadeUp>
        </div>
      </div>
    </>
  );

  return (
    <>
    <section className="project positionRelative">
      <TwoColumnLayout left={leftContent} right={rightContent} showDivider />
    </section>
    <Divider />
    </>
  );
}
