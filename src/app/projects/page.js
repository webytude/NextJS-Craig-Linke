
import { PROJECTS_QUERY, PROJECTS_QUERY_PREVIEW } from "@/queries/queries";;
import ProjectsClient from "./ClientPage";
import { createPage } from "@/utils/createPage";

const { Page, generateMetadata } = createPage({
  queries: {
    live: PROJECTS_QUERY,
    preview: PROJECTS_QUERY_PREVIEW,
  },
  component: ProjectsClient,
  propName: 'project',
  
  getData: (data) => data?.projects,

  metadataConfig: {
    notFoundTitle: "Page Not Found",
    generate: () => {
      const productionDomain =
        (process.env.NEXT_PUBLIC_SITE_URL || "https://craiglinke.com.au").replace(/\/$/, '');
      return {
        title: 'Projects | Craig Linke',
        description: 'Craig Linke is a boutique, Adelaide based building and interior design company. We specialise in architectural builds and custom renovation projects.',
        alternates: {
          canonical: `${productionDomain}/projects`,
        },
      };
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
