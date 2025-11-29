import MediaRenderer from "@/components/common/MediaRenderer";
import SlideLeft from "@/components/ui/animations/SlideLeft";

export default function FullWidthMedia({ data }) {
  const { Media, Padding } = data;

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

  return (
    <section className="full-width-media padding" style={sectionStyle}>
      <div className="p20">
        <SlideLeft>
        <MediaRenderer media={Media} classes={'image'} />
        </SlideLeft>
      </div>
    </section>
  );
}
