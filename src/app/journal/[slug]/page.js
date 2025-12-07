import { createPage } from "@/utils/createPage";
import JournalClient from "./JournalClient";
import { GET_BY_SLUG_JOURNALS } from "@/queries/queries";

const { Page, generateMetadata } = createPage({
  query: GET_BY_SLUG_JOURNALS,
  component: JournalClient,
  propName: 'journal',
  
  getVariables: (params) => ({ slug: params.slug }),
  
  getData: (data, vars) => data?.journals?.find(p => p.Slug === vars.slug),
  
  
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

// async function getJournalData(slug) {
//   const { data } = await client.query({ 
//     query: GET_BY_SLUG_JOURNALS, 
//     variables: { slug } 
//   });
  
//   return data?.journals?.find(p => p.Slug === slug);
// }

// export async function generateMetadata({ params }) {
//   const { slug } = await params;
//   const journal = await getJournalData(slug);

//   if (!journal) {
//     return {
//       title: "Journal Not Found",
//     };
//   }

//   return {
//     title: journal.MetaTitle || 'Craig Linke',
//     description: journal.MetaDescription || "Default description"
//   };
// }

// export default async function JournalDetails({ params }) {
//   const { slug } = await params;
//   const journal = await getJournalData(slug);

//   if (!journal) {
//     return notFound();
//   }

//   return <JournalClient journal={journal} />;
// }
