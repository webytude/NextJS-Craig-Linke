"use client";

import { useState } from "react";
import Image from "next/image";
import styles from "./aesthetics.module.css";
import Grid from "../ui/Grid/Grid";
import Box from "../ui/Box/Box";
import LinkWithArrow from "../ui/Link";
import Divider from "../ui/Divider";
import Paragraph from "../ui/Paragraph";
import Heading from "../ui/Heading";
import Spacer from "../ui/Spacer";

export default function Aesthetics() {
  const [hovered, setHovered] = useState(null);

  const media = {
    default: { type: "image", src: "/images/aesthetics.jpg" },
    "New Heritage": { type: "video", src: "/images/aesthetics.mp4" },
    "Tailored Aesthetic": {
      type: "image",
      src: "/images/aesthetics-tailored.jpg",
    },
    "Contemporary Classic": { type: "video", src: "/images/aesthetics.mp4" },
  };

  const current = hovered ? media[hovered] : media.default;
  
  return (
    <section className="aesthetics">
    <div className="positionRelative">
      <div className={styles.backgroundWrapper}>
        {current.type === "image" ? (
          <Image
            src={current.src}
            alt="Aesthetics Background"
            width={1905}
            height={1271}
            className={styles.mainMedia}
            priority
          />
        ) : (
          <video
            className={styles.mainMedia}
            src={current.src}
            autoPlay
            muted
            loop
            playsInline
            key={current.src}
            poster="/images/aesthetics.jpg"
            width={"100%"}
          />
        )}
      </div>
      <div className={styles.overlay}></div>

      <div className={styles.content}>
        <div className="flex justify-space-between p20">
          <div className="text-light">OUR AESTHETICS</div>
          <div className={styles.description}>
            <Paragraph>
              Our work blends three complementary aestheticsNew Heritage, with its
            grounding in tradition and natural materials; Contemporary Classic,
            defined by clean lines, refined proportions, and a sense of timeless
            elegance and a Tailored aesthetic, where every detail is considered
            and crafted with precision.
            </Paragraph>
          </div>
        </div>
        <div className={styles.aestheticsList}>
          <Grid>
            {Object.keys(media)
              .filter((key) => key !== "default")
              .map((title) => (
                <Box key={title} className="text-center" padding="0">
                  <div
                    onMouseEnter={() => setHovered(title)}
                    onMouseLeave={() => setHovered(null)}
                  >
                    <Heading level={4} style={{ cursor: 'pointer' }}>{title}</Heading>
                    <Divider color="#EAEAE8" margin="22px 0px" />
                    <div
                      className={`${styles.listContent} ${
                        hovered === title ? styles.show : ""
                      }`}
                    >
                      <div>
                        <Paragraph align="center">
                          Our work blends three complementary aestheticsNew
                          Heritage, with its grounding in tradition and natural
                          materials; Contemporary Classic, defined by clean
                          lines, refined proportions, and a sense of timeless
                          elegance and a Tailored aesthetic, where every detail
                          is considered and crafted with precision.
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
