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

