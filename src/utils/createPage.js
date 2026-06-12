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
  const fetchPageData = async (params) => {
    const baseVariables = getVariables ? getVariables(params) : {};

    const variables = {
      ...baseVariables,
      status: "LIVE",
    };

    try {
      const { data } = await client.query({
        query: queries.live,
        variables,
        fetchPolicy: "no-cache",
      });

      return getData ? getData(data, variables) : data;
    } catch (error) {
      console.error("API Error:", error);
      return null;
    }
  };

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
