/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  reactCompiler: true,
  images: {
    domains: [
      "methodical-darling-8216aa988c.media.strapiapp.com"
    ],
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "methodical-darling-8216aa988c.media.strapiapp.com",
        port: "",
        pathname: "/**",
      }
    ],
  },
};

export default nextConfig;
