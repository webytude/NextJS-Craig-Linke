import dynamic from "next/dynamic";

const HomeHero = dynamic(() => import("../sections/HomeHero"), { ssr: true });
const ContactHero = dynamic(() => import("../sections/ContactHero"), { ssr: false, loading: () => null });
const ContentHero = dynamic(() => import("../sections/ContentHero"), { ssr: false, loading: () => null });
const AboutHero = dynamic(() => import("../sections/AboutHero"), { ssr: false, loading: () => null });
const HomeContactHero = dynamic(() => import("../sections/HomeContectHero"), { ssr: false, loading: () => null });
const CareersIntro = dynamic(() => import("../sections/CareersIntro"), { ssr: false, loading: () => null });
const CurrentOpportunity = dynamic(() => import("../sections/CurrentOpportunity"), { ssr: false, loading: () => null });
const Departments = dynamic(() => import("../sections/Departments"), { ssr: false, loading: () => null });
const InterestForm = dynamic(() => import("../sections/InterestForm"), { ssr: false, loading: () => null });
const OurStoryAndEthos = dynamic(() => import("../sections/OurStoryAndEthos"), { ssr: false, loading: () => null });
const GuidingPrinciples = dynamic(() => import("../sections/GuidingPrinciples"), { ssr: false, loading: () => null });

const AestheticMaterials = dynamic(() => import("../ashetics/AestheticMaterials"), { ssr: false, loading: () => null });
const AstheticsContact = dynamic(() => import("../ashetics/AstheticsContact"), { ssr: false, loading: () => null });
const ImageAndText = dynamic(() => import("../ashetics/ImageAndText"), { ssr: false, loading: () => null });
const MediaWithTopBottomContent = dynamic(() => import("../ashetics/MediaWithTopBottomContent"), { ssr: false, loading: () => null });
const ProjectWithManuallyEditable = dynamic(() => import("../ashetics/ProjectWithManuallyEditable"), { ssr: false, loading: () => null });
const RelatedAesthetics = dynamic(() => import("../ashetics/RelatedAesthetics"), { ssr: false, loading: () => null });
const SingleMedia = dynamic(() => import("../ashetics/SingleMedia"), { ssr: false, loading: () => null });
const Awards = dynamic(() => import("../sections/Awards"), { ssr: false, loading: () => null });
const ContactUsCTA = dynamic(() => import("../sections/ContactUsCTA"), { ssr: false, loading: () => null });
const ExploreProjects = dynamic(() => import("../sections/ExploreProjects"), { ssr: false, loading: () => null });
const ExpressiveMediaModule = dynamic(() => import("../sections/ExpressiveMediaModule"), { ssr: false, loading: () => null });
const Faq = dynamic(() => import("../sections/Faq"), { ssr: false, loading: () => null });
const FeaturedProjects = dynamic(() => import("../sections/FeaturedProjects"), { ssr: false, loading: () => null });
const FourRowMediaAndText = dynamic(() => import("../sections/FourRowMediaAndText"), { ssr: false, loading: () => null });
const FullScreenMedia = dynamic(() => import("../sections/FullScreenMedia"), { ssr: false, loading: () => null });
const FullWidthMedia = dynamic(() => import("../sections/FullWidthMedia"), { ssr: false, loading: () => null });
const InteriorDesign = dynamic(() => import("../sections/InteriorDesign"), { ssr: false, loading: () => null });
const LatestJournals = dynamic(() => import("../sections/LatestJournals"), { ssr: false, loading: () => null });
const OurProcess = dynamic(() => import("../sections/OurProcess"), { ssr: false, loading: () => null });
const ProjectHighlight = dynamic(() => import("../sections/ProjectHighlight"), { ssr: false, loading: () => null });
const OurServices = dynamic(() => import("../sections/Services"), { ssr: false, loading: () => null });
const TeamListing = dynamic(() => import("../sections/TeamListing"), { ssr: false, loading: () => null });
const TextModule = dynamic(() => import("../sections/TextModule"), { ssr: false, loading: () => null });
const TwoColumnMediaAndText = dynamic(() => import("../sections/TwoColumnMediaAndText"), { ssr: false, loading: () => null });

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

    case "ComponentSectionCareersIntro":
      return <CareersIntro data={block} />;

    case "ComponentSectionCurrentOpportunity":
      return <CurrentOpportunity data={block} />;

    case "ComponentSectionDepartments":
      return <Departments data={block} />;

    case "ComponentSectionInterestForm":
      return <InterestForm data={block} />;

    case "ComponentSectionOurStoryAndEthos":
      return <OurStoryAndEthos data={block} />;

    case "ComponentSectionGuidingPrinciples":
      return <GuidingPrinciples data={block} />;

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

