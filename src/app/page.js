import PageNotFound from "./PageNotFound";
import { PAGES_QUERY } from "@/queries/queries";
import client from "@/lib/apolloClient";
import BlockRenderer from "@/components/layouts/BlockRenderer";
import PageThemeSetter from "@/components/layouts/PageThemeSetter";
import Loading from "@/components/common/Loading";

export async function generateMetadata() {
  const slug = 'home';
  let page = null;

  try {
    const { data } = await client.query({
      query: PAGES_QUERY,
      variables: { slug },
      fetchPolicy: 'no-cache',
    });
    page = data?.pages?.find((p) => p.Slug === slug);

  } catch (error) {
    console.error('Error fetching SEO data for home page:', error);
    return {
      title: 'Craig Linke',
      description: 'Craig Linke is a boutique, Adelaide based building and interior design company. We specialise in architectural builds and custom renovation projects.',
    };
  }

  const productionDomain =
      process.env.NEXT_PUBLIC_SITE_URL || "";
  const seo = page?.Seo;

  const canonicalUrl =
      page?.CanonicalUrl ||
      (slug === "home"
        ? productionDomain
        : `${productionDomain}/${slug}`);

  return {
    title: seo?.MetaTitle || 'Craig Linke',
    description: seo?.MetaDescription || 'Craig Linke is a boutique, Adelaide based building and interior design company. We specialise in architectural builds and custom renovation projects.',
    alternates: {
      canonical: canonicalUrl,
    },
  };
}

export const revalidate = 3600;

export default async function Home() {
  const slug = 'home';
  try {
    const { data, loading, error } = await client.query({
      query: PAGES_QUERY,
      variables: { slug },
      fetchPolicy: 'no-cache',
    });

    
    if (loading) return <Loading />;
    if (error) return <p>Error loading data</p>;
    
    const page = data?.pages?.find((p) => p.Slug === slug);

    const themeColor = page?.ThemeColor || "";
    const schemaMarkup = page?.Seo?.SchemaMarkup;

    const H1_BLOCK_TYPES = new Set([
      'ComponentSectionHomeHero',
      'ComponentSectionAboutHero',
      'ComponentSectionContactHero',
      'ComponentSectionServices',
      'ComponentSectionNewContactHero',
      'ComponentSectionContentHeroModule',
      'ComponentSectionTextModule',
    ]);
    let h1Assigned = false;

    return <>

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

      {page?.Blocks?.map((block, i) => {
        const isFirstH1 = H1_BLOCK_TYPES.has(block.__typename) && !h1Assigned;
        if (isFirstH1) h1Assigned = true;
        return <BlockRenderer key={i} block={block} isFirstH1={isFirstH1} />;
      })}
    </>;
  } catch (error) {
    console.error('Error loading home page:', error);
    return (
      <PageNotFound />
    );
  }
}
