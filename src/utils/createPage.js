import { cache } from 'react';
import { notFound } from 'next/navigation';
import client from '@/lib/apolloClient';

export function createPage({
  query,
  getVariables,
  getData,
  component: ClientComponent,
  propName = 'data',
  metadataConfig
}) {
  const fetchPageData = cache(async (params) => {
    const variables = getVariables ? getVariables(params) : {};
    
    try {
      const { data } = await client.query({ 
        query, 
        variables,
        fetchPolicy: "cache-first"
      });
      
      return getData ? getData(data, variables) : data;
    } catch (error) {
      console.error("API Error:", error);
      return null;
    }
  });

  const generateMetadata = async ({ params }) => {
    const resolvedParams = await params;
    const data = await fetchPageData(resolvedParams);

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

  const Page = async ({ params }) => {
    const resolvedParams = await params;
    const data = await fetchPageData(resolvedParams);

    if (!data) {
      return notFound();
    }

    const props = { [propName]: data };

    return <ClientComponent {...props} />;
  };

  return { generateMetadata, Page };
}