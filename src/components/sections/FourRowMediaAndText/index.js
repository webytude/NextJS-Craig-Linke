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

  const sectionStyle = {};

  const hasPaddingData = Padding && Object.keys(Padding).length > 0;

  if (hasPaddingData) {
    const {
      DesktopTopPadding = 0,
      DesktopBottomPadding = 0,
      MobileTopPadding = 0,
      MobileBottomPadding = 0,
    } = Padding;

    sectionStyle['--desktop-top-padding'] = `${DesktopTopPadding}px`;
    sectionStyle['--desktop-bottom-padding'] = `${DesktopBottomPadding}px`;
    sectionStyle['--mobile-top-padding'] = `${MobileTopPadding}px`;
    sectionStyle['--mobile-bottom-padding'] = `${MobileBottomPadding}px`;
  }

  const rows = [];

  for (let i = 0; i < Content.length; i += 2) {
    rows.push(Content.slice(i, i + 2));
  }

  const leftContent = (
    <>
      <div className="p20 centerContent">
        <SlideRight>
          <MediaRenderer media={Media} width={431} height={578} />
        </SlideRight>
      </div>
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
      <section className="FourRowMediaAndText padding fitToScreen" style={sectionStyle}>
        <TwoColumnLayout fullHeight left={leftContent} right={rightContent} showDivider />
      </section>
      <Divider />
    </>
  );
}
