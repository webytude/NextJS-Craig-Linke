import { renderRichText } from "@/utils/richText";

export default function TeamListing({ data }) {
  const { Listing, ReadBioLabel } = data;
  return (
    <section className="team-listing">
      <div className="grid">
        {Listing?.map((member, i) => (
          <div key={i}>
            <img src={member.Image?.url} />
            <h3>{member.Name}</h3>
            <p>{member.Role}</p>
            <p>{renderRichText(member.Listing)}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
