import { renderRichText } from "@/utils/richText";

export default function TwoColumnMediaAndText({ data }) {
  const { LeftSide, RightSide, ReverseLayout, Padding } = data;
  return (
    <section className={`two-col ${ReverseLayout ? "reverse" : ""}`}>
      <div>
        {LeftSide?.ImageORCarousel?.url && (
          <img src={LeftSide.ImageORCarousel.url} />
        )}
      </div>

      <div>
        {RightSide?.Media?.ImageORCarousel?.url && (
          <img src={RightSide.Media.ImageORCarousel.url} />
        )}
        {RightSide?.Content?.map((c, i) => (
          <p key={i}>{renderRichText(c.Content)}</p>
        ))}
      </div>
    </section>
  );
}
