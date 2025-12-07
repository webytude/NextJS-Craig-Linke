
import { PROJECTS_QUERY_SLUG } from "@/queries/queries";
import ProjectClient from "./ProjectClient";
import { createPage } from "@/utils/createPage";

const { Page, generateMetadata } = createPage({
  query: PROJECTS_QUERY_SLUG,
  component: ProjectClient,
  propName: 'projects',
  
  getVariables: (params) => ({ slug: params.slug }),
  
  getData: (data, vars) => data?.projects?.find(p => p.Slug === vars.slug),
  
  
  metadataConfig: {
    notFoundTitle: "Page Not Found",
    generate: (data) => ({
      title: data?.MetaTitle || 'Craig Linke',
      description: data?.MetaDescription || 'Craig Linke is a boutique...',
    })
  }
});

export { generateMetadata };
export default Page;

// async function getProjectData(slug) {
//   const { data } = await client.query({ 
//     query: PROJECTS_QUERY_SLUG, 
//     variables: { slug } 
//   });
  
//   return data?.projects?.find(p => p.Slug === slug);
// }

// export async function generateMetadata({ params }) {
//   const { slug } = await params;
//   const projects = await getProjectData(slug);

//   if (!projects) {
//     return {
//       title: "Project Not Found",
//     };
//   }

//   return {
//     title: projects.MetaTitle || 'Craig Linke',
//     description: projects.MetaDescription || "Default description"
//   };
// }

// export default async function ProjectDetail({ params }) {
//   const { slug } = await params;
//   const projects = await getProjectData(slug);

//   if (!projects) {
//       return notFound();
//   }

//   return <ProjectClient projects={projects} />;
// }
