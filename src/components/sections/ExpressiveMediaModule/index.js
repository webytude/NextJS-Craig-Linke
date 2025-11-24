import MediaRenderer from "@/components/common/MediaRenderer";
import TwoColumnLayout from "@/components/layouts/TwoColumnLayout";
import Box from "@/components/ui/Box/Box";
import Divider from "@/components/ui/Divider";

export default function ExpressiveMediaModule({ data }) {
  const { LeftSideMedia, RightSideMedia } = data;

  const leftContent = (
    <>
      <Box fullHeight direction="column" justify="space-between">
        <div className="fullWidth">
          <MediaRenderer media={LeftSideMedia} classes={'image'} />
        </div>
        <div> </div>
      </Box>
    </>
  );

  const rightContent = (
    <>
      <div className="p20 centerContent">
        <MediaRenderer media={RightSideMedia} width={436} height={585} />
      </div>
    </>
  );

  return (
    <>
    <Divider />
    <section className="expressiveMedia">
      <TwoColumnLayout left={leftContent} right={rightContent} showDivider showMobileDivider={false} />
    </section>
    <Divider />
    </>
  );
}
