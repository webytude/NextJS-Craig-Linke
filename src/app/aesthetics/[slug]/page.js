import { ASTHETICS_QUERY_SLUG, GLOBAL_QUERY } from "@/queries/queries";
import { notFound } from "next/navigation";
import AestheticsClient from "./AestheticsClient";
import client from "@/lib/apolloClient";

async function getAestheticsData() {
  const { data } = await client.query({ 
    query: ASTHETICS_QUERY_SLUG,
  });
  return data?.astheticsDetails;
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const data = await getAestheticsData();
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

export default async function AestheticsDetail() {
  const asthetics = await getAestheticsData();

  if (!asthetics) {
    return notFound();
  }

  return <AestheticsClient asthetics={asthetics} />
}
