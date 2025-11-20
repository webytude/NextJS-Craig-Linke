"use client";

import Loading from "@/components/common/Loading";
import { GET_BY_SLUG_JOURNALS } from "@/queries/queries";
import { useApolloClient } from "@apollo/client/react";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function JournalDetails() {
  const params = useParams();
  const slug = params?.slug;
  const client = useApolloClient();

  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!slug) {
      setLoading(false);
      setError(new Error("No project slug provided."));
      return;
    }

    const fetchProject = async () => {
      setLoading(true);
      setError(null);
      setProject(null);

      try {
        const { data: fetchedApolloData, errors: apolloErrors } =
          await client.query({
            query: GET_BY_SLUG_JOURNALS,
            variables: { slug: slug },
            fetchPolicy: "network-only",
          });

        if (apolloErrors) {
          console.error("GraphQL Query Errors:", apolloErrors);
          setError(new Error(apolloErrors.map((e) => e.message).join(", ")));
          return;
        }

        const fetchedProject = fetchedApolloData?.journals?.[0];

        console.log("fetchedProject", fetchedProject);

        if (fetchedProject) {
          setProject(fetchedProject);
        } else {
          setError(new Error(`Project with slug "${slug}" not found.`));
        }
      } catch (err) {
        console.error("Error fetching project details:", err);
        setError(new Error(`Failed to load project: ${err.message}`));
      } finally {
        setLoading(false);
      }
    };

    fetchProject();
  }, [slug, client]);

  useEffect(() => {
    const finalTheme = "Pinot";
    window.__PAGE_THEME_COLOR__ = finalTheme;
    window.dispatchEvent(new Event("theme-change"));
  }, []);

  if (loading) return <Loading />;
  if (error) return <p>Error: {error.message}</p>;
  if (!project) return <p>Project not found.</p>;

  return <div>JournalDetails</div>;
}
