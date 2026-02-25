"use client";

import TwoColumnLayout from "@/components/layouts/TwoColumnLayout";
import styles from "./services.module.css";
import SlideRight from "@/components/ui/animations/SlideRight";
import MediaRenderer from "@/components/common/MediaRenderer";
import Box from "@/components/ui/Box/Box";
import FadeUp from "@/components/ui/animations/FadeUp";
import Paragraph from "@/components/ui/Paragraph";
import Heading from "@/components/ui/Heading";
import LinkWithArrow from "@/components/ui/Link";
import { useEffect, useState } from "react";
import Image from "next/image";
import Divider from "@/components/ui/Divider";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function OurServices({ data }) {
  const { Title, Description, ServicesLists, Button, ShowInReverseLayout } =
    data;

  const defaultImageObject = {
    url: "/images/default-placeholder.jpg",
    alternativeText: "Default Team Placeholder",
  };

  const [currentImage, setCurrentImage] = useState(() => {
    if (
      ServicesLists &&
      ServicesLists.length > 0 &&
      ServicesLists[0].ServiceMedia
    ) {
      return ServicesLists[0].ServiceMedia;
    }
    return defaultImageObject;
  });

  useEffect(() => {
    if (ServicesLists && ServicesLists.length > 0) {
      setCurrentImage(ServicesLists[0].ServiceMedia || defaultImageObject);
    } else {
      setCurrentImage(defaultImageObject);
    }
  }, [ServicesLists]);

  const handleMouseEnter = (member) => {
    if (member.ServiceMedia) {
      setCurrentImage(member.ServiceMedia);
    }
  };

  const handleMouseLeave = () => {
    if (
      ServicesLists &&
      ServicesLists.length > 0 &&
      ServicesLists[0].ServiceMedia
    ) {
      setCurrentImage(ServicesLists[0].ServiceMedia);
    } else {
      setCurrentImage(defaultImageObject);
    }
  };

  const rows = [];

  for (let i = 0; i < ServicesLists.length; i += 2) {
    rows.push(ServicesLists.slice(i, i + 2));
  }

  const router = useRouter();

  const [isMobile, setIsMobile] = useState(false);
  const [mobilePreviewImage, setMobilePreviewImage] = useState(null);
  const [activeBoxIndex, setActiveBoxIndex] = useState(null);

  useEffect(() => {
    const checkScreen = () => setIsMobile(window.innerWidth < 1024);
    checkScreen();
    window.addEventListener("resize", checkScreen);
    return () => window.removeEventListener("resize", checkScreen);
  }, []);

  const handleMobileClick = (item, globalIndex, e) => {
    if (!isMobile) return;

    e.preventDefault();

    setActiveBoxIndex(globalIndex);

    setCurrentImage(item.ServiceMedia);

    setTimeout(() => {
      router.push(item.ServiceURL);
    }, 3000);
  };

  const leftContent = (
    <>
      <Box
        fullHeight
        direction="column"
        justify="space-between"
        mobileGap="90px"
        padding="0"
      >
        <FadeUp classes="p20">
          <div className="text-light uppercase pb20">{Title}</div>
          <Heading level={1} style={{ maxWidth: 476 }}>
            {Description}
          </Heading>
          <div className="pt20 pb30 hide-desktop">
            <LinkWithArrow
              text={Button?.ButtonText || "Read More"}
              href={Button?.ButtonURL || "#"}
            />
          </div>
        </FadeUp>
      </Box>
      <Box
        fullHeight
        direction={ShowInReverseLayout ? "row-reverse" : "row"}
        justify="space-between"
        align="flex-end"
        padding="20px"
        equalChildren
        className="hide-mobile"
      >
        <SlideRight className="fullHeight">
          <MediaRenderer
            media={currentImage}
            width={413}
            height={472}
            classes={"image"}
          />
        </SlideRight>
        <div className={ShowInReverseLayout ? "text-left" : "text-right"}>
          <LinkWithArrow
            text={Button?.ButtonText || "Read More"}
            href={Button?.ButtonURL || "#"}
          />
        </div>
      </Box>
    </>
  );

  const rightContent = (
    <>
      <Box
        fullHeight
        direction="column"
        justify="space-between"
        padding="0"
        equalChildren
      >
        {rows.map((row, rowIndex) => (
          <Box
            key={rowIndex}
            fullHeight
            direction="row"
            justify="space-between"
            borderBottom={rowIndex === 0}
            padding="0"
          >
            {row.map((item, itemIndex) => {

              const globalIndex = rowIndex * 2 + itemIndex;

              return (
              <Box
                className={`${styles.serviceBox}`}
                onMouseEnter={!isMobile ? () => handleMouseEnter(item) : undefined}
                onMouseLeave={!isMobile ? handleMouseLeave : undefined}
                onClick={(e) => handleMobileClick(item, globalIndex, e)}
                justify="center"
                align="center"
                key={itemIndex}
                borderRight={itemIndex === 0}
              >
                <Link
                  key={itemIndex}
                  href={item.ServiceURL || "#"}
                  className={`${styles.serviceBoxLink}`}
                >
                  <div className={`uppercase ${activeBoxIndex === globalIndex ? "hideText" : ""}`}>{item.ServiceName}</div>
                  {isMobile && activeBoxIndex === globalIndex && (
                    <div className={styles.mobileImageWrapper}>
                      <MediaRenderer
                        media={currentImage}
                        width={125}
                        height={150}
                      />
                    </div>
                  )}
                </Link>
              </Box>
            )
            })}
            {mobilePreviewImage && (
              <div className={styles.previewOverlay}>
                <MediaRenderer
                  media={mobilePreviewImage}
                  width={250}
                  height={300}
                  classes="previewImage"
                />
              </div>
            )}
          </Box>
        ))}
      </Box>
    </>
  );

  return (
    <>
      <section className="ourServices">
        <TwoColumnLayout
          height="85vh"
          left={leftContent}
          right={rightContent}
          showDivider
        />
      </section>
      <Divider />
    </>
  );
}
