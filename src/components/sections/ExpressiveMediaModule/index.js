'use client';

import MediaRenderer from "@/components/common/MediaRenderer";
import TwoColumnLayout from "@/components/layouts/TwoColumnLayout";
import Box from "@/components/ui/Box/Box";
import Divider from "@/components/ui/Divider";
import { useState } from "react";
import styles from "./expressiveMedia.module.css";
import dynamic from "next/dynamic";

const ExpressiveSlider = dynamic(() => import("./ExpressiveSlider"), { ssr: false });

export default function ExpressiveMediaModule({ data }) {
  const { LeftSideMedia, RightSideMedia } = data;
  const { EnableMuxVideo, MuxVideo, ImageORCarousel } = LeftSideMedia;
  const [prevEl, setPrevEl] = useState(null);
  const [nextEl, setNextEl] = useState(null);
  const [paginationEl, setPaginationEl] = useState(null);

  const leftContent = (
    <>
        <Box fullHeight direction="column" justify="space-between" mobileGap="90px" borderBottom mobileBorderBottom={false}>
        <ExpressiveSlider
          ImageORCarousel={ImageORCarousel}
          prevEl={prevEl}
          nextEl={nextEl}
          paginationEl={paginationEl}
        />
      </Box>
      <Box
        fullHeight
        direction="row"
        justify="space-between"
        align="flex-end"
        padding="0"
        equalChildren
        showDivider={true}
        hideMobileDivider={true}
      >
        <div className="p20">
          <div className={styles.sliderNav}>
            <button ref={(node) => setPrevEl(node)}>
              Prev
            </button>
            <div ref={(node) => setPaginationEl(node)} className="text-center"></div>
            <button ref={(node) => setNextEl(node)}>
              Next
            </button>
          </div>
        </div>
      </Box>
    </>
  );

  const rightContent = (
    <>
      <div className="p20 centerContent media">
        <MediaRenderer media={RightSideMedia} width={436} height={585} classes="fullWidth" />
      </div>
    </>
  );

  return (
    <>
    <Divider />
    <section className="expressiveMedia fitToScreen">
      <TwoColumnLayout fullHeight left={leftContent} right={rightContent} showDivider showMobileDivider={false} />
    </section>
    <Divider />
    </>
  );
}
