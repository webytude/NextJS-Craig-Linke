import TwoColumnLayout from "@/components/layouts/TwoColumnLayout";
import styles from "./services.module.css";
import SlideRight from "@/components/ui/animations/SlideRight";
import MediaRenderer from "@/components/common/MediaRenderer";
import Box from "@/components/ui/Box/Box";
import FadeUp from "@/components/ui/animations/FadeUp";
import Paragraph from "@/components/ui/Paragraph";

export default function OurServices({ data }) {
  console.log('OurServices', data)

  const leftContent = (
    <>
      aasd
      {/* <div className="p20 centerContent"> */}
        <SlideRight className={`p20 centerContent media`}>
          {/* <MediaRenderer media={Media} width={431} height={578} classes="fullWidth" /> */}
        </SlideRight>
      {/* </div> */}
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
          <Box
            fullHeight
            direction="row"
            justify="space-between"
            padding="0"
          >
              <Box style={{ minHeight: 360 }}>
                <div className="text-light uppercase pb20">
                  <FadeUp>
                  asdas
                  </FadeUp>
                </div>
                <Paragraph>
                  <FadeUp>
                  asdas
                  </FadeUp>
                </Paragraph>
              </Box>
              <Box style={{ minHeight: 360 }}>
                <div className="text-light uppercase pb20">
                  <FadeUp>
                  asdas
                  </FadeUp>
                </div>
                <Paragraph>
                  <FadeUp>
                  asdas
                  </FadeUp>
                </Paragraph>
              </Box>
              <Box style={{ minHeight: 360 }}>
                <div className="text-light uppercase pb20">
                  <FadeUp>
                  asdas
                  </FadeUp>
                </div>
                <Paragraph>
                  <FadeUp>
                  asdas
                  </FadeUp>
                </Paragraph>
              </Box>
              <Box style={{ minHeight: 360 }}>
                <div className="text-light uppercase pb20">
                  <FadeUp>
                  asdas
                  </FadeUp>
                </div>
                <Paragraph>
                  <FadeUp>
                  asdas
                  </FadeUp>
                </Paragraph>
              </Box>
          </Box>
      </Box>
    </>
  );

  return (
    <TwoColumnLayout fullHeight left={leftContent} right={rightContent} showDivider />
  )
}
