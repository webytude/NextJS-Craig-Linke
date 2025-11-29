import TwoColumnLayout from "@/components/layouts/TwoColumnLayout";
import FadeUp from "@/components/ui/animations/FadeUp";
import Box from "@/components/ui/Box/Box";
import Divider from "@/components/ui/Divider";
import Paragraph from "@/components/ui/Paragraph";
import { renderRichText } from "@/utils/richText";
import { BlocksRenderer } from "@strapi/blocks-react-renderer";

export default function TextModule({ data }) {
  const { Title, SideContent, Padding } = data;

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
      <Box fullHeight direction="column" justify="space-between">
        <FadeUp>
        <h1 className="headingOne">{Title}</h1>
        </FadeUp>
      </Box>
    </>
  );

  const rightContent = (
    <>
      <div className="p20 content">
        {SideContent.map((text, index) => (
          <FadeUp>
            <Paragraph key={index}>
              <BlocksRenderer content={text.Content || []} />
            </Paragraph>
          </FadeUp>
        ))}
      </div>
    </>
  );

  return (
    <>
      <section className="text-module padding" style={sectionStyle}>
        <TwoColumnLayout left={leftContent} right={rightContent} />
      </section>
      {/* <Divider /> */}
    </>
  );
}
