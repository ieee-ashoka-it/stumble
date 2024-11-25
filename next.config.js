/** @type {import('next').NextConfig} */
const nextConfig = {
  // your config options here
  images: {
    dangerouslyAllowSVG: true,
    remotePatterns: [{ hostname: "**" }],
  },
};

module.exports = nextConfig;