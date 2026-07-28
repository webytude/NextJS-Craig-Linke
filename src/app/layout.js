import "./globals.css";
import { GLOBAL_QUERY } from "@/queries/queries";
import LayoutClient from "./LayoutClient";
import client from "@/lib/apolloClient";
import Script from "next/script";

export async function generateMetadata() {
  const productionDomain = process.env.NEXT_PUBLIC_SITE_URL || "https://www.craiglinke.com";

  try {
    const { data } = await client.query({
      query: GLOBAL_QUERY,
      fetchPolicy: "cache-first",
    });

    return {
      title: data?.global?.site_name || "Craig Linke",
      description: data?.global?.site_description || "Craig Linke is a boutique, Adelaide based building and interior design company.",
      metadataBase: new URL(productionDomain),
      alternates: {
        canonical: productionDomain,
      },
      openGraph: {
        title: data?.global?.site_name || "Craig Linke",
        description: data?.global?.site_description || "Craig Linke is a boutique, Adelaide based building and interior design company.",
        type: "website",
        url: productionDomain,
      },
      twitter: {
        card: "summary_large_image",
        title: data?.global?.site_name || "Craig Linke",
        description: data?.global?.site_description || "Craig Linke is a boutique, Adelaide based building and interior design company.",
      },
      verification: {
        google: "e6bYik4ximfOekIUbF5_utfkZasYsBiW1HREVUGGDuc",
      },
      icons: {
        icon: [{ url: data?.global?.site_favicon?.url || "/favicon.ico" }],
      },
    };
  } catch (error) {
    return {
      title: "Craig Linke",
      description: "Craig Linke is a boutique, Adelaide based building and interior design company.",
      metadataBase: new URL(productionDomain),
      alternates: {
        canonical: productionDomain,
      },
      icons: {
        icon: [{ url: "/favicon.ico" }],
      },
    };
  }
}

export default async function RootLayout({ children }) {
  const { data } = await client.query({
    query: GLOBAL_QUERY,
    fetchPolicy: "cache-first",
  });

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <Script
          id="gtm-script"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
        new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
        j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
        'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
        })(window,document,'script','dataLayer','GTM-M7253PM8');`,
          }}
        />
      </head>
      <body suppressHydrationWarning>
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-M7253PM8"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
        <LayoutClient globalData={data.global}>{children}</LayoutClient>
      </body>
    </html>
  );
}
