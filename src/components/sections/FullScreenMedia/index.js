"use client";

import { renderRichText } from "@/utils/richText";
import { useEffect, useState } from "react";
import styles from "./fullScreenMedia.module.css";
import Image from "next/image";
import Paragraph from "@/components/ui/Paragraph";
import Grid from "@/components/ui/Grid/Grid";
import Box from "@/components/ui/Box/Box";
import Heading from "@/components/ui/Heading";
import Divider from "@/components/ui/Divider";
import Spacer from "@/components/ui/Spacer";
import LinkWithArrow from "@/components/ui/Link";
import { BlocksRenderer } from "@strapi/blocks-react-renderer";
import MediaRenderer from "@/components/common/MediaRenderer";
import MuxPlayer from "@mux/mux-player-react";
import classNames from 'classnames';
import FadeUp from "@/components/ui/animations/FadeUp";

export default function FullScreenMedia({ data }) {
  const { Title, FullScreenMedia, DefaultMedia, TextList } = data;
  const { EnableMuxVideo, MuxVideo, ImageORCarousel } = DefaultMedia;
  const [currentMedia, setCurrentMedia] = useState(DefaultMedia); 
  const [activeItem, setActiveItem] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  
  useEffect(() => {
    setCurrentMedia(DefaultMedia);
  }, [DefaultMedia]);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.matchMedia("(max-width: 768px)").matches);
    };

    checkMobile(); 
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);
  
  const handleMouseEnter = (itemHoverMedia) => {
    if (!isMobile && itemHoverMedia) {
      setCurrentMedia(itemHoverMedia);
    } else if (!isMobile) {
      setCurrentMedia(DefaultMedia);
    }
  };
  
  const handleMouseLeave = () => {
    if (!isMobile) {
      setCurrentMedia(DefaultMedia);
    }
  };

  const handleMobileClick = (item, index) => {
    if (!isMobile) return; 

    if (activeItem === index) {
      setActiveItem(null);
      setCurrentMedia(DefaultMedia);
    } else {
      setActiveItem(index);
      if (item.HoverMedia) {
        setCurrentMedia(item.HoverMedia);
      } else {
        setCurrentMedia(DefaultMedia);
      }
    }
  };

  return (
    <section className="aesthetics FullScreenMedia">
      <div className="positionRelative">
        <div className={styles.backgroundWrapper}>
          {currentMedia?.EnableMuxVideo && currentMedia?.MuxVideo?.playback_id && (
            <MuxPlayer
              playbackId={currentMedia.MuxVideo.playback_id}
              streamType="on-demand"
              autoPlay
              muted
              loop
              playsInline
              preload="auto"
              style={{ aspectRatio: '16 / 9', width: '100%', height: '100%' }}
            />
          )}
          {!currentMedia?.EnableMuxVideo && Array.isArray(currentMedia?.ImageORCarousel) && currentMedia.ImageORCarousel.length === 1 && (
            <Image
              src={currentMedia.ImageORCarousel[0].url}
              alt={currentMedia.ImageORCarousel[0]?.alternativeText || ""}
              width={1905}
              height={1271}
              className={styles.mainMedia}
            />
          )}
        </div>
        <div className={styles.overlay}></div>

        <div className={styles.content}>
          <div className={`${styles.aestheticsContent} flex justify-space-between p20`}>
            <FadeUp><div className="text-light uppercase">{Title}</div></FadeUp>
            <div className={styles.description}>
              <FadeUp>
              <Paragraph>
                <BlocksRenderer content={FullScreenMedia || []} />
              </Paragraph>
              </FadeUp>
            </div>
          </div>
          <div className={styles.aestheticsList}>
            <Grid>
              {TextList.map((item, index) => {
                const isActive = activeItem === index;
                const isItemHoverMediaCurrent = currentMedia === item.HoverMedia;
                return (
                  <Box key={index} className={styles.aestheticsListContent} padding="0">
                    <div
                      onMouseEnter={!isMobile ? () => handleMouseEnter(item.HoverMedia) : undefined}
                      onMouseLeave={!isMobile ? handleMouseLeave : undefined}
                      onClick={isMobile ? () => handleMobileClick(item, index) : undefined}
                      className={classNames(styles.listItemWrapper, {
                        [styles.activeOnMobile]: isMobile && isActive,
                      })}
                    >
                      <FadeUp>
                      <Heading level={4} className={styles.listItemHeading}>
                        {item.Title}
                        {isMobile && (
                          <span className={styles.toggleIcon}>
                            {isActive ? (
                              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M5 12H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                              </svg>
                            ) : (
                              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M12 5V19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                <path d="M5 12H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                              </svg>
                            )}
                          </span>
                        )}
                      </Heading>
                      <Divider color="#EAEAE8" className={styles.divider} />
                      </FadeUp>
                      <div
                        className={classNames(styles.listContent, {
                          [styles.show]: (!isMobile && isItemHoverMediaCurrent) || (isMobile && isActive),
                        })}
                      >
                        <div>
                          <Paragraph>
                            <BlocksRenderer
                              content={item.HoverDescription || []}
                            />
                          </Paragraph>
                        </div>
                        <Spacer desktop={20} />
                        <div className={styles.readMore}>
                          <LinkWithArrow text="READ MORE" href="#" />
                        </div>
                      </div>
                    </div>
                  </Box>
                )
              })}
              {/* {TextList.map((item, index) => (
                <Box key={index} className={styles.aestheticsListContent} padding="0">
                  <div
                    onMouseEnter={() => handleMouseEnter(item.HoverMedia)}
                    onMouseLeave={handleMouseLeave}
                  >
                    <Heading level={4} style={{ cursor: "pointer" }}>
                      {item.Title}
                    </Heading>
                    <Divider color="#EAEAE8" margin="22px 0px" />
                    <div
                      className={`${styles.listContent} ${
                        currentMedia === item.HoverMedia ? styles.show : ""
                      }`}
                    >
                      <div>
                        <Paragraph>
                          <BlocksRenderer
                            content={item.HoverDescription || []}
                          />
                        </Paragraph>
                      </div>
                      <Spacer desktop={20} />
                      <div>
                        <LinkWithArrow text="READ MORE" href="#" />
                      </div>
                    </div>
                  </div>
                </Box>
              ))} */}
            </Grid>
          </div>
        </div>
      </div>
    </section>
  );
}
