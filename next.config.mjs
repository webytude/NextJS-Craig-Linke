/** @type {import('next').NextConfig} */
const nextConfig = {
  reactCompiler: true,
  poweredByHeader: false,
  compress: true,

  trailingSlash: false,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "methodical-darling-8216aa988c.media.strapiapp.com",
        pathname: "/**",
      },
    ],
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  async headers() {
    return [
      {
        source: "/(.*\\.(?:ico|png|jpg|jpeg|gif|svg|webp|avif|woff2|woff))",
        headers: [{ key: "Cache-Control", value: "public, max-age=31536000, immutable" }],
      },
      {
        source: "/_next/static/(.*)",
        headers: [{ key: "Cache-Control", value: "public, max-age=31536000, immutable" }],
      },
      {
        source: "/(.*)",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
        ],
      },
    ];
  },
  async redirects() {
    return [
      // Projects
      {
        source: '/le-jardin',
        destination: '/projects/le-jardin',
        statusCode: 301,
      },
      {
        source: '/hill-house',
        destination: '/projects/hill-house',
        statusCode: 301,
      },
      {
        source: '/omh',
        destination: '/projects/omh',
        statusCode: 301,
      },
      {
        source: '/beach-house',
        destination: '/projects/beach-house',
        statusCode: 301,
      },
      {
        source: '/belltunga',
        destination: '/projects/belltunga',
        statusCode: 301,
      },
      {
        source: '/villa-1890',
        destination: '/projects/villa-1890',
        statusCode: 301,
      },
      {
        source: '/kensington',
        destination: '/projects/kensington',
        statusCode: 301,
      },
      {
        source: '/thegrounds',
        destination: '/projects/thegrounds',
        statusCode: 301,
      },
      {
        source: '/victoria-hall',
        destination: '/projects/victoria-hall',
        statusCode: 301,
      },
      {
        source: '/lwa',
        destination: '/projects/lwa',
        statusCode: 301,
      },
      {
        source: '/home-base',
        destination: '/projects/home-base',
        statusCode: 301,
      },
      {
        source: '/number-33',
        destination: '/projects/number-33',
        statusCode: 301,
      },

      // Journals
      {
        source: '/villa-1890-making-the-connection',
        destination: '/journals/villa-1890-making-the-connection',
        statusCode: 301,
      },
      {
        source: '/hia-award-wins-2025',
        destination: '/journals/hia-award-wins-2025',
        statusCode: 301,
      },
      {
        source: '/the-grounds-building-character',
        destination: '/journals/the-grounds-building-character',
        statusCode: 301,
      },
      {
        source: '/1-mixing-natural-fibres-and-finishes-for-modern-interiors',
        destination: '/journals/1-mixing-natural-fibres-and-finishes-for-modern-interiors',
        statusCode: 301,
      },

      // Aesthetics
      {
        source: '/contemporary-classic',
        destination: '/aesthetics-details/contemporary-classic',
        statusCode: 301,
      },
      {
        source: '/new-heritage',
        destination: '/aesthetics-details/new-heritage',
        statusCode: 301,
      },
      {
        source: '/tailored-aesthetic',
        destination: '/aesthetics-details/tailored-aesthetic',
        statusCode: 301,
      },
    ];
  },
};

export default nextConfig;