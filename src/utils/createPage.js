import { notFound } from 'next/navigation';
import client from '@/lib/apolloClient';

export function createPage({
  queries,
  getVariables,
  getData,
  component: ClientComponent,
  propName = 'data',
  metadataConfig
}) {
  const fetchPageData = async (params, searchParams) => {
    const resolvedSearchParams = await searchParams;
    const isPreview = resolvedSearchParams.preview === 'true';
    const baseVariables = getVariables ? getVariables(params) : {};

    const variables = {
      ...baseVariables,
      status: isPreview ? "DRAFT" : "LIVE",
    };

    const activeQuery = isPreview
      ? queries.preview
      : queries.live;

    try {
      const { data } = await client.query({
        query: activeQuery,
        variables,
        fetchPolicy: "no-cache",
      });

      return getData ? getData(data, variables) : data;
    } catch (error) {
      console.error("API Error:", error);
      return null;
    }
  };

  const generateMetadata = async ({ params, searchParams }) => {
    const resolvedParams = await params;
    const resolvedSearchParams = await searchParams;
    const data = await fetchPageData(resolvedParams, resolvedSearchParams);

    if (!data && metadataConfig?.notFoundTitle) {
       return { title: metadataConfig.notFoundTitle };
    }

    if (metadataConfig?.generate) {
      return metadataConfig.generate(data);
    }

    return {
      title: 'Craig Linke',
      description: 'Default description',
    };
  };

  const Page = async ({ params, searchParams }) => {
    const resolvedParams = await params;
    const resolvedSearchParams = await searchParams;
    const data = await fetchPageData(resolvedParams, resolvedSearchParams);

    if (!data) {
      return notFound();
    }

    const props = { [propName]: data };

    return <ClientComponent {...props} />;
  };

  return { generateMetadata, Page };
}