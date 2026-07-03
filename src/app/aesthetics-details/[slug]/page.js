import { ASTHETICS_QUERY_SLUG, ASTHETICS_QUERY_SLUG_PREVIEW, GLOBAL_QUERY } from "@/queries/queries";
import { notFound } from "next/navigation";
import AestheticsClient from "./AestheticsClient";
import client from "@/lib/apolloClient";
import { cache } from 'react';

const memoizedGetAestheticsData = cache(async (searchParamsStr) => {
  const resolvedSearchParams = JSON.parse(searchParamsStr);
  const isPreview = resolvedSearchParams?.preview === 'true';

  const query = isPreview
    ? ASTHETICS_QUERY_SLUG_PREVIEW
    : ASTHETICS_QUERY_SLUG;

  const { data } = await client.query({ 
    query,
    fetchPolicy: 'cache-first',
  });

  return data?.astheticsDetails;
});

async function getAestheticsData(searchParams) {
  const resolvedSearchParams = await searchParams;
  return await memoizedGetAestheticsData(JSON.stringify(resolvedSearchParams || {}));
}

export async function generateMetadata({ params, searchParams }) {
  const { slug } = await params;
  const data = await getAestheticsData(searchParams);
  const asthetics = data.find(p => p.Slug === slug)

  if (!asthetics) {
    return {
      title: "Asthetics Not Found",
    };
  }

  const productionDomain =
      process.env.NEXT_PUBLIC_SITE_URL || "";

  const seo = asthetics?.Seo;

  const canonicalUrl =
      asthetics?.CanonicalUrl ||
      (slug === "home"
        ? productionDomain
        : `${productionDomain}/${slug}`);

  return {
    title: seo?.MetaTitle || 'Craig Linke',
    description: seo?.MetaDescription || "Default description",
    alternates: {
      canonical: canonicalUrl,
    },
  };
}

export default async function AestheticsDetail({ params, searchParams }) {
  const asthetics = await getAestheticsData(searchParams);

  if (!asthetics) {
    return notFound();
  }

  return <AestheticsClient asthetics={asthetics} />
}
