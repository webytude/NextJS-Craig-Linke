"use client";

import { PROJECTS_QUERY_SLUG } from "@/queries/queries";
import { useApolloClient } from "@apollo/client/react";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import styles from "./detail.module.css";
import Image from "next/image";
import Divider from "@/components/ui/Divider";
import Heading from "@/components/ui/Heading";
import Paragraph from "@/components/ui/Paragraph";
import Spacer from "@/components/ui/Spacer";
import { BlocksRenderer } from "@strapi/blocks-react-renderer";
import MediaRenderer from "@/components/common/MediaRenderer";
import RelatedProjects from "@/components/sections/RelatedProjects";
import Loading from "@/components/common/Loading";

export default function ProjectDetail() {
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
            query: PROJECTS_QUERY_SLUG,
            variables: { slug: slug },
            fetchPolicy: "network-only",
          });

        if (apolloErrors) {
          console.error("GraphQL Query Errors:", apolloErrors);
          setError(new Error(apolloErrors.map((e) => e.message).join(", ")));
          return;
        }

        const fetchedProject = fetchedApolloData?.projects?.[0];

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
    const finalTheme = "White";
    window.__PAGE_THEME_COLOR__ = finalTheme;
    window.dispatchEvent(new Event("theme-change"));
  }, []);

  if (loading) return <Loading />;
  if (error) return <p>Error: {error.message}</p>;
  if (!project) return <p>Project not found.</p>;

  const materialSectionData =
    Array.isArray(project.Materials) && project.Materials.length > 0
      ? project.Materials[0]
      : null;

  const galleryMediaBlocks = Array.isArray(project.Blocks)
    ? project.Blocks.filter(
        (block) => block.__typename === "ComponentGlobalProjectMedia"
      )
    : [];

  const relatedProjects = Array.isArray(project.Blocks)
  ? project.Blocks.filter(
      (block) => block.__typename === "ComponentSectionExploreProjects"
    )
  : null;

  return (
    <>
      <div className="hide-mobile">
      <section>
        <div className={styles.pageWrapper}>
          <div className={styles.leftColumn}>
            <div className={`${styles.specification} p20`}>
              <div>
                <label>LOCATION</label>
                {project.Location}
              </div>
              <div>
                <label>YEAR</label>
                {project.Year}
              </div>
              <div>
                <label>ARCHITECTURE</label>
                {project.Architecture}
              </div>
              <div>
                <label>PHOTOGRAPHY</label>
                {project.Photography}
              </div>
              <div>
                <label>AESTHETIC</label>
                {project.Aesthetic}
              </div>
            </div>
            <div className={styles.bottomWrapper}>
              {galleryMediaBlocks.length > 0 && (
                <div className={`${styles.materialsPhoto} ${styles.leftGallery} p20`}>
                  <div className={styles.galleryBlock}>
                  {galleryMediaBlocks.map((block) => (
                    <div key={block.id}>
                      <MediaRenderer media={block} width={40} height={57} />
                    </div>
                  ))}
                  </div>
                </div>
              )}
              <Divider />
              <div className="text-center font12 uppercase p20">
                GALLERY MODE
              </div>
            </div>
          </div>
          <div className={styles.middleColumn}>
            {galleryMediaBlocks.length > 0 && (
              <div className={styles.gallery}>
                {galleryMediaBlocks.map((block) => {
                  const isPortrait = block.MediaType === 'Portrait';
                  const mediaWidth = isPortrait ? 524 : 720;
                  const mediaHeight = isPortrait ? 746 : 500;

                  return (
                    <div key={block.id} className={styles.imageWrapper}>
                      <MediaRenderer
                        media={block}
                        width={mediaWidth}
                        height={mediaHeight} 
                      />
                    </div>
                  );
                })}
              </div>
            )}
          </div>
          <div className={styles.rightColumn}>
            <div className="p20">
              <Heading level={5} color="#000">{project.Name}</Heading>
              <Paragraph className={styles.paragraph}>
                <BlocksRenderer content={project.Description || []} />
              </Paragraph>
            </div>

            <div
              className={`${styles.bottomWrapper} flex justify-space-between p20`}
            >
              {materialSectionData && (
                <>
                  <div className={styles.materials}>
                    {materialSectionData.Tile && (
                      <div>{materialSectionData.Tile}</div>
                    )}
                    <ol>
                      {Array.isArray(materialSectionData.Materials) &&
                        materialSectionData.Materials.map((material, index) => (
                          <li key={index}>{material.Title}</li>
                        ))}
                    </ol>
                  </div>

                  <div className={styles.materialsPhoto}>
                    {Array.isArray(materialSectionData.Materials) &&
                      materialSectionData.Materials.map((material, index) => (
                        <div key={index}>
                          {material.Image?.url && (
                            <Image
                              src={material.Image.url}
                              alt={
                                material.Image?.alternativeText ||
                                material.Title ||
                                "Material Image"
                              }
                              width={36}
                              height={36}
                            />
                          )}
                        </div>
                      ))}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </section>
      <Divider />
      {relatedProjects.length > 0 && <RelatedProjects data={relatedProjects} />}
      </div>
      <div className="hide-desktop">
          <div className={styles.detailWrapper}>
            <div className={styles.productImg}>
              <MediaRenderer
                media={project.Media}
                width={358}
                height={510}
                classes={'image'}
              />
            </div>
            <div className={styles.detailContent}>
              <Heading level={5} color="#000">{project.Name}</Heading>
              <Paragraph className={styles.paragraph}>
                <BlocksRenderer content={project.Description || []} />
              </Paragraph>
            </div>
            <div className={`${styles.specification}`}>
              <div>
                <label>LOCATION</label>
                {project.Location}
              </div>
              <div>
                <label>YEAR</label>
                {project.Year}
              </div>
              <div>
                <label>ARCHITECTURE</label>
                {project.Architecture}
              </div>
              <div>
                <label>PHOTOGRAPHY</label>
                {project.Photography}
              </div>
              <div>
                <label>AESTHETIC</label>
                {project.Aesthetic}
              </div>
            </div>
              {galleryMediaBlocks.length > 0 && (
              <div className={styles.gallery}>
                {galleryMediaBlocks.map((block) => {
                  const isPortrait = block.MediaType === 'Portrait';
                  const mediaWidth = isPortrait ? 524 : 720;
                  const mediaHeight = isPortrait ? 746 : 500;

                  return (
                    <div key={block.id} className={styles.imageWrapper}>
                      <MediaRenderer
                        media={block}
                        width={mediaWidth}
                        height={mediaHeight} 
                      />
                    </div>
                  );
                })}
              </div>
            )}
          </div>
      </div>
    </>
  );
}
