import MediaRenderer from "@/components/common/MediaRenderer";
import SlideLeft from "@/components/ui/animations/SlideLeft";

export default function FullWidthMedia({ data }) {
  const { Media, Padding } = data;

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

  return (
    <section className="full-width-media padding" style={styleVars}>
      <div className="p20">
        {/* <SlideLeft> */}
        <MediaRenderer media={Media} classes={'image'} />
        {/* </SlideLeft> */}
      </div>
    </section>
  );
}
