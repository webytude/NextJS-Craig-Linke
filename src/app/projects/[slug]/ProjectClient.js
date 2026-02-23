"use client";

import { PROJECTS_QUERY_SLUG } from "@/queries/queries";
import { useApolloClient } from "@apollo/client/react";
import { useParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
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
import Testimonial from "@/components/sections/Testimonial";

export default function ProjectClient({ projects }) {

  // const [project, setProject] = useState(null);
  // const [loading, setLoading] = useState(true);
  // const [error, setError] = useState(null);

  const [activeImageId, setActiveImageId] = useState(null);
  const [contentOpacity, setContentOOpacity] = useState(1);
  const imageRefs = useRef({});

  // useEffect(() => {
  //   if (!slug) {
  //     setLoading(false);
  //     setError(new Error("No project slug provided."));
  //     return;
  //   }

  //   const fetchProject = async () => {
  //     setLoading(true);
  //     setError(null);
  //     setProject(null);

  //     try {
  //       const { data: fetchedApolloData, errors: apolloErrors } =
  //         await client.query({
  //           query: PROJECTS_QUERY_SLUG,
  //           variables: { slug: slug },
  //           fetchPolicy: "network-only",
  //         });

  //       if (apolloErrors) {
  //         console.error("GraphQL Query Errors:", apolloErrors);
  //         setError(new Error(apolloErrors.map((e) => e.message).join(", ")));
  //         return;
  //       }

  //       const fetchedProject = fetchedApolloData?.projects?.[0];

  //       if (fetchedProject) {
  //         setProject(fetchedProject);
  //       } else {
  //         setError(new Error(`Project with slug "${slug}" not found.`));
  //       }
  //     } catch (err) {
  //       console.error("Error fetching project details:", err);
  //       setError(new Error(`Failed to load project: ${err.message}`));
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchProject();
  // }, [slug, client]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const fadeLimit = 300;

      let newOpacity = 1 - scrollPosition / fadeLimit;

      if (newOpacity < 0) newOpacity = 0;
      if (newOpacity > 1) newOpacity = 1;

      setContentOOpacity(newOpacity);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const finalTheme = "White";
    window.__PAGE_THEME_COLOR__ = finalTheme;
    window.dispatchEvent(new Event("theme-change"));
  }, []);

  const galleryMediaBlocks = Array.isArray(projects?.Blocks)
    ? projects?.Blocks.filter(
        (block) => block.__typename === "ComponentGlobalProjectMedia"
      )
    : [];

  useEffect(() => {
    if (galleryMediaBlocks.length === 0) return;

    const observerOptions = {
      root: null,
      rootMargin: "-50% 0px -50% 0px",
      threshold: 0,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveImageId(entry.target.getAttribute("data-id"));
        }
      });
    }, observerOptions);

    galleryMediaBlocks.forEach((block) => {
      const el = imageRefs.current[block.id];
      if (el) observer.observe(el);
    });

    return () => {
      observer.disconnect();
    };
  }, [galleryMediaBlocks]);

  const handleThumbnailClick = (id) => {
    const element = imageRefs.current[id];
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  };

  const materialSectionData =
    Array.isArray(projects?.Materials) && projects?.Materials.length > 0
      ? projects?.Materials[0]
      : null;

  const relatedProjects = Array.isArray(projects?.Blocks)
    ? projects?.Blocks.filter(
        (block) => block.__typename === "ComponentSectionExploreProjects"
      )
    : null;

  // const fadeStyle = {
  //   opacity: contentOpacity,
  //   transition: 'opacity 0.1s ease-out',
  //   pointerEvents: contentOpacity === 0 ? 'none' : 'auto',
  // };

  console.log('projects', projects)

  return (
    <>
      <div className="hide-mobile">
        <section>
          <div className={styles.pageWrapper}>
            <div className={styles.leftColumn}>
              <div className={`${styles.specification} p20`}>
                {/* {projects.Metadata.map((specific, index) => (
                  <div>
                    <label>{specific.Label}</label>
                    {specific.Value}
                  </div>
                ))} */}                
                <BlocksRenderer content={projects.LeftDescription || []} />                
              </div>
              {/* <div className={styles.bottomWrapper}>
                {galleryMediaBlocks.length > 0 && (
                  <div
                    className={`${styles.materialsPhoto} ${styles.leftGallery} p20`}
                  >
                    <div className={styles.galleryBlock}>
                      {galleryMediaBlocks.map((block) => {
                        const isActive = activeImageId === block.id;

                        return (
                          <div
                            key={block.id}
                            onClick={() => handleThumbnailClick(block.id)}
                            style={{
                              transition: "filter 0.3s ease",
                              filter: isActive
                                ? "grayscale(0%)"
                                : "grayscale(100%)",
                              opacity: isActive ? 1 : 0.5,
                              cursor: "pointer",
                            }}
                            className={styles.galleryThumb}
                          >
                            <MediaRenderer
                              media={block}
                              width={40}
                              height={40}
                            />
                          </div>
                        );
                      })}

                      {galleryMediaBlocks.map((block) => (
                    <div key={block.id}>
                      <MediaRenderer media={block} width={40} height={57} />
                    </div>
                  ))}
                    </div>
                  </div>
                )}
                <Divider color="#D0D0D0" />
                <div className="text-center font12 uppercase p20">
                  GALLERY MODE
                </div>
              </div> */}
            </div>
            <div className={styles.middleColumn}>
              <div className={styles.gallery}>
                {projects?.Blocks?.map((block, index) => {
                  const key = block?.id
                    ? `${block.__typename}-${block.id}`
                    : `${block.__typename}-${index}`;                    

                  switch (block.__typename) {
                    case "ComponentGlobalProjectMedia":
                    
                      const isPortrait = block.MediaType === "Portrait";
                      const mediaWidth = isPortrait ? 524 : 720;
                      const mediaHeight = isPortrait ? 746 : 500;

                      return (
                        <div
                          key={key}
                          className={styles.imageWrapper}
                          ref={(el) => (imageRefs.current[block.id] = el)}
                          data-id={block.id}
                        >
                          <MediaRenderer
                            media={block}
                            width={mediaWidth}
                            height={mediaHeight}
                            videoWidth={mediaWidth}
                            videoHeight={mediaHeight}
                          />
                        </div>
                      );

                    case "ComponentSectionTestimonial":
                      return <Testimonial key={key} data={block} />;

                    default:
                      return null;
                  }
                })}

              </div>
            </div>

            <div className={styles.rightColumn}>
              <div className="p20">
                <Heading level={1} color="#000" className={styles.heading}>
                  {projects.Name}
                  <span>{projects?.SubTitle}</span>
                </Heading>
                <Paragraph className={styles.paragraph}>
                  <BlocksRenderer content={projects.Description || []} />
                </Paragraph>
              </div>

              <div
                className={`${styles.bottomWrapper} flex justify-space-between flex-end p20`}
              >
                {materialSectionData && (
                  <>
                    <div className={styles.materials}>
                      {materialSectionData.Tile && (
                        <div>{materialSectionData.Tile}</div>
                      )}
                      <ol>
                        {Array.isArray(materialSectionData.Materials) &&
                          materialSectionData.Materials.map(
                            (material, index) => (
                              <li key={index}>{material.Title}</li>
                            )
                          )}
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
        <Divider color="#D0D0D0" />
        {relatedProjects.length > 0 && (
          <RelatedProjects data={relatedProjects} />
        )}
      </div>
      <div className="hide-desktop">
        <div className={styles.detailWrapper}>
          <div className={styles.productImg}>
            <MediaRenderer
              media={projects.Media}
              width={358}
              height={510}
              classes={"image"}
            />
          </div>
          <div className={styles.detailContent}>
            <Heading level={5} color="#000">
              {projects.Name}
            </Heading>
            <Paragraph className={styles.paragraph}>
              <BlocksRenderer content={projects.Description || []} />
            </Paragraph>
          </div>
          <div className={`${styles.specification}`}>
            <BlocksRenderer content={projects.LeftDescription || []} />
          </div>
          {galleryMediaBlocks.length > 0 && (
            <div className={styles.gallery}>
              {projects?.Blocks?.map((block, index) => {
                const key = block?.id
                  ? `${block.__typename}-${block.id}`
                  : `${block.__typename}-${index}`;                    

                switch (block.__typename) {
                  case "ComponentGlobalProjectMedia":
                  
                    const isPortrait = block.MediaType === "Portrait";
                    const mediaWidth = isPortrait ? 524 : 720;
                    const mediaHeight = isPortrait ? 746 : 500;

                    return (
                      <div
                        key={key}
                        className={styles.imageWrapper}
                        ref={(el) => (imageRefs.current[block.id] = el)}
                        data-id={block.id}
                      >
                        <MediaRenderer
                          media={block}
                          width={mediaWidth}
                          height={mediaHeight}
                        />
                      </div>
                    );

                  case "ComponentSectionTestimonial":
                    return <Testimonial key={key} data={block} />;

                  default:
                    return null;
                }
              })}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
