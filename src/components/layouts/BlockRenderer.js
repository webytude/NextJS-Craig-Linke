import AestheticMaterials from "../ashetics/AestheticMaterials";
import AstheticsContact from "../ashetics/AstheticsContact";
// import FullWidthMediaAshetics from "../ashetics/FullWidthMedia";
import ImageAndText from "../ashetics/ImageAndText";
import MediaWithTopBottomContent from "../ashetics/MediaWithTopBottomContent";
import ProjectWithManuallyEditable from "../ashetics/ProjectWithManuallyEditable";
import RelatedAesthetics from "../ashetics/RelatedAesthetics";
import SingleMedia from "../ashetics/SingleMedia";
import AboutHero from "../sections/AboutHero";
import ContactHero from "../sections/ContactHero";
import ExploreProjects from "../sections/ExploreProjects";
import ExpressiveMediaModule from "../sections/ExpressiveMediaModule";
import FeaturedProjects from "../sections/FeaturedProjects";
import FourRowMediaAndText from "../sections/FourRowMediaAndText";
import FullScreenMedia from "../sections/FullScreenMedia";
import FullWidthMedia from "../sections/FullWidthMedia";
import HomeHero from "../sections/HomeHero";
import InteriorDesign from "../sections/InteriorDesign";
import LatestJournals from "../sections/LatestJournals";
import ProjectHighlight from "../sections/ProjectHighlight";
import TeamListing from "../sections/TeamListing";
import TextModule from "../sections/TextModule";
import TwoColumnMediaAndText from "../sections/TwoColumnMediaAndText";

export default function BlockRenderer({ block, quickViewLinks, blockId }) {

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

    case "ComponentSectionInteriorDesign":
      return <InteriorDesign data={block} />;

    case "ComponentSectionLatestJournals":
      return <LatestJournals data={block} />;

    case "ComponentSectionTextModule":
      return <TextModule data={block} />;

    case "ComponentSectionTeamListing":
      return <TeamListing data={block} />;

    case "ComponentSectionFullWidthMedia":
      return <FullWidthMedia data={block} />;

    case "ComponentSectionExpressiveMediaModule":
      return <ExpressiveMediaModule data={block} />;

    case "ComponentSectionExploreProjects":
      return <ExploreProjects data={block} />;

    case "ComponentSectionAboutHero":
      return <AboutHero data={block} quickLinks={quickViewLinks} />;

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

    // case "ComponentSectionFullWidthMedia":
    //   return <FullWidthMediaAshetics data={block} />;

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
