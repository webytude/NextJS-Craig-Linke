import MediaRenderer from "@/components/common/MediaRenderer";
import TwoColumnLayout from "@/components/layouts/TwoColumnLayout";
import FadeUp from "@/components/ui/animations/FadeUp";
import SlideLeft from "@/components/ui/animations/SlideLeft";
import SlideRight from "@/components/ui/animations/SlideRight";
import Box from "@/components/ui/Box/Box";
import Divider from "@/components/ui/Divider";
import Paragraph from "@/components/ui/Paragraph";
import { BlocksRenderer } from "@strapi/blocks-react-renderer";

export default function FourRowMediaAndText({ data }) {
  if (!data || data.length === 0) {
    return null;
  }
  const { Media, Content, Padding } = data;

  const {
    DesktopTopPadding,
    DesktopBottomPadding,
    MobileTopPadding,
    MobileBottomPadding,
  } = Padding || {};

  
  const styleVars = {};

  if (DesktopTopPadding != null) {
    styleVars["--desktop-pt"] = `${DesktopTopPadding}px`;
  }

  if (DesktopBottomPadding != null) {
    styleVars["--desktop-pb"] = `${DesktopBottomPadding}px`;
  }

  if (MobileTopPadding != null) {
    styleVars["--mobile-pt"] = `${MobileTopPadding}px`;
  }

  if (MobileBottomPadding != null) {
    styleVars["--mobile-pb"] = `${MobileBottomPadding}px`;
  }

  const rows = [];

  for (let i = 0; i < Content.length; i += 2) {
    rows.push(Content.slice(i, i + 2));
  }

  const leftContent = (
    <>
      {/* <div className="p20 centerContent"> */}
        <SlideRight className={`p20 centerContent media`}>
          <MediaRenderer media={Media} width={431} height={578} classes="fullWidth" />
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
              <Box key={itemIndex} borderRight={itemIndex === 0} style={{ minHeight: 360 }}>
                <div className="text-light uppercase pb20">
                  <FadeUp>
                  {item.Title}
                  </FadeUp>
                </div>
                <Paragraph>
                  <FadeUp>
                  <BlocksRenderer content={item.Content || []} />
                  </FadeUp>
                </Paragraph>
              </Box>
            ))}
          </Box>
        ))}
      </Box>
    </>
  );

  return (
    <>
      <Divider />
      <section className="FourRowMediaAndText padding fitToScreen" style={styleVars}>
        <TwoColumnLayout fullHeight left={leftContent} right={rightContent} showDivider />
      </section>
      <Divider />
    </>
  );
}
