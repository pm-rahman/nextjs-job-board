/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "za6uofhcvklchqgh.public.blob.vercel-storage.com",
      },
    ],
  },
};

module.exports = nextConfig;
