import TwoColumnLayout from "@/components/layouts/TwoColumnLayout";
import FadeUp from "@/components/ui/animations/FadeUp";
import Box from "@/components/ui/Box/Box";
import Divider from "@/components/ui/Divider";
import Paragraph from "@/components/ui/Paragraph";
import { renderRichText } from "@/utils/richText";
import { BlocksRenderer } from "@strapi/blocks-react-renderer";

export default function TextModule({ data, headingLevel = 1 }) {
  const { Title, SideContent, Padding } = data;
  const HeadingTag = `h${headingLevel}`;

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

  const leftContent = (
    <>
      <Box fullHeight direction="column" justify="space-between">
        <FadeUp>
        <HeadingTag className="headingOne">{Title}</HeadingTag>
        </FadeUp>
      </Box>
    </>
  );

  const rightContent = (
    <>
      <div className="p20 content flex-start">
        {SideContent.map((text, index) => (
          <FadeUp key={index}>
            <Paragraph>
              <BlocksRenderer content={text.Content || []} />
            </Paragraph>
          </FadeUp>
        ))}
      </div>
    </>
  );

  return (
    <>
      <section className="text-module padding" style={styleVars}>
        <TwoColumnLayout left={leftContent} right={rightContent} />
      </section>
      {/* <Divider /> */}
    </>
  );
}
