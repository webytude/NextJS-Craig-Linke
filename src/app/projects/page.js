
import { PROJECTS_QUERY, PROJECTS_QUERY_PREVIEW } from "@/queries/queries";;
import ProjectsClient from "./ClientPage";
import { createPage } from "@/utils/createPage";

const { Page, generateMetadata } = createPage({
  // query: PROJECTS_QUERY,
  queries: {
    live: PROJECTS_QUERY,
    preview: PROJECTS_QUERY_PREVIEW,
  },
  component: ProjectsClient,
  propName: 'project',
  
  getData: (data) => data?.projects,

  metadataConfig: {
    notFoundTitle: "Page Not Found",
    generate: (data) => {
      const productionDomain =
      process.env.NEXT_PUBLIC_SITE_URL || "";
      const slug = data?.Slug || "";

      const canonicalUrl =
      data?.CanonicalUrl ||
      (slug === "home"
        ? productionDomain
        : `${productionDomain}/${slug}`);

      return {
        title: data?.Seo?.MetaTitle || 'Craig Linke',
        description: data?.Seo?.MetaDescription || 'Craig Linke is a boutique...',
        alternates: {
          canonical: canonicalUrl,
        },
      }
    }
  }

});

export { generateMetadata };
export default Page;

// async function getData() {
//   const { data } = await client.query({ 
//     query: PROJECTS_QUERY, 
//     fetchPolicy: "cache-first",
//   });
  
//   return data?.projects;
// }

// export async function generateMetadata() {
//   return {
//     title: 'Craig Linke',
//     description: "Default description"
//   };
// }

// export default async function Projects() {

//   const projectData = await getData();

//   return <ProjectsClient project={projectData} />;
// }
