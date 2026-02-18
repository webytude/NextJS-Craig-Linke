'use client';

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

export default function OurServices({ data }) {

  const {Title, Description, ServicesLists, Button, ShowInReverseLayout} = data;

  console.log('OurServices data', data)

  const defaultImageObject = {
    url: '/images/default-placeholder.jpg',
    alternativeText: 'Default Team Placeholder',
  };

  const [currentImage, setCurrentImage] = useState(() => {
    if (ServicesLists && ServicesLists.length > 0 && ServicesLists[0].ServiceMedia) {
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
    if (ServicesLists && ServicesLists.length > 0 && ServicesLists[0].ServiceMedia) {
      setCurrentImage(ServicesLists[0].ServiceMedia);
    } else {
      setCurrentImage(defaultImageObject);
    }
  };

  const rows = [];

  for (let i = 0; i < ServicesLists.length; i += 2) {
    rows.push(ServicesLists.slice(i, i + 2));
  }

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
        </FadeUp>
      </Box>
      <Box
        fullHeight
        direction={ShowInReverseLayout ? "row-reverse" : "row"}
        justify="space-between"
        align="flex-end"
        padding="20px"
        equalChildren
      >
          <SlideRight>
              <MediaRenderer media={currentImage} width={413} height={472} classes={"image"} />
            </SlideRight>
        <div className={ShowInReverseLayout ? "text-left" : "text-right"}>
          <LinkWithArrow
              text={Button?.ButtonText || 'Read More'}
              href={Button?.ButtonURL || '#'}
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
            {row.map((item, itemIndex) => (
              
              <Box className={`${styles.serviceBox}`} onMouseEnter={() => handleMouseEnter(item)} onMouseLeave={handleMouseLeave} justify="center" align="center" key={itemIndex} borderRight={itemIndex === 0} >
                <Link key={itemIndex} href={item.ServiceURL || "#"} className={`${styles.serviceBoxLink}`}>
                  <div className="uppercase">{item.ServiceName}</div>
                </Link>
              </Box>
            ))}
          </Box>
        ))}
      </Box>
    </>
  );

  return (
    <>
    <section className="ourServices">
      <TwoColumnLayout height="85vh" left={leftContent} right={rightContent} showDivider />
    </section>
    <Divider />
    </>
  )
}
