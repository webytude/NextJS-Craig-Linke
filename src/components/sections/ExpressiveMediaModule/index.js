import MediaRenderer from "@/components/common/MediaRenderer";
import TwoColumnLayout from "@/components/layouts/TwoColumnLayout";
import Box from "@/components/ui/Box/Box";
import Divider from "@/components/ui/Divider";

export default function ExpressiveMediaModule({ data }) {
  const { LeftSideMedia, RightSideMedia } = data;

  console.log('ExpressiveMediaModule', data)

  const leftContent = (
    <>
      <Box fullHeight direction="column" justify="space-between" borderBottom>
        <MediaRenderer media={LeftSideMedia} />
      </Box>
    </>
  );

  const rightContent = (
    <>
      <div className="p20">
        <MediaRenderer media={RightSideMedia} width={436} height={585} />
      </div>
    </>
  );

  return (
    <>
    <section className="home-hero">
      <TwoColumnLayout left={leftContent} right={rightContent} showDivider />
    </section>
    <Divider />
    </>
  );
}
