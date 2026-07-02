import AestheticsGlobalLayer from "@/components/ashetics/AestheticsGlobalLayer";
import Header from "@/components/common/Header";
import { AestheticsProvider } from "@/context/AestheticsContext";
import client from "@/lib/apolloClient";
import { ASTHETICS_QUERY_SLUG, GLOBAL_QUERY } from "@/queries/queries";

async function getAestheticsList() {
  const { data } = await client.query({ 
    query: ASTHETICS_QUERY_SLUG,
    fetchPolicy: "cache-first"
  });
  return data?.astheticsDetails || [];
}

async function getGlobleData() {
  const { data } = await client.query({ 
    query: GLOBAL_QUERY,
    fetchPolicy: "cache-first"
  });
  return data?.global || [];
}

export default async function AestheticsLayout({ children }) {
    const aestheticsList = await getAestheticsList();
    const headerData = await getGlobleData();

    const globalData = headerData;

  return (
     <AestheticsProvider>
        <Header globalData={globalData} />
      <AestheticsGlobalLayer allAestheticsData={aestheticsList} />

    {children}
      
    </AestheticsProvider>
  );
}