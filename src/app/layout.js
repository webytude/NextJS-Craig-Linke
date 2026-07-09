import "./globals.css";
import { headers } from "next/headers";
import {
  GLOBAL_QUERY,
  PAGE_SCHEMA_QUERY,
  PROJECT_SCHEMA_QUERY,
  JOURNAL_SCHEMA_QUERY,
} from "@/queries/queries";
import LayoutClient from "./LayoutClient";
import client from "@/lib/apolloClient";
import SmoothScrolling from "@/components/common/SmoothScrolling";
import Script from "next/script";

const RESERVED_TOP_LEVEL_SLUGS = new Set(["projects", "journals", "aesthetics-details"]);

async function getSchemaMarkup(pathname) {
  const segments = pathname.split("/").filter(Boolean);

  let query;
  let slug;

  if (segments.length === 0) {
    query = PAGE_SCHEMA_QUERY;
    slug = "home";
  } else if (segments[0] === "projects" && segments.length === 2) {
    query = PROJECT_SCHEMA_QUERY;
    slug = segments[1];
  } else if (segments[0] === "journals" && segments.length === 2) {
    query = JOURNAL_SCHEMA_QUERY;
    slug = segments[1];
  } else if (segments.length === 1 && !RESERVED_TOP_LEVEL_SLUGS.has(segments[0])) {
    query = PAGE_SCHEMA_QUERY;
    slug = segments[0];
  } else {
    return null;
  }

  try {
    const { data } = await client.query({
      query,
      variables: { slug },
      fetchPolicy: "no-cache",
    });

    const entity = data?.pages?.[0] || data?.projects?.[0] || data?.journals?.[0];
    return entity?.Seo?.SchemaMarkup || null;
  } catch (error) {
    console.error("Error fetching schema markup:", error);
    return null;
  }
}


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

export const revalidate = 3600;

export default async function RootLayout({ children }) {
  const { data } = await client.query({
    query: GLOBAL_QUERY,
    fetchPolicy: 'no-cache',
  });

  const headersList = await headers();
  const pathname = headersList.get('x-pathname') || '/';
  const schemaMarkup = await getSchemaMarkup(pathname);

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {schemaMarkup && (
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: typeof schemaMarkup === 'string' ? schemaMarkup : JSON.stringify(schemaMarkup)
            }}
          />
        )}
        {/* <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-RWESQMF571"
          strategy="beforeInteractive"
        />
        <Script id="ga4-init" strategy="beforeInteractive">
          {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', 'G-RWESQMF571');`}
        </Script> */}
        {/* <Script id="gtm-init" strategy="beforeInteractive">
          {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-M7253PM8');`}
        </Script> */}
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
        <SmoothScrolling />
        <LayoutClient globalData={data.global}>{children}</LayoutClient>
      </body>
    </html>
  );
}
