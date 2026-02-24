import client from "@/lib/apolloClient";
import { gql } from "@apollo/client";

export default async function sitemap() {
  const baseUrl = "https://craiglinke.com.au";

  try {
    const { data: pageData } = await client.query({
      query: gql`
        query SitemapPages {
          pages(pagination: { limit: -1 }) {
            Slug
            updatedAt
            publishedAt
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
                publishedAt
            }
            }
        `,
        fetchPolicy: "no-cache",
    });

    const { data: journalData } = await client.query({
      query: gql`
        query SitemapJournals {
          journals(pagination: { limit: -1 }) {
            Slug
            updatedAt
            publishedAt
          }
        }
      `,
      fetchPolicy: "no-cache",
    });

    const { data: astheticsData } = await client.query({
      query: gql`
        query SitemapAsthetics {
          astheticsDetails(pagination: { limit: -1 }) {
            Slug
            updatedAt
            publishedAt
          }
        }
      `,
      fetchPolicy: "no-cache",
    });

    const pageUrls =
    pageData?.pages
      ?.filter(
        (page) => page.publishedAt && page.Slug !== "home"
      )
      ?.map((page) => ({
        url: `${baseUrl}/${page.Slug}`,
        lastModified: page.updatedAt,
      })) || [];

    const projectUrls =
      projectData?.projects
        ?.filter((project) => project.publishedAt)
        ?.map((project) => ({
          url: `${baseUrl}/projects/${project.Slug}`,
          lastModified: project.updatedAt,
        })) || [];

    const journalUrls =
      journalData?.journals
        ?.filter((journal) => journal.publishedAt)
        ?.map((journal) => ({
          url: `${baseUrl}/journals/${journal.Slug}`,
          lastModified: journal.updatedAt,
        })) || [];

    const astheticsUrls =
      astheticsData?.astheticsDetails
        ?.filter((item) => item.publishedAt)
        ?.map((item) => ({
          url: `${baseUrl}/aesthetics-details/${item.Slug}`,
          lastModified: item.updatedAt,
        })) || [];

    return [
      {
        url: baseUrl,
        lastModified: new Date()
      },
      ...pageUrls,
      ...projectUrls,
      ...journalUrls,
      ...astheticsUrls,
    ];
  } catch (error) {
    console.error("Sitemap generation error:", error);
    return [];
  }
}