export default function ExpressiveMediaModule({ data }) {
  const { LeftSideMedia, RightSideMedia } = data;

  return (
    <section className="expressive-media">
      <div>
        {LeftSideMedia?.ImageORCarousel?.url && (
          <img src={LeftSideMedia.ImageORCarousel.url} />
        )}
      </div>

      <div>
        {RightSideMedia?.ImageORCarousel?.url && (
          <img src={RightSideMedia.ImageORCarousel.url} />
        )}
      </div>
    </section>
  );
}
