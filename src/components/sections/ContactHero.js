export default function ContactHero({ data }) {
  const { Title, Description, Address, Email, Number, Media, FormSideMedia } = data;
  
  return (
    <section className="contact-hero">
      <h2>{Title}</h2>
      <p>{Description}</p>
      <p>{Address}</p>
      <p>{Email}</p>
      <p>{Number}</p>

      {Media?.ImageORCarousel?.url && (
        <img src={Media.ImageORCarousel.url} />
      )}

      {FormSideMedia?.ImageORCarousel?.url && (
        <img src={FormSideMedia.ImageORCarousel.url} />
      )}
    </section>
  );
}
