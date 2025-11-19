import PageNotFound from "./PageNotFound";
import { PAGES_QUERY } from "@/queries/queries";
import client from "@/lib/apolloClient";
import BlockRenderer from "@/components/layouts/BlockRenderer";
import PageThemeSetter from "@/components/layouts/PageThemeSetter";
import Loading from "@/components/common/Loading";

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
      <div>
        <PageNotFound/>
      </div>
    );
  }
}
