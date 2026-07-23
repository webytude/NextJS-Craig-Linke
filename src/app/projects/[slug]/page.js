
import { PROJECTS_QUERY_SLUG, PROJECTS_QUERY_SLUG_PREVIEW } from "@/queries/queries";
import ProjectClient from "./ProjectClient";
import { createPage } from "@/utils/createPage";
import client from "@/lib/apolloClient";

// export const revalidate = 300;

const { Page, generateMetadata } = createPage({
  queries: {
    live: PROJECTS_QUERY_SLUG,
    preview: PROJECTS_QUERY_SLUG_PREVIEW,
  },
  component: ProjectClient,
  propName: 'projects',
  
  getVariables: (params) => ({ slug: params.slug }),
  
  getData: (data, vars) => data?.projects?.find(p => p.Slug === vars.slug),
  
  
  metadataConfig: {
    notFoundTitle: "Page Not Found",
    generate: (data) => {
      const productionDomain =
      process.env.NEXT_PUBLIC_SITE_URL || "https://craiglinke.com.au";
      const slug = data?.Slug || "";

      const canonicalUrl =
      data?.CanonicalUrl ||
      `${productionDomain}/projects/${slug}`;

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

export const revalidate = 3600;

export async function generateStaticParams() {
  try {
    const res = await fetch(process.env.NEXT_PUBLIC_GRAPHQL_URI, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${process.env.GRAPHQL_AUTH_TOKEN}` },
      body: JSON.stringify({ query: '{ projects(pagination:{limit:-1},sort:["rank:asc"]) { Slug } }' }),
      cache: 'no-store',
    });
    const { data } = await res.json();
    return (data?.projects || []).map(p => ({ slug: p.Slug }));
  } catch {
    return [];
  }
}

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
