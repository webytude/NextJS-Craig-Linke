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

  const seo = page?.Seo;

  return {
    title: seo?.MetaTitle || 'Craig Linke',
    description: seo?.MetaDescription || 'Craig Linke is a boutique, Adelaide based building and interior design company. We specialise in architectural builds and custom renovation projects.',
  };
}

export default async function Home() {
  const slug = 'home';
  try {
    const { data, loading, error } = await client.query({
      query: PAGES_QUERY,
      fetchPolicy: 'no-cache',
    });

    
    if (loading) return <Loading />;
    if (error) return <p>Error loading data</p>;
    
    const page = data?.pages?.find((p) => p.Slug === slug);

    const themeColor = page?.ThemeColor || "";

    return <>
    
      <PageThemeSetter theme={themeColor} />

      {page?.Blocks?.map((block, i) => (
        <BlockRenderer key={i} block={block} />
      ))}
    </>;
  } catch (error) {
    console.error('Error loading home page:', error);
    return (
      <PageNotFound />
    );
  }
}
