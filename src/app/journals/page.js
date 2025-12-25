import { JOURNALS_QUERY, JOURNALS_QUERY_PREVIEW } from "@/queries/queries";
import JournalClient from "./ClientPage";
import { createPage } from "@/utils/createPage";

const { Page, generateMetadata } = createPage({
  // query: JOURNALS_QUERY,
  queries: {
    live: JOURNALS_QUERY,
    preview: JOURNALS_QUERY_PREVIEW,
  },
  component: JournalClient,
  propName: 'journal',
  
  getData: (data) => data?.journals,

  metadataConfig: {
    notFoundTitle: "Page Not Found",
    generate: (data) => ({
      title: data?.MetaTitle || 'Journals Craig Linke',
      description: data?.MetaDescription || 'Craig Linke is a boutique...',
    })
  }
});

export { generateMetadata };
export default Page;

// async function getData() {
//   const { data } = await client.query({ 
//     query: JOURNALS_QUERY, 
//     fetchPolicy: "cache-first",
//   });
  
//   return data?.journals;
// }

// export async function generateMetadata() {
//   return {
//     title: 'Craig Linke',
//     description: "Default description"
//   };
// }

// export default async function Journal() {

//   const journalData = await getData();

//   return <JournalClient journal={journalData} />;
// }
