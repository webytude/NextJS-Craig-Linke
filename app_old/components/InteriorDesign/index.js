import Image from "next/image";
import styles from "./interiorDesign.module.css";
import Paragraph from "../ui/Paragraph";
import LinkWithArrow from "../ui/Link";
import Box from "../ui/Box/Box";
import TwoColumnLayout from "../layout/TwoColumnLayout";

export default function InteriorDesign() {
  const leftContent = (
    <>
      {/* === TOP BOX === */}
      <Box fullHeight direction="column" justify="space-between" borderBottom>
        <div className="text-light">INTERIOR DESIGN</div>
        <h1 className="headingOne">
          Our interior architects and designers can work with you end to end, or
          you can handpick the individual design services you require.
        </h1>
      </Box>

      {/* === BOTTOM BOX === */}
      <Box
        fullHeight
        direction="row"
        justify="space-between"
        align="flex-end"
        padding="0"
        equalChildren
        showDivider
      >
        <div className="p20">
          <Paragraph>
            Our design team can support you end to end, from the early
            exploration and concepting phases, providing comprehensive drawings
            and specifications, assisting with selections, furniture & soft
            furnishing sourcing. For smaller projects, the team provides all
            working drawings, so there is no need to engage an architect.
          </Paragraph>
        </div>
        <div className="p20 text-right">
          <LinkWithArrow text="READ MORE" href="#" />
        </div>
      </Box>
    </>
  );

  const rightContent = (
    <>
      <div className="p20">
        <Image
          src="/images/hero.png"
          alt="Interior design"
          width={716}
          height={889}
          className="image"
        />
      </div>
    </>
  );

  return (
    <section>
      <TwoColumnLayout left={leftContent} right={rightContent} showDivider />
    </section>
  );
}
