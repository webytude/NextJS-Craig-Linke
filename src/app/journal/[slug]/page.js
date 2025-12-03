
import { notFound } from "next/navigation";
import JournalClient from "./JournalClient";
import client from "@/lib/apolloClient";
import { GET_BY_SLUG_JOURNALS } from "@/queries/queries";
import UniversalPageClient from "@/components/UniversalPageClient";

// const COLLECTION_NAME = "journals";

// export async function generateMetadata({ params }) {
//   const { slug } = await params;
//   return await generateCmsMetadata(slug, GET_BY_SLUG_JOURNALS, COLLECTION_NAME);
// }

// export default async function JournalDetails({ params }) {
//   const { slug } = await params;
//   const data = await fetchCmsData(slug, GET_BY_SLUG_JOURNALS, COLLECTION_NAME);

//   if (!data) return notFound();

//   return <UniversalPageClient data={data} defaultTheme="Pinot" />;
// }

async function getJournalData(slug) {
  const { data } = await client.query({ 
    query: GET_BY_SLUG_JOURNALS, 
    variables: { slug } 
  });
  
  return data?.journals?.find(p => p.Slug === slug);
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const journal = await getJournalData(slug);

  if (!journal) {
    return {
      title: "Journal Not Found",
    };
  }

  return {
    title: journal.MetaTitle || 'Craig Linke',
    description: journal.MetaDescription || "Default description"
  };
}

export default async function JournalDetails({ params }) {
  const { slug } = await params;
  const journal = await getJournalData(slug);

  if (!journal) {
    return notFound();
  }

  return <JournalClient journal={journal} />;
}
