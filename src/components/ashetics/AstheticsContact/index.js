import TwoColumnLayout from "@/components/layouts/TwoColumnLayout";
import Box from "@/components/ui/Box/Box";
import Heading from "@/components/ui/Heading";
import Paragraph from "@/components/ui/Paragraph";
import { BlocksRenderer } from "@strapi/blocks-react-renderer";
import astheticsStyles from "../style/asthetics..module.css";

export default function AstheticsContact({ data }) {
  const { Title, Content, Description } = data;

  return (
    <section
      className={`${astheticsStyles.section} ${astheticsStyles.astheticsContact}`}
    >
      <div className={`${astheticsStyles.box}`}>
        <Box
          fullHeight
          direction="column"
          justify="space-between"
          borderBottom
          borderColor="#EAEAE8"
        >
          <div className="flex justify-space-between fullWidth">
            <div className="uppercase">{'( 04 )'}</div>
            <div className="uppercase">{Title}</div>
          </div>
          <div className="heading" style={{ maxWidth: 500 }}>
            <BlocksRenderer content={Description || []} />
          </div>
        </Box>

        <Box
          fullHeight
          direction="row"
          justify="space-between"
          align="flex-end"
          padding="0"
          equalChildren
          showDivider
          dividerColor="#EAEAE8"
        >
          <div className="p20">
            <Paragraph>
              <BlocksRenderer content={Content || []} />
            </Paragraph>
          </div>
          <div className="p20 text-right" />
        </Box>
      </div>
    </section>
  );
}
