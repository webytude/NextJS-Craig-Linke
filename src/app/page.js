import PageNotFound from "./PageNotFound";
import { PAGES_QUERY } from "@/queries/queries";
import client from "@/lib/apolloClient";
import BlockRenderer from "@/components/layouts/BlockRenderer";
import PageThemeSetter from "@/components/layouts/PageThemeSetter";
import Loading from "@/components/common/Loading";

export const revalidate = 300;

export async function generateMetadata() {
  const slug = "home";
  let page = null;

  try {
    const { data } = await client.query({
      query: PAGES_QUERY,
      variables: { slug },
      fetchPolicy: "cache-first",
    });
    page = data?.pages?.find((p) => p.Slug === slug);
  } catch (error) {
    console.error("Error fetching SEO data for home page:", error);
    return {
      title: "Craig Linke",
      description:
        "Craig Linke is a boutique, Adelaide based building and interior design company. We specialise in architectural builds and custom renovation projects.",
    };
  }

  const productionDomain =
    process.env.NEXT_PUBLIC_SITE_URL || "https://craiglinke.com.au";
  const seo = page?.Seo;

  const canonicalUrl =
    page?.CanonicalUrl ||
    (slug === "home" ? `${productionDomain}/` : `${productionDomain}/${slug}`);

  return {
    title: seo?.MetaTitle || "Craig Linke",
    description:
      seo?.MetaDescription ||
      "Craig Linke is a boutique, Adelaide based building and interior design company. We specialise in architectural builds and custom renovation projects.",
    alternates: {
      canonical: canonicalUrl,
    },
  };
}

export default async function Home() {
  const slug = "home";
  try {
    const { data, loading, error } = await client.query({
      query: PAGES_QUERY,
      variables: { slug },
      fetchPolicy: "cache-first",
    });

    if (loading) return <Loading />;
    if (error) return <p>Error loading data</p>;

    const page = data?.pages?.find((p) => p.Slug === slug);

    const themeColor = page?.ThemeColor || "";
    const schemaMarkup = page?.Seo?.SchemaMarkup;

    const H1_BLOCK_TYPES = new Set([
      "ComponentSectionHomeHero",
      "ComponentSectionAboutHero",
      "ComponentSectionContactHero",
      "ComponentSectionServices",
      "ComponentSectionNewContactHero",
      "ComponentSectionContentHeroModule",
    ]);
    const firstH1Index = (page?.Blocks ?? []).findIndex((b) =>
      H1_BLOCK_TYPES.has(b.__typename),
    );

    return (
      <>
        {schemaMarkup && (
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html:
                typeof schemaMarkup === "string"
                  ? schemaMarkup
                  : JSON.stringify(schemaMarkup),
            }}
          />
        )}

        <PageThemeSetter theme={themeColor} />

        {page?.Blocks?.map((block, i) => (
          <BlockRenderer key={i} block={block} isFirstH1={i === firstH1Index} />
        ))}
      </>
    );
  } catch (error) {
    console.error("Error loading home page:", error);
    return <PageNotFound />;
  }
}
