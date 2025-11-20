import MediaRenderer from "@/components/common/MediaRenderer";

export default function FullWidthMedia({ data }) {
  const { Media, Padding } = data;

  console.log('FullWidthMedia', data)

  return (
    <section className="full-width-media">
      <div className="p20">
        <MediaRenderer media={Media} classes={'image'} />
      </div>
    </section>
  );
}
