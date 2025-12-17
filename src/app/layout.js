import "./globals.css";
import { GLOBAL_QUERY } from "@/queries/queries";
import LayoutClient from "./LayoutClient";
import client from "@/lib/apolloClient";
import SmoothScrolling from "@/components/common/SmoothScrolling";


export async function generateMetadata() {
  const { data } = await client.query({
    query: GLOBAL_QUERY,
    fetchPolicy: 'no-cache',
  });

  return {
    title: data.global.site_name,
    description: data.global.site_description,
    icons: {
      icon: [{ url: data.global.site_favicon?.url || '/favicon.ico' }],
    },
  };
}

export const dynamic = "force-dynamic";

export default async function RootLayout({ children }) {
  const { data } = await client.query({
    query: GLOBAL_QUERY,
    fetchPolicy: 'no-cache',
  });

  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning>
        <SmoothScrolling />
        <LayoutClient globalData={data.global}>{children}</LayoutClient>
      </body>
    </html>
  );
}
