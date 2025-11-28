import { gql } from "@apollo/client";

const BLOCKS_SELECTION = `
  ... on ComponentSectionHomeHero {
    Title
    ShortText
    Button {
      ButtonText
      ButtonURL
      OpenNewTab
    }
    LeftSideMedia {
      EnableMuxVideo
      MuxVideo {
        playback_id
      }
      ImageORCarousel {
        url
        alternativeText
      }
    }
    RightSideMedia {
      EnableMuxVideo
      MuxVideo {
        playback_id
      }
      ImageORCarousel {
        alternativeText
        url
      }
    }
  }
  ... on ComponentSectionProjectHighlight {
    TopTitle
    Button {
      ButtonText
      ButtonURL
      OpenNewTab
    }
    BottomTitle
    BottomDescription
    Media {
      url
      alternativeText
    }
    FeaturedProjects {
      Title
      Button {
        ButtonText
        ButtonURL
        OpenNewTab
      }
      SelectProjects {
        Name
        Slug
        Media {
          EnableMuxVideo
          MuxVideo {
            playback_id
          }
          ImageORCarousel {
            alternativeText
            url
          }
          MediaType
        }
      }
    }
  }
  ... on ComponentSectionFullScreenMedia {
    Title
    FullScreenMedia: Description
    DefaultMedia {
      EnableMuxVideo
      MuxVideo {
        playback_id
      }
      ImageORCarousel {
        alternativeText
        url
      }
    }
    TextList(pagination: { limit: -1 }) {
      Title
      HoverDescription
      HoverMedia {
        EnableMuxVideo
        MuxVideo {
          playback_id
        }
        ImageORCarousel {
          alternativeText
          url
        }
      }
    }
  }
  ... on ComponentSectionInteriorDesign {
    Title
    ShowInQuickView
    SubTitle
    ShowInQuickView
    InteriorDesign: Description
    Button {
      ButtonText
      ButtonURL
      OpenNewTab
    }
    Media {
      EnableMuxVideo
      MuxVideo {
        playback_id
      }
      ImageORCarousel {
        alternativeText
        url
      }
    }
  }
  ... on ComponentSectionLatestJournals {
    id
    Title
    Button {
      ButtonText
      ButtonURL
      OpenNewTab
    }
    SelectJournals {
      Name
      Slug
      Journals: Description
      Media {
        EnableMuxVideo
        MuxVideo {
          playback_id
        }
        ImageORCarousel {
          alternativeText
          url
        }
      }
    }
  }
  ... on ComponentSectionTextModule {
    Title
    ShowInQuickView
    SideContent(pagination: { limit: -1 }) {
      Content
    }
    Padding {
      DesktopTopPadding
      DesktopBottomPadding
      MobileTopPadding
      MobileBottomPadding
    }
  }
  ... on ComponentSectionTeamListing {
    Listing(pagination: { limit: -1 }) {
      Name
      Role
      Listing: Description
      Image {
        alternativeText
        url
      }
    }
    ReadBioLabel
    Padding {
      DesktopTopPadding
      DesktopBottomPadding
      MobileTopPadding
      MobileBottomPadding
    }
  }
  ... on ComponentSectionFullWidthMedia {
    Media {
      EnableMuxVideo
      MuxVideo {
        playback_id
      }
      ImageORCarousel {
        alternativeText
        url
      }
    }
    Padding {
      DesktopTopPadding
      DesktopBottomPadding
      MobileTopPadding
      MobileBottomPadding
    }
  }
  ... on ComponentSectionExpressiveMediaModule {
    LeftSideMedia {
      EnableMuxVideo
      MuxVideo {
        playback_id
      }
      ImageORCarousel {
        alternativeText
        url
      }
    }
    RightSideMedia {
      EnableMuxVideo
      MuxVideo {
        playback_id
      }
      ImageORCarousel {
        url
        alternativeText
      }
    }
  }
  ... on ComponentSectionExploreProjects {
    Title
    SelectProjects {
      Name
      Slug
      Media {
        EnableMuxVideo
        MuxVideo {
          playback_id
        }
        MediaType
        ImageORCarousel {
          alternativeText
          url
        }
      }
    }
  }
  ... on ComponentSectionAboutHero {
    Title
    SubTitle
    Buttons(pagination: { limit: -1 }) {
      ButtonText
      ButtonURL
      OpenNewTab
    }
    ShortText
    RightSideMedia {
      EnableMuxVideo
      MuxVideo {
        playback_id
      }
      ImageORCarousel {
        alternativeText
        url
      }
    }
  }
  ... on ComponentSection4RowMediaAndText {
    Media {
      EnableMuxVideo
      MuxVideo {
        playback_id
      }
      ImageORCarousel {
        alternativeText
        url
      }
    }
    Content(pagination: { limit: -1 }) {
      Title
      Content
    }
    Padding {
      DesktopTopPadding
      DesktopBottomPadding
      MobileTopPadding
      MobileBottomPadding
    }
  }
  ... on ComponentSection2ColumnMediaAndText {
    LeftSide {
      EnableMuxVideo
      MuxVideo {
        playback_id
      }
      ImageORCarousel {
        alternativeText
        url
      }
    }
    RightSide {
      Media {
        EnableMuxVideo
        MuxVideo {
          playback_id
        }
        ImageORCarousel {
          alternativeText
          url
        }
      }
      Content(pagination: { limit: -1 }) {
        Title
        Content
      }
    }
    ReverseLayout
    Padding {
      DesktopTopPadding
      DesktopBottomPadding
      MobileTopPadding
      MobileBottomPadding
    }
  }
  ... on ComponentSectionContactHero {
    Title
    Description
    Address
    Email
    Number
    Media {
      EnableMuxVideo
      MuxVideo {
        playback_id
      }
      ImageORCarousel {
        alternativeText
        url
      }
    }
    FormSideMedia {
      id
      EnableMuxVideo
      MuxVideo {
        playback_id
      }
      ImageORCarousel {
        url
        alternativeText
      }
    }
  } 
`;

export const PAGES_QUERY = gql`
  query pages {
    pages {
      Name
      Slug
      ThemeColor
      Seo {
        MetaTitle
        MetaDescription
        SchemaMarkup
      }
      Blocks {
        ... on ComponentSectionHomeHero {
          Title
          ShortText
          Button {
            ButtonText
            ButtonURL
            OpenNewTab
          }
          LeftSideMedia {
            EnableMuxVideo
            MuxVideo {
              playback_id
            }
            ImageORCarousel {
              url
              alternativeText
            }
          }
          RightSideMedia {
            EnableMuxVideo
            MuxVideo {
              playback_id
            }
            ImageORCarousel {
              alternativeText
              url
            }
          }
        }
        ... on ComponentSectionProjectHighlight {
          TopTitle
          Button {
            ButtonText
            ButtonURL
            OpenNewTab
          }
          BottomTitle
          BottomDescription
          Media {
            url
            alternativeText
          }
          FeaturedProjects {
            Title
            Button {
              ButtonText
              ButtonURL
              OpenNewTab
            }
            SelectProjects {
              Name
              Slug
              Media {
                EnableMuxVideo
                MuxVideo {
                  playback_id
                }
                ImageORCarousel {
                  alternativeText
                  url
                }
                MediaType
              }
            }
          }
        }
        ... on ComponentSectionFullScreenMedia {
          Title
          FullScreenMedia: Description
          DefaultMedia {
            EnableMuxVideo
            MuxVideo {
              playback_id
            }
            ImageORCarousel {
              alternativeText
              url
            }
          }
          TextList(pagination: { limit: -1 }) {
            Title
            HoverDescription
            HoverMedia {
              EnableMuxVideo
              MuxVideo {
                playback_id
              }
              ImageORCarousel {
                alternativeText
                url
              }
            }
          }
        }
        ... on ComponentSectionInteriorDesign {
          Title
          ShowInQuickView
          SubTitle
          InteriorDesign: Description
          Button {
            ButtonText
            ButtonURL
            OpenNewTab
          }
          Media {
            EnableMuxVideo
            MuxVideo {
              playback_id
            }
            ImageORCarousel {
              alternativeText
              url
            }
          }
        }
        ... on ComponentSectionLatestJournals {
          id
          Title
          Button {
            ButtonText
            ButtonURL
            OpenNewTab
          }
          SelectJournals {
            Name
            Slug
            Journals: Description
            Media {
              EnableMuxVideo
              MuxVideo {
                playback_id
              }
              ImageORCarousel {
                alternativeText
                url
              }
            }
          }
        }
        ... on ComponentSectionTextModule {
          Title
          ShowInQuickView
          SideContent(pagination: { limit: -1 }) {
            Content
          }
          Padding {
            DesktopTopPadding
            DesktopBottomPadding
            MobileTopPadding
            MobileBottomPadding
          }
        }
        ... on ComponentSectionTeamListing {
          Listing(pagination: { limit: -1 }) {
            Name
            Role
            Listing: Description
            Image {
              alternativeText
              url
            }
          }
          ReadBioLabel
          Padding {
            DesktopTopPadding
            DesktopBottomPadding
            MobileTopPadding
            MobileBottomPadding
          }
        }
        ... on ComponentSectionFullWidthMedia {
          Media {
            EnableMuxVideo
            MuxVideo {
              playback_id
            }
            ImageORCarousel {
              alternativeText
              url
            }
          }
          Padding {
            DesktopTopPadding
            DesktopBottomPadding
            MobileTopPadding
            MobileBottomPadding
          }
        }
        ... on ComponentSectionExpressiveMediaModule {
          LeftSideMedia {
            EnableMuxVideo
            MuxVideo {
              playback_id
            }
            ImageORCarousel {
              alternativeText
              url
            }
          }
          RightSideMedia {
            EnableMuxVideo
            MuxVideo {
              playback_id
            }
            ImageORCarousel {
              url
              alternativeText
            }
          }
        }
        ... on ComponentSectionExploreProjects {
          Title
          SelectProjects {
            Name
            Slug
            Media {
              EnableMuxVideo
              MuxVideo {
                playback_id
              }
              MediaType
              ImageORCarousel {
                alternativeText
                url
              }
            }
          }
        }
        ... on ComponentSectionAboutHero {
          Title
          SubTitle
          ShortText
          RightSideMedia {
            EnableMuxVideo
            MuxVideo {
              playback_id
            }
            ImageORCarousel {
              alternativeText
              url
            }
          }
        }
        ... on ComponentSection4RowMediaAndText {
          Media {
            EnableMuxVideo
            MuxVideo {
              playback_id
            }
            ImageORCarousel {
              alternativeText
              url
            }
          }
          Content(pagination: { limit: -1 }) {
            Title
            Content
          }
          Padding {
            DesktopTopPadding
            DesktopBottomPadding
            MobileTopPadding
            MobileBottomPadding
          }
        }
        ... on ComponentSection2ColumnMediaAndText {
          LeftSide {
            EnableMuxVideo
            MuxVideo {
              playback_id
            }
            ImageORCarousel {
              alternativeText
              url
            }
          }
          RightSide {
            Media {
              EnableMuxVideo
              MuxVideo {
                playback_id
              }
              ImageORCarousel {
                alternativeText
                url
              }
            }
            Content(pagination: { limit: -1 }) {
              Title
              Content
            }
          }
          ReverseLayout
          Padding {
            DesktopTopPadding
            DesktopBottomPadding
            MobileTopPadding
            MobileBottomPadding
          }
        }
        ... on ComponentSectionContactHero {
          Title
          Description
          Address
          Email
          Number
          Media {
            EnableMuxVideo
            MuxVideo {
              playback_id
            }
            ImageORCarousel {
              alternativeText
              url
            }
          }
          FormSideMedia {
            id
            EnableMuxVideo
            MuxVideo {
              playback_id
            }
            ImageORCarousel {
              url
              alternativeText
            }
          }
        }
      }
    }
  }
`;

export const GLOBAL_QUERY = gql`
  query Global {
    global {
      Header {
        MainLogo {
          alternativeText
          url
        }
        CraigLogo {
          alternativeText
          url
        }
        LinkeLogo {
          alternativeText
          url
        }
        Menu(pagination: { limit: -1 }) {
          ButtonText
          ButtonURL
          OpenNewTab
        }
      }
      Footer {
        SocialLinks(pagination: { limit: -1 }) {
          Links {
            ButtonText
            ButtonURL
            OpenNewTab
          }
          Media {
            EnableMuxVideo
            MuxVideo {
              playback_id
            }
            ImageORCarousel {
              alternativeText
              url
            }
          }
        }
        ExtraDetails(pagination: { limit: -1 }) {
          Content
        }
        MainLogo {
          alternativeText
          url
        }
        CraigLogo {
          alternativeText
          url
        }
        LinkeLogo {
          alternativeText
          url
        }
      }
      Seo {
        MetaTitle
        MetaDescription
        SchemaMarkup
      }
    }
  }
`;

export const PROJECTS_QUERY = gql`
  query Projects {
    projects {
      Name
      Slug
      Media {
        EnableMuxVideo
        MuxVideo {
          playback_id
        }
        MediaType
        ImageORCarousel {
          alternativeText
          url
        }
      }
      Description
      ProjectCategory {
        Name
        Slug
      }
    }
  }
`;

export const JOURNALS_QUERY = gql`
  query Journals {
    journals {
      Name
      Slug
      publishedAt
      Description
      Media {
        EnableMuxVideo
        MuxVideo {
          playback_id
        }
        ImageORCarousel {
          alternativeText
          url
        }
      }
      JournalCategory {
        Name
        Slug
      }
      ThemeColor
      Seo {
        MetaTitle
        MetaDescription
        SchemaMarkup
      }
    }
  }
`;

export const GET_BY_SLUG_JOURNALS = gql`
  query GetBySlugJournals($slug: String!) {
    journals(filters: { Slug: { eq: $slug } }) {
      Name
      Slug
      Description
      Media {
        EnableMuxVideo
        MuxVideo {
          playback_id
        }
        ImageORCarousel {
          alternativeText
          url
        }
      }
      JournalCategory {
        Name
        Slug
      }
      ThemeColor
      Seo {
        MetaTitle
        MetaDescription
        SchemaMarkup
      }
      Blocks {
        ${BLOCKS_SELECTION}
      }
    }
  }
`;

export const PROJECTS_QUERY_SLUG = gql`
  query GetCurrentAndNextProject($slug: String!) {
    projects(filters: { Slug: { eq: $slug } }) {
      Name
      Slug
      Media {
        EnableMuxVideo
        MuxVideo {
          playback_id
        }
        MediaType
        ImageORCarousel {
          alternativeText
          url
        }
      }
      Location
      Year
      Architecture
      Photography
      Aesthetic
      Description
      ThemeColor
      Seo {
        MetaTitle
        MetaDescription
        SchemaMarkup
      }
      ProjectCategory {
        Name
        Slug
      }
      Materials {
        Tile
        Materials(pagination: { limit: -1 }) {
          Title
          Image {
            alternativeText
            url
          }
        }
      }
      Blocks {
        ... on ComponentGlobalProjectMedia {
          EnableMuxVideo
          MuxVideo {
            playback_id
          }
          ImageORCarousel {
            alternativeText
            url
          }
          MediaType
          id
        }
        ... on ComponentSectionExploreProjects {
          Title
          SelectProjects {
            Name
            Slug
            Media {
                EnableMuxVideo
                MuxVideo {
                  playback_id
                }
                MediaType
                ImageORCarousel {
                  alternativeText
                  url
                }
            }
          }
        }  
      }
      
    }
  }
`;

export const ASTHETICS_QUERY_SLUG = gql `
  query AstheticsDetails {
    astheticsDetails {
      Name
      Slug
      Description
      DesktopMedia {
        EnableMuxVideo
        MuxVideo {
          playback_id
        }
        ImageORCarousel {
          url
          alternativeText
        }
      }
      MobileMedia {
        EnableMuxVideo
        MuxVideo {
          playback_id
        }
        ImageORCarousel {
          url
          alternativeText
        }
      }
      QuickLinks {
        Name
        Slug
      }
      Blocks {
        ... on ComponentSectionMediaWithTopBottomContent {
          id
          Title
          ShowInQuickView
          TopContent
          BottomContent
          Media {
            EnableMuxVideo
            MuxVideo {
              playback_id
            }
            ImageORCarousel {
              url
              alternativeText
            }
          }
        }
        ... on ComponentSectionProjectWithManuallyEditable {
          Title
          Media {
            EnableMuxVideo
            MuxVideo {
              playback_id
            }
            ImageORCarousel {
              url
              alternativeText
            }
          }
          Description
          Button {
            ButtonText
            ButtonURL
            OpenNewTab
          }
        }
        ... on ComponentSectionImageAndText {
          Title
          ShowInQuickView
          Media {
          EnableMuxVideo
            MuxVideo {
              playback_id
            }
            ImageORCarousel {
              url
              alternativeText
            }
          }
          Heading
          Content
        }
        ... on ComponentSectionFullWidthMedia {
          Media {
            EnableMuxVideo
            MuxVideo {
              playback_id
            }
            ImageORCarousel {
              url
              alternativeText
            }
          }
          Padding {
            DesktopTopPadding
            DesktopBottomPadding
            MobileTopPadding
            MobileBottomPadding
          }
        }
        ... on ComponentSectionAestheticMaterials {
          Title
          ShowInQuickView
          TopContent
          BottomContent
          MaterialsImages {
            url
            alternativeText
          }
        }
        ... on ComponentSectionSingleMedia {
          Media {
            EnableMuxVideo
            MuxVideo {
              playback_id
            }
            ImageORCarousel {
              url
              alternativeText
            }
          }
        }
        ... on ComponentSectionAstheticsContact {
          Title
          ShowInQuickView
          Description
          Content
        }
        ... on ComponentSectionRelatedAesthetics {
          RelatedAesthetics {
            Name
            Slug
            Description
            DesktopMedia {
              EnableMuxVideo
              MuxVideo {
                playback_id
              }
              ImageORCarousel {
                url
                alternativeText
              }
            }
          }
        }
      }
    }
  }
`;