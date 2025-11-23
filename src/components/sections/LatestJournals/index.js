import TwoColumnLayout from "@/components/layouts/TwoColumnLayout";
import LinkWithArrow from "@/components/ui/Link";
import Spacer from "@/components/ui/Spacer";
import { renderRichText } from "@/utils/richText";
import JournalCard from "./JournalCard";

export default function LatestJournals({ data }) {
  const { Title, Button, SelectJournals } = data;

  const validJournals = Array.isArray(SelectJournals)
    ? SelectJournals.filter((j) => typeof j === "object")
    : [];

  const leftJournal = validJournals[0] || null;   // First journal
  const rightJournal = validJournals[1] || null;  // Second journal

  const leftContent = (
    <>
      {/* <div className="text-light p20 uppercase">{Title}</div> */}
      <div className="flex justify-space-between p20">
        <div className="text-light uppercase">{Title}</div>
        {Button && (
          <div className="hide-desktop">
            <LinkWithArrow
              text={Button.ButtonText}
              href={Button.ButtonURL}
            />
          </div>
        )}
      </div>
      <Spacer desktop={84} tablet={50} mobile={30} />
      <div className="journal">
        <JournalCard data={leftJournal} />
      </div>
      <Spacer desktop={130} tablet={50} mobile={30} />
    </>
  );
  const rightContent = (
    <>
      <div className="p20 text-right hide-mobile">
        <LinkWithArrow text={Button.ButtonText} href={Button.ButtonURL} />
      </div>
      <Spacer desktop={84} tablet={50} mobile={30} />
      <div className="journal">
        <JournalCard data={rightJournal} />
      </div>
      <Spacer desktop={130} tablet={50} mobile={30} />
    </>
  );

  return (
    <section className="LatestJournals">
      <TwoColumnLayout showDivider left={leftContent} right={rightContent} />
    </section>
  );
}
