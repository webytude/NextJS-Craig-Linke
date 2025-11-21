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

export default function FullScreenMedia({ data }) {
  const { Title, FullScreenMedia, DefaultMedia, TextList } = data;
  const { EnableMuxVideo, MuxVideo, ImageORCarousel } = DefaultMedia;
  const [currentMedia, setCurrentMedia] = useState(DefaultMedia); 
  
  useEffect(() => {
    setCurrentMedia(DefaultMedia);
  }, [DefaultMedia]);
  
  const handleMouseEnter = (itemHoverMedia) => {
    if (itemHoverMedia) {
      setCurrentMedia(itemHoverMedia);
    } else {
      setCurrentMedia(DefaultMedia);
    }
  };
  
  const handleMouseLeave = () => {
    setCurrentMedia(DefaultMedia);
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
          {/* {EnableMuxVideo && MuxVideo?.playback_id && (
            <MuxPlayer
              playbackId={MuxVideo.playback_id}
              streamType="on-demand"
              autoPlay
              muted
              loop
              playsInline
              preload="auto"
              style={{ aspectRatio: '16 / 9', width: '100%', }}
            />
          )}
          {Array.isArray(ImageORCarousel) && ImageORCarousel.length === 1 && (
            <Image
                src={ImageORCarousel[0].url}
                alt={ImageORCarousel[0]?.alternativeText || ""}
                width={1905}
                height={1271}
                className={styles.mainMedia}
              />
          )} */}
        </div>
        <div className={styles.overlay}></div>

        <div className={styles.content}>
          <div className="flex justify-space-between p20">
            <div className="text-light uppercase">{Title}</div>
            <div className={styles.description}>
              <Paragraph>
                <BlocksRenderer content={FullScreenMedia || []} />
              </Paragraph>
            </div>
          </div>
          <div className={styles.aestheticsList}>
            <Grid>
              {TextList.map((item, index) => (
                <Box key={index} className="text-center" padding="0">
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
                        <Paragraph align="center">
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
              ))}
            </Grid>
          </div>
        </div>
      </div>
    </section>
  );
}
