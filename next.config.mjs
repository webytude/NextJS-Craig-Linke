/** @type {import('next').NextConfig} */
const nextConfig = {
  reactCompiler: true,
  trailingSlash: false,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "methodical-darling-8216aa988c.media.strapiapp.com",
        port: "",
        pathname: "/**",
      },
    ],
    unoptimized: true,
  },

  async redirects() {
    return [

      // =============================
      // PROJECT REDIRECTS
      // =============================
      { source: '/projects/toorak-gardens/fergusson', destination: '/projects', permanent: true },
      { source: '/projects/norwood/theresa', destination: '/projects', permanent: true },
      { source: '/projects/norwood/osmond-terrace', destination: '/projects', permanent: true },
      { source: '/projects/clarence-park/churchill', destination: '/projects', permanent: true },
      { source: '/projects/burnside/craig-donnas', destination: '/projects', permanent: true },
      { source: '/projects/adelaide-city/the-kiln', destination: '/projects', permanent: true },
      { source: '/projects/unley-park/weybridge-house', destination: '/projects', permanent: true },
      { source: '/projects/parkside/the-garden-pavilion', destination: '/projects', permanent: true },
      { source: '/projects/norwood/osmond-terrace-part-2', destination: '/projects', permanent: true },
      { source: '/projects/norwood/the-cottage', destination: '/projects', permanent: true },
      { source: '/projects/burnside/the-heritage-verandah', destination: '/projects', permanent: true },
      { source: '/projects/st-peters/st-peters', destination: '/projects', permanent: true },
      { source: '/projects/burnside/the-pool-pavilion', destination: '/projects', permanent: true },
      { source: '/projects/norwood/george', destination: '/projects', permanent: true },
      { source: '/projects/hyde-park/villa-kolam', destination: '/projects', permanent: true },
      { source: '/projects/forestville/teppanyaki-pavilion', destination: '/projects', permanent: true },
      { source: '/projects/magill/the-mccabes', destination: '/projects', permanent: true },

      // keep slug pages
      { source: '/projects/burnside/number-33', destination: '/projects/number-33', permanent: true },
      { source: '/projects/toorak-gardens/belltunga', destination: '/projects/belltunga', permanent: true },
      { source: '/projects/stonyfell/omh', destination: '/projects/omh', permanent: true },
      { source: '/projects/kent-town/home-base', destination: '/projects/home-base', permanent: true },
      { source: '/projects/north-adelaide/hill-house', destination: '/projects/hill-house', permanent: true },
      { source: '/projects/fleurieu-peninsula/beach-house', destination: '/projects/beach-house', permanent: true },
      { source: '/projects/medindie/le-jardin', destination: '/projects/le-jardin', permanent: true },
      { source: '/projects/kensington-gardens/kensington', destination: '/projects/kensington', permanent: true },
      { source: '/projects/unley/villa-1890', destination: '/projects/villa-1890', permanent: true },

      // =============================
      // LEGACY PAGES
      // =============================
      { source: '/about/meet-the-team', destination: '/about', permanent: true },

      { source: '/services/architecturally-designed-homes', destination: '/services', permanent: true },
      { source: '/services/custom-renovations-additions/', destination: '/services', permanent: true },
      { source: '/services/outdoor-living', destination: '/services', permanent: true },
      { source: '/services/boutique-commercial', destination: '/services', permanent: true },

      { source: '/projects/our-process', destination: '/our-process', permanent: true },

      // =============================
      // LOCATION PAGES
      // =============================
      { source: '/location/:slug', destination: '/projects', permanent: true },

      // =============================
      // PROJECT TYPE
      // =============================
      { source: '/project-type/:slug', destination: '/projects', permanent: true },

      // =============================
      // PROJECT AWARDS
      // =============================
      { source: '/project-award/:slug', destination: '/about', permanent: true },

    ];
  }
};

export default nextConfig;