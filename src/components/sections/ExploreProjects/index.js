import ProjectCard from "@/components/common/ProjectCard";
import Heading from "@/components/ui/Heading";
import Spacer from "@/components/ui/Spacer";

export default function ExploreProjects({ data }) {
  const { Title, SelectProjects } = data;

  return (
    <section>
        <div className="container">
          <Spacer desktop={122} />
          <Heading level={4} align="center">
            {Title}
          </Heading>
          <Spacer desktop={40} />
          <div className="relatedProjects">
            <div className="grid">
                {SelectProjects.map((p, i) => (
                  <ProjectCard project={p} />
                ))}
            </div>
          </div>
          <Spacer desktop={122} />
        </div>
    </section>
  );
}
