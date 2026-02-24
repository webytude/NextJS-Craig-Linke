import client from "@/lib/apolloClient";
import { gql } from "@apollo/client";

export default async function sitemap() {
  const baseUrl = "https://craiglinke.com.au";

  try {
    const { data } = await client.query({
      query: gql`
        query SitemapPages {
          pages(pagination: { limit: -1 }) {
            Slug
            updatedAt
          }
        }
      `,
      fetchPolicy: "no-cache",
    });

    const { data: projectData } = await client.query({
        query: gql`
            query SitemapProjects {
            projects(pagination: { limit: -1 }) {
                Slug
                updatedAt
            }
            }
        `,
        fetchPolicy: "no-cache",
    });

    const pageUrls = data?.pages?.map((page) => ({
      url:
        page.Slug === "home"
          ? baseUrl
          : `${baseUrl}/${page.Slug}`,
      lastModified: page.updatedAt,
    }));

    const projectUrls = projectData?.projects?.map((project) => ({
        url: `${baseUrl}/projects/${project.Slug}`,
        lastModified: project.updatedAt,
    }));

    return [
      {
        url: baseUrl,
        lastModified: new Date(),
      },
      ...pageUrls,
      ...projectUrls,
    ];
  } catch (error) {
    console.error("Sitemap generation error:", error);
    return [];
  }
}