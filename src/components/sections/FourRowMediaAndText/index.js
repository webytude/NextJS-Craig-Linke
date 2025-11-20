import { renderRichText } from "@/utils/richText";


export default function FourRowMediaAndText({ data }) {
  const { Media, Content, Padding } = data;
  return (
    <section className="four-row-media-text">
      <img src={Media?.ImageORCarousel?.url} />

      {Content?.map((c, i) => (
        <div key={i}>
          <h3>{c.Title}</h3>
          <p>{renderRichText(c.Content)}</p>
        </div>
      ))}
    </section>
  );
}
