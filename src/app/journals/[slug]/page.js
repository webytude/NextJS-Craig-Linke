import { createPage } from "@/utils/createPage";
import JournalClient from "./JournalClient";
import { GET_BY_SLUG_JOURNALS, GET_BY_SLUG_JOURNALS_PREVIEW } from "@/queries/queries";
import client from "@/lib/apolloClient";

const { Page, generateMetadata } = createPage({
  queries: {
    live: GET_BY_SLUG_JOURNALS,
    preview: GET_BY_SLUG_JOURNALS_PREVIEW,
  },
  component: JournalClient,
  propName: 'journal',
  
  getVariables: (params) => ({ slug: params.slug }),
  
  getData: (data, vars) => data?.journals?.find(p => p.Slug === vars.slug),
  
  
  metadataConfig: {
    notFoundTitle: "Page Not Found",
    generate: (data) => {
      const productionDomain =
      process.env.NEXT_PUBLIC_SITE_URL || "";
      const slug = data?.Slug || "";

      const canonicalUrl =
      data?.CanonicalUrl ||
      `${productionDomain}/journals/${slug}`;

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
      body: JSON.stringify({ query: '{ journals { Slug } }' }),
      cache: 'no-store',
    });
    const { data } = await res.json();
    return (data?.journals || []).map(j => ({ slug: j.Slug }));
  } catch {
    return [];
  }
}

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
