import { cache } from 'react';
import { notFound } from 'next/navigation';
import client from '@/lib/apolloClient';
import { PAGES_QUERY, PAGES_QUERY_PREVIEW } from '@/queries/queries';

export function createPage({
  query,
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

    console.log('isPreview', isPreview)

    // const query = isPreview
    //   ? PAGES_QUERY_PREVIEW
    //   : PAGES_QUERY;

      console.log('query', query)

    const variables = {
      ...baseVariables,
      status: isPreview ? "PREVIEW" : "LIVE",
    };

    console.log("Fetching with variables:", variables);

    try {
      const { data } = await client.query({
        query,
        variables,
        fetchPolicy: "no-cache",
      });

      console.log("Data received:", data);

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