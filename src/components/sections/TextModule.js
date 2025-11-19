import { renderRichText } from "@/utils/richText";

export default function TextModule({ data }) {
  const { Title, SideContent, Padding } = data;
  return (
    <section className="text-module" style={{
      paddingTop: Padding?.DesktopTopPadding,
      paddingBottom: Padding?.DesktopBottomPadding
    }}>
      <h2>{Title}</h2>

      <div>
        {SideContent?.map((item, i) => (
          <p key={i}>{renderRichText(item.Content)}</p>
        ))}
      </div>
    </section>
  );
}
