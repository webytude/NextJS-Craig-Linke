import TwoColumnLayout from "@/components/layouts/TwoColumnLayout";
import Box from "@/components/ui/Box/Box";
import Heading from "@/components/ui/Heading";
import Paragraph from "@/components/ui/Paragraph";
import { BlocksRenderer } from "@strapi/blocks-react-renderer";
import astheticsStyles from "../style/asthetics..module.css";
import FadeUp from "@/components/ui/animations/FadeUp";

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
          mobileBorderBottom="none"
          borderColor="#EAEAE8"
          mobileGap={'20px'}
        >
          <div className="flex justify-space-between fullWidth">
            <div className="uppercase">
              <FadeUp>
              {'( 04 )'}
              </FadeUp>
            </div>
            <div className="uppercase">
              <FadeUp>
              {Title}
              </FadeUp>
            </div>
          </div>
          <div className="heading" style={{ maxWidth: 500 }}>
            <FadeUp>
            <BlocksRenderer content={Description || []} />
            </FadeUp>
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
          hideMobileDivider
          dividerColor="#EAEAE8"
        >
          <div className="p20">
            <FadeUp>
            <Paragraph>
              <BlocksRenderer content={Content || []} />
            </Paragraph>
            </FadeUp>
          </div>
          <div className="p20 text-right hide-mobile" />
        </Box>
      </div>
    </section>
  );
}
