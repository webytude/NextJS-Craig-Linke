export default function FullWidthMedia({ data }) {
  const { Media, Padding } = data;

  return (
    <section className="full-width-media">
      {Media?.ImageORCarousel?.url && (
        <img src={Media.ImageORCarousel.url} />
      )}
    </section>
  );
}
