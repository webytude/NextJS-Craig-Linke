import Image from "next/image";

// Optional: replace this with API call
const projects = [
  { id: 1, title: "Villa Interior", category: "Interior Design", image: "/images/project1.jpg", slug: "villa-interior", description: "A stunning villa designed with modern and timeless elements blending seamlessly.", },
{ id: 2, title: "Outdoor Lounge", category: "Outdoor Living", image: "/images/project2.jpg", slug: "outdoor-lounge", description: "A stunning villa designed with modern and timeless elements blending seamlessly.", },
{ id: 3, title: "Luxury Home", category: "Interior Design", image: "/images/project3.jpg", slug: "luxury-home", description: "A stunning villa designed with modern and timeless elements blending seamlessly.", },
];

export default async function ProjectDetail({ params }) {
    const { slug } = await params;

  const project = projects.find((p) => p.slug === slug); 

  if (!project) {
    return <div style={{ padding: "60px" }}>Project not found.</div>;
  }

  return (
    <section style={{ padding: "60px", maxWidth: "1000px", margin: "0 auto" }}>
      <Image
        src={project.image}
        alt={project.title}
        width={1000}
        height={600}
        style={{ borderRadius: "12px", objectFit: "cover" }}
      />
      <h1 style={{ marginTop: "40px", fontSize: "2rem" }}>{project.title}</h1>
      <p style={{ color: "#777", marginTop: "8px" }}>{project.category}</p>
      <p style={{ marginTop: "20px", lineHeight: "1.8" }}>{project.description}</p>
    </section>
  );
}
