import { notFound } from 'next/navigation';
import client from '@/lib/apolloClient';
import { cache } from 'react';

export function createPage({
  queries,
  getVariables,
  getData,
  component: ClientComponent,
  propName = 'data',
  metadataConfig
}) {
  const memoizedFetch = cache(async (paramString, searchParamString) => {
    const resolvedParams = JSON.parse(paramString);
    const resolvedSearchParams = JSON.parse(searchParamString);
    const isPreview = resolvedSearchParams?.preview === 'true';
    const baseVariables = getVariables ? getVariables(resolvedParams) : {};

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
        fetchPolicy: "cache-first",
      });

      return getData ? getData(data, variables) : data;
    } catch (error) {
      console.error("API Error:", error);
      return null;
    }
  });

  const fetchPageData = async (params, searchParams) => {
    const resolvedParams = await params;
    const resolvedSearchParams = await searchParams;
    return await memoizedFetch(
      JSON.stringify(resolvedParams || {}),
      JSON.stringify(resolvedSearchParams || {})
    );
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

    const schemaMarkup =
      data?.SchemaMarkup ||
      data?.Seo?.SchemaMarkup ||
      data?.Seo?.schemaMarkup;

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
        
        <ClientComponent {...props} />
      </>
    );
  };

  return { generateMetadata, Page };
}