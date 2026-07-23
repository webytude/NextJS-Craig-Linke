import dynamic from "next/dynamic";
import HomeHero from"../sections/HomeHero";
import ContactHero from"../sections/ContactHero";
import ContentHero from"../sections/ContentHero";
import AboutHero from"../sections/AboutHero";
import HomeContactHero from"../sections/HomeContectHero";

const AestheticMaterials = dynamic(() => import("../ashetics/AestheticMaterials"));
const AstheticsContact = dynamic(() => import("../ashetics/AstheticsContact"));
const ImageAndText = dynamic(() => import("../ashetics/ImageAndText"));
const MediaWithTopBottomContent = dynamic(() => import("../ashetics/MediaWithTopBottomContent"));
const ProjectWithManuallyEditable = dynamic(() => import("../ashetics/ProjectWithManuallyEditable"));
const RelatedAesthetics = dynamic(() => import("../ashetics/RelatedAesthetics"));
const SingleMedia = dynamic(() => import("../ashetics/SingleMedia"));
const Awards = dynamic(() => import("../sections/Awards"));
const ContactUsCTA = dynamic(() => import("../sections/ContactUsCTA"));
const ExploreProjects = dynamic(() => import("../sections/ExploreProjects"));
const ExpressiveMediaModule = dynamic(() => import("../sections/ExpressiveMediaModule"));
const Faq = dynamic(() => import("../sections/Faq"));
const FeaturedProjects = dynamic(() => import("../sections/FeaturedProjects"));
const FourRowMediaAndText = dynamic(() => import("../sections/FourRowMediaAndText"));
const FullScreenMedia = dynamic(() => import("../sections/FullScreenMedia"));
const FullWidthMedia = dynamic(() => import("../sections/FullWidthMedia"));
const InteriorDesign = dynamic(() => import("../sections/InteriorDesign"));
const LatestJournals = dynamic(() => import("../sections/LatestJournals"));
const OurProcess = dynamic(() => import("../sections/OurProcess"));
const ProjectHighlight = dynamic(() => import("../sections/ProjectHighlight"));
const OurServices = dynamic(() => import("../sections/Services"));
const TeamListing = dynamic(() => import("../sections/TeamListing"));
const TextModule = dynamic(() => import("../sections/TextModule"));
const TwoColumnMediaAndText = dynamic(() => import("../sections/TwoColumnMediaAndText"));

export default function BlockRenderer({ block, quickViewLinks, blockId, isFirstH1 }) {
  const headingLevel = isFirstH1 ? 1 : 2;

  const Component = () => {
    switch (block.__typename) {

    case "ComponentSectionHomeHero":
      return <HomeHero data={block} />;

    case "ComponentSectionProjectHighlight":
      return <ProjectHighlight data={block} />;

    case "ComponentSectionFeaturedProjects":
      return <FeaturedProjects data={block} />;

    case "ComponentSectionFullScreenMedia":
      return <FullScreenMedia data={block} />;

    case "ComponentSectionFaq":
      return <Faq data={block} />;

    case "ComponentSectionNewContactHero":
      return <HomeContactHero data={block} headingLevel={headingLevel} />;

    case "ComponentSectionContentHeroModule":
      return <ContentHero data={block} headingLevel={headingLevel} />;

    case "ComponentSectionGetInTouch":
      return <ContactUsCTA data={block} />;

    case "ComponentSectionAwards":
      return <Awards data={block} />;

    case "ComponentSectionOurProcess":
      return <OurProcess data={block} />;

    case "ComponentSectionServices":
      return <OurServices data={block} headingLevel={headingLevel} />;

    case "ComponentSectionInteriorDesign":
      return <InteriorDesign data={block} />;

    case "ComponentSectionLatestJournals":
      return <LatestJournals data={block} />;

    case "ComponentSectionTextModule":
      return <TextModule data={block} headingLevel={headingLevel} />;

    case "ComponentSectionTeamListing":
      return <TeamListing data={block} />;

    case "ComponentSectionFullWidthMedia":
      return <FullWidthMedia data={block} />;

    case "ComponentSectionExpressiveMediaModule":
      return <ExpressiveMediaModule data={block} />;

    case "ComponentSectionExploreProjects":
      return <ExploreProjects data={block} />;

    case "ComponentSectionAboutHero":
      return <AboutHero data={block} quickLinks={quickViewLinks} headingLevel={headingLevel} />;

    case "ComponentSection4RowMediaAndText":
      return <FourRowMediaAndText data={block} />;

    case "ComponentSection2ColumnMediaAndText":
      return <TwoColumnMediaAndText data={block} />;

    case "ComponentSectionContactHero":
      return <ContactHero data={block} />;

    // Ashetics Detail
    case "ComponentSectionMediaWithTopBottomContent":
      return <MediaWithTopBottomContent data={block} />;
    
    case "ComponentSectionProjectWithManuallyEditable":
      return <ProjectWithManuallyEditable data={block} />;

    case "ComponentSectionImageAndText":
      return <ImageAndText data={block} />;

    case "ComponentSectionAestheticMaterials":
      return <AestheticMaterials data={block} />;

    case "ComponentSectionSingleMedia":
      return <SingleMedia data={block} />;

    case "ComponentSectionAstheticsContact":
      return <AstheticsContact data={block} />;

    case "ComponentSectionRelatedAesthetics":
      return <RelatedAesthetics data={block} />;

    default:
      return null;
    }
  }

  if (blockId) {
    return (
      <div id={blockId} style={{ scrollMarginTop: '100px' }}>
         <Component />
      </div>
    );
  }

  return <Component />;
}

