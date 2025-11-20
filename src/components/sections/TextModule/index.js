import TwoColumnLayout from "@/components/layouts/TwoColumnLayout";
import Box from "@/components/ui/Box/Box";
import Divider from "@/components/ui/Divider";
import Paragraph from "@/components/ui/Paragraph";
import { renderRichText } from "@/utils/richText";
import { BlocksRenderer } from "@strapi/blocks-react-renderer";

export default function TextModule({ data }) {
  const { Title, SideContent, Padding } = data;

  const leftContent = (
    <>
      <Box fullHeight direction="column" justify="space-between">
        <h1 className="headingOne">{Title}</h1>
      </Box>
    </>
  );

  const rightContent = (
    <>
      <div className="p20 content">
        {SideContent.map((text, index) => (
          <Paragraph key={index}>
            <BlocksRenderer content={text.Content || []} />
          </Paragraph>
        ))}
      </div>
    </>
  );

  return (
    <>
      <section className="home-hero">
        <TwoColumnLayout left={leftContent} right={rightContent} />
      </section>
      <Divider />
    </>
  );
}
