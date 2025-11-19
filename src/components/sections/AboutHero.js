export default function AboutHero({ data }) {
  const { Title, SubTitle, Buttons, ShortText, RightSideMedia } = data;
  
  return (
    <section className="about-hero">
      <h1>{Title}</h1>
      <h3>{SubTitle}</h3>
      <p>{ShortText}</p>

      <div className="actions">
        {Buttons?.map((btn, i) => (
          <a key={i} href={btn.ButtonURL}>{btn.ButtonText}</a>
        ))}
      </div>

      {RightSideMedia?.ImageORCarousel?.url && (
        <img src={RightSideMedia.ImageORCarousel.url} />
      )}
    </section>
  );
}
