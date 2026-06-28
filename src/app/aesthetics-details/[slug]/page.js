import { ASTHETICS_QUERY_SLUG, ASTHETICS_QUERY_SLUG_PREVIEW } from "@/queries/queries";
import { notFound } from "next/navigation";
import AestheticsClient from "./AestheticsClient";
import client from "@/lib/apolloClient";

async function getAestheticsData(searchParams) {
  const resolvedSearchParams = await searchParams;
  const isPreview = resolvedSearchParams?.preview === 'true';

  const query = isPreview ? ASTHETICS_QUERY_SLUG_PREVIEW : ASTHETICS_QUERY_SLUG;

  const { data } = await client.query({
    query,
    fetchPolicy: 'no-cache',
  });

  return data?.astheticsDetails;
}

export const revalidate = 3600;

export async function generateStaticParams() {
  try {
    const res = await fetch(process.env.NEXT_PUBLIC_GRAPHQL_URI, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${process.env.GRAPHQL_AUTH_TOKEN}` },
      body: JSON.stringify({ query: '{ astheticsDetails { Slug } }' }),
      cache: 'no-store',
    });
    const { data } = await res.json();
    return (data?.astheticsDetails || []).map(a => ({ slug: a.Slug }));
  } catch {
    return [];
  }
}

export async function generateMetadata({ params, searchParams }) {
  const { slug } = await params;
  const data = await getAestheticsData(searchParams);
  const asthetics = data?.find(p => p.Slug === slug);

  if (!asthetics) {
    return { title: "Aesthetics Not Found" };
  }

  const productionDomain = process.env.NEXT_PUBLIC_SITE_URL || "https://craiglinke.com.au";
  const seo = asthetics?.Seo;

  return {
    title: seo?.MetaTitle || 'Craig Linke',
    description: seo?.MetaDescription || "Default description",
    alternates: {
      canonical: asthetics?.CanonicalUrl || `${productionDomain}/aesthetics-details/${slug}`,
    },
  };
}

export default async function AestheticsDetail({ params, searchParams }) {
  const { slug } = await params;
  const data = await getAestheticsData(searchParams);
  const asthetics = data?.find((p) => p.Slug === slug);

  if (!asthetics) {
    return notFound();
  }

  return <AestheticsClient asthetics={data} />;
}
