// "use client";

import { PAGES_QUERY } from "@/queries/queries";
import DynamicClientPage from "./DynamicClientPage";
import { notFound } from "next/navigation";
import client from "@/lib/apolloClient";

async function getPageData(slug) {
  
  const { data } = await client.query({ 
    query: PAGES_QUERY, 
    variables: { slug } 
  });
  
  return data?.pages?.find(p => p.Slug === slug); 
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const page = await getPageData(slug);

  if (!page) {
    return {
      title: "Page Not Found",
    };
  }

  return {
    title: page.MetaTitle || 'Craig Linke',
    description: page.MetaDescription || 'Craig Linke is a boutique, Adelaide based building and interior design company. We specialise in architectural builds and custom renovation projects.',
  };
}

export default async function page({ params }) {
  const { slug } = await params;
  const page = await getPageData(slug);

  if (!page) {
    return notFound();
  }

  return <DynamicClientPage page={page} />;
}

