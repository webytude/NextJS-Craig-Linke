import TwoColumnLayout from "@/components/layouts/TwoColumnLayout";
import Box from "@/components/ui/Box/Box";
import Divider from "@/components/ui/Divider";
import { renderRichText } from "@/utils/richText";

export default function TwoColumnMediaAndText({ data }) {
  const { LeftSide, RightSide, ReverseLayout, Padding } = data;

  const leftContent = (
      <>
        <Box fullHeight direction="column" justify="space-between" borderBottom>
          {/* <MediaRenderer media={LeftSideMedia} /> */}
          asdas
        </Box>
      </>
    );
  
    const rightContent = (
      <>
        <div className="p20">
          asasd
          {/* <MediaRenderer media={RightSideMedia} width={436} height={585} /> */}
        </div>
      </>
    );

  return (
    <>
    <section>
      <TwoColumnLayout left={leftContent} right={rightContent} showDivider />
    </section>
    <Divider />
    </>
  );
}
