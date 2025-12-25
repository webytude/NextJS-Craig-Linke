import { ASTHETICS_QUERY_SLUG, ASTHETICS_QUERY_SLUG_PREVIEW, GLOBAL_QUERY } from "@/queries/queries";
import { notFound } from "next/navigation";
import AestheticsClient from "./AestheticsClient";
import client from "@/lib/apolloClient";

async function getAestheticsData(searchParams) {
  const resolvedSearchParams = await searchParams;
  const isPreview = resolvedSearchParams?.preview === 'true';

  const query = isPreview
    ? ASTHETICS_QUERY_SLUG_PREVIEW
    : ASTHETICS_QUERY_SLUG;

  const { data } = await client.query({ 
    query,
    fetchPolicy: 'no-cache',
  });

  return data?.astheticsDetails;
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

  return {
    title: asthetics.MetaTitle || 'Craig Linke',
    description: asthetics.MetaDescription || "Default description"
  };
}

export default async function AestheticsDetail({ params, searchParams }) {
  const asthetics = await getAestheticsData(searchParams);

  if (!asthetics) {
    return notFound();
  }

  return <AestheticsClient asthetics={asthetics} />
}
