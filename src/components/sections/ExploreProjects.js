export default function ExploreProjects({ data }) {
  const { Title, SelectProjects } = data;

  return (
    <section>
      <h2>{Title}</h2>

      {SelectProjects?.map((project, i) => (
        <div key={i}>
          <h3>{project.Name}</h3>
          <img src={project.Media?.ImageORCarousel?.url} />
        </div>
      ))}
    </section>
  );
}
