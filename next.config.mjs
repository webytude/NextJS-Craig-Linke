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
};

export default nextConfig;