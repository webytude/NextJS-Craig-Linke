// "use client";

import { PAGES_QUERY } from "@/queries/queries";
import DynamicClientPage from "./DynamicClientPage";
import { createPage } from "@/utils/createPage";

const { Page, generateMetadata } = createPage({
  query: PAGES_QUERY,
  component: DynamicClientPage,
  propName: 'page',
  
  getVariables: (params) => ({ slug: params.slug }),
  
  getData: (data, vars) => data?.pages?.find(p => p.Slug === vars.slug),
  
  
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

// async function getPageData(slug) {
//   const { data } = await client.query({ 
//     query: PAGES_QUERY, 
//     variables: { slug } 
//   });
  
//   return data?.pages?.find(p => p.Slug === slug); 
// }

// export async function generateMetadata({ params }) {
//   const { slug } = await params;
//   const page = await getPageData(slug);

//   if (!page) {
//     return {
//       title: "Page Not Found",
//     };
//   }

//   return {
//     title: page.MetaTitle || 'Craig Linke',
//     description: page.MetaDescription || 'Craig Linke is a boutique, Adelaide based building and interior design company. We specialise in architectural builds and custom renovation projects.',
//   };
// }

// export default async function page({ params }) {
//   const { slug } = await params;
//   const page = await getPageData(slug);

//   if (!page) {
//     return notFound();
//   }

//   return <DynamicClientPage page={page} />;
// }

