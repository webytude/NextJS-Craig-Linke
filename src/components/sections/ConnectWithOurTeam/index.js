import MediaRenderer from "@/components/common/MediaRenderer";
import TwoColumnLayout from "@/components/layouts/TwoColumnLayout";
import SlideLeft from "@/components/ui/animations/SlideLeft";
import FadeUp from "@/components/ui/animations/FadeUp";
import Box from "@/components/ui/Box/Box";
import Divider from "@/components/ui/Divider";
import Link from "next/link";
import styles from "./connectWithOurTeam.module.css";

export default function ConnectWithOurTeam({ data }) {
  const {
    Title,
    CallLabel,
    CallNumber,
    EmailLabel,
    Emailid,
    EnquiryLabel,
    EnquiryLink,
    InstagramLabel,
    InstagramLink,
    Media,
  } = data;

  const contactLinks = [
    { label: CallLabel, href: CallNumber ? `tel:${CallNumber}` : null },
    { label: EmailLabel, href: Emailid ? `mailto:${Emailid}` : null },
    { label: EnquiryLabel, href: EnquiryLink },
    {
      label: InstagramLabel,
      href: InstagramLink,
      external: true,
    },
  ].filter((link) => link.label && link.href);

  const leftContent = (
    <Box fullHeight direction="column" padding="0" className={styles.leftColumn}>
      <Box fullHeight justify="center" align="center" padding="0" gap={'120px'} mobileGap={'20px'}>
        <div className={`${styles.title} uppercase p20`}>{Title}</div>
        <nav className={styles.links} aria-label={Title}>
          {contactLinks.map((link, index) => (
            <Link
              key={index}
              href={link.href}
              className={styles.link}
              {...(link.external
                ? { target: "_blank", rel: "noopener noreferrer" }
                : {})}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </Box>
    </Box>
  );

  const rightContent = (
    <div className="p20 centerContent media">
        <MediaRenderer
          media={Media}
          width={436}
          height={585}
          classes="fullWidth"
          altFallback={Title}
        />
    </div>
  );

  return (
    <>
      <section className="fitToScreen connectWithOurTeam">
        <TwoColumnLayout
          fullHeight
          left={leftContent}
          right={rightContent}
          showDivider
          showMobileDivider={false}
        />
      </section>
      <Divider />
    </>
  );
}
