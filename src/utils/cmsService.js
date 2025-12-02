import client from "@/lib/apolloClient";

export async function fetchCmsData(slug, query, collectionName) {
  try {
    const { data } = await client.query({
      query: query,
      variables: { slug },
      fetchPolicy: "network-only", // અથવા 'no-cache' જેથી fresh data મળે
      context: {
        fetchOptions: {
          next: { revalidate: 60 }, // Next.js Revalidation settings
        },
      },
    });

    // Dynamic key access: data['journals'] or data['projects']
    const result = data?.[collectionName]?.[0];
    return result || null;

  } catch (error) {
    console.error(`Error fetching ${collectionName}:`, error);
    return null;
  }
}

export async function generateCmsMetadata(slug, query, collectionName) {
  const data = await fetchCmsData(slug, query, collectionName);

  if (!data) {
    return {
      title: "Page Not Found",
    };
  }

  return {
    title: data.MetaTitle || data.Title,
    description: data.MetaDescription || "",
    openGraph: {
      title: data.MetaTitle || data.Title,
      description: data.MetaDescription,
      // images: [data.CoverImage?.url], // Jo image hoy to
    },
  };
}