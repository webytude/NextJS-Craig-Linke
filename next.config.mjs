/** @type {import('next').NextConfig} */
const nextConfig = {
  reactCompiler: true,

  // Keep consistent URL format
  trailingSlash: false,
  skipTrailingSlashRedirect: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "methodical-darling-8216aa988c.media.strapiapp.com",
        pathname: "/**",
      },
    ],
    unoptimized: true,
  },
  async redirects() {
    return [
      // Projects
      {
        source: '/le-jardin',
        destination: '/projects/le-jardin',
        permanent: true,
      },
      {
        source: '/hill-house',
        destination: '/projects/hill-house',
        permanent: true,
      },
      {
        source: '/omh',
        destination: '/projects/omh',
        permanent: true,
      },
      {
        source: '/beach-house',
        destination: '/projects/beach-house',
        permanent: true,
      },
      {
        source: '/belltunga',
        destination: '/projects/belltunga',
        permanent: true,
      },
      {
        source: '/villa-1890',
        destination: '/projects/villa-1890',
        permanent: true,
      },
      {
        source: '/kensington',
        destination: '/projects/kensington',
        permanent: true,
      },
      {
        source: '/thegrounds',
        destination: '/projects/thegrounds',
        permanent: true,
      },
      {
        source: '/victoria-hall',
        destination: '/projects/victoria-hall',
        permanent: true,
      },
      {
        source: '/lwa',
        destination: '/projects/lwa',
        permanent: true,
      },
      {
        source: '/home-base',
        destination: '/projects/home-base',
        permanent: true,
      },
      {
        source: '/number-33',
        destination: '/projects/number-33',
        permanent: true,
      },

      // Journals
      {
        source: '/villa-1890-making-the-connection',
        destination: '/journals/villa-1890-making-the-connection',
        permanent: true,
      },
      {
        source: '/hia-award-wins-2025',
        destination: '/journals/hia-award-wins-2025',
        permanent: true,
      },
      {
        source: '/the-grounds-building-character',
        destination: '/journals/the-grounds-building-character',
        permanent: true,
      },
      {
        source: '/1-mixing-natural-fibres-and-finishes-for-modern-interiors',
        destination: '/journals/1-mixing-natural-fibres-and-finishes-for-modern-interiors',
        permanent: true,
      },
      {
        source: '/1-mixing-natural-fibres-and-finishes-for-modern-interiors',
        destination: '/journals/1-mixing-natural-fibres-and-finishes-for-modern-interiors',
        permanent: true,
      },

      // Aesthetics
      {
        source: '/contemporary-classic',
        destination: '/aesthetics-details/contemporary-classic',
        permanent: true,
      },
      {
        source: '/new-heritage',
        destination: '/aesthetics-details/new-heritage',
        permanent: true,
      },
      {
        source: '/tailored-aesthetic',
        destination: '/aesthetics-details/tailored-aesthetic',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;