import "./globals.css";
import { GLOBAL_QUERY } from "@/queries/queries";
import LayoutClient from "./LayoutClient";
import client from "@/lib/apolloClient";
import SmoothScrolling from "@/components/common/SmoothScrolling";
import Script from "next/script";


export async function generateMetadata() {
  const { data } = await client.query({
    query: GLOBAL_QUERY,
    fetchPolicy: 'no-cache',
  });

  return {
    title: data.global.site_name,
    description: data.global.site_description,
    verification: {
      google: "e6bYik4ximfOekIUbF5_utfkZasYsBiW1HREVUGGDuc",
    },
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
      <head>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-RWESQMF571"
          strategy="beforeInteractive"
        />
        <Script id="ga4-init" strategy="beforeInteractive">
          {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', 'G-RWESQMF571');`}
        </Script>
        <Script id="gtm-init" strategy="beforeInteractive">
          {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-M7253PM8');`}
        </Script>
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
        <SmoothScrolling />
        <LayoutClient globalData={data.global}>{children}</LayoutClient>
      </body>
    </html>
  );
}
