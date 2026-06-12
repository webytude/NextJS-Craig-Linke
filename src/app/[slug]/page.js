// "use client";

import { PAGES_QUERY, PAGES_QUERY_PREVIEW, PAGES_ALL_SLUGS_QUERY } from "@/queries/queries";
import DynamicClientPage from "./DynamicClientPage";
import { createPage } from "@/utils/createPage";
import client from "@/lib/apolloClient";

const { Page, generateMetadata } = createPage({
  queries: {
    live: PAGES_QUERY,
    preview: PAGES_QUERY_PREVIEW,
  },
  component: DynamicClientPage,
  propName: "page",

  getVariables: (params) => ({ slug: params.slug }),

  getData: (data, vars) => data?.pages?.find((p) => p.Slug === vars.slug),

  metadataConfig: {
    notFoundTitle: "Page Not Found",
    generate: (data) => {
      const productionDomain = process.env.NEXT_PUBLIC_SITE_URL || "";
      const slug = data?.Slug || "";

      const canonicalUrl =
        data?.CanonicalUrl ||
        (slug === "home" ? productionDomain : `${productionDomain}/${slug}`);

      return {
        title: data?.Seo?.MetaTitle || "Craig Linke",
        description:
          data?.Seo?.MetaDescription || "Craig Linke is a boutique...",
        alternates: {
          canonical: canonicalUrl,
        },
      };
    },
  },
});

export const revalidate = 3600;

export async function generateStaticParams() {
  try {
    const res = await fetch(process.env.NEXT_PUBLIC_GRAPHQL_URI, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${process.env.GRAPHQL_AUTH_TOKEN}` },
      body: JSON.stringify({ query: '{ pages(pagination:{limit:-1}) { Slug } }' }),
      cache: 'no-store',
    });
    const { data } = await res.json();
    return (data?.pages || []).map(p => ({ slug: p.Slug }));
  } catch {
    return [];
  }
}

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
