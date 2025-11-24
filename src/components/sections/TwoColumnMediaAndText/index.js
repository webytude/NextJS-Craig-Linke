import MediaRenderer from "@/components/common/MediaRenderer";
import TwoColumnLayout from "@/components/layouts/TwoColumnLayout";
import Box from "@/components/ui/Box/Box";
import Divider from "@/components/ui/Divider";
import Paragraph from "@/components/ui/Paragraph";
import { renderRichText } from "@/utils/richText";
import { BlocksRenderer } from "@strapi/blocks-react-renderer";

export default function TwoColumnMediaAndText({ data }) {
  const { LeftSide, RightSide, ReverseLayout, Padding } = data;

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

  const leftContent = (
    <>
      <Box fullHeight borderBottom>
        <MediaRenderer media={RightSide.Media} width={716} height={452} classes={'image'} />
      </Box>

      <Box
        fullHeight
        direction="row"
        padding="0"
        align="flex-end"
        mobileAlign="flex-start"
        style={{minHeight: 430}}
      >
         <div className="content p20">
          {RightSide.Content.map((text, index) => (
            <div>
              <div className="text-light uppercase pb20">{text.Title}</div>
              <Paragraph key={index}>
                <BlocksRenderer content={text.Content || []} />
              </Paragraph>
            </div>
          ))}
        </div>
      </Box>
    </>
  );

  const rightContent = (
    <>
      <div className="p20 centerContent">
        <MediaRenderer media={LeftSide} width={431} height={578} />
      </div>
    </>
  );

  return (
    <>
      <Divider />
      <section className="TwoColumnMediaAndText padding" style={sectionStyle}>
        <TwoColumnLayout left={leftContent} right={rightContent} showDivider reverse={ReverseLayout} />
      </section>
      <Divider />
    </>
  );
}
