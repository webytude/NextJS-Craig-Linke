"use client";

import Loading from "@/components/common/Loading";
import { ASTHETICS_QUERY_SLUG } from "@/queries/queries";
import { useQuery } from "@apollo/client/react";
import PageNotFound from "../PageNotFound";
import { useEffect } from "react";

export default function Aesthetics() {
  const { data, loading, error } = useQuery(ASTHETICS_QUERY_SLUG, {
      fetchPolicy: "cache-first",
      notifyOnNetworkStatusChange: true,
    });

    const astheticsData = data?.astheticsDetails;

    useEffect(() => {
        const finalTheme = "Malt";
        window.__PAGE_THEME_COLOR__ = finalTheme;
        window.dispatchEvent(new Event("theme-change"));
      }, []);

    console.log('astheticsData', astheticsData)

    if (loading) return <Loading />;
      if (error) return <p>Error loading data</p>;
      if (!astheticsData) return <PageNotFound />;

  return (
    <div>
      Aesthetics
    </div>
  )
}
