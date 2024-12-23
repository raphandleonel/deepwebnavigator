/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["cdn.sanity.io"], // Add the Sanity CDN domain here
  },
};

module.exports = nextConfig;
