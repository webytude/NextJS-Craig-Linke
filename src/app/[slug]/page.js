import { PAGES_QUERY, PAGES_QUERY_PREVIEW } from "@/queries/queries";
import DynamicClientPage from "./DynamicClientPage";
import { createPage } from "@/utils/createPage";

const { Page, generateMetadata } = createPage({
  // query: PAGES_QUERY,
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

export { generateMetadata };
export default Page;

