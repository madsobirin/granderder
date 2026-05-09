/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ["image/webp", "image/avif"],
    minimumCacheTTL: 60 * 60 * 24 * 7,
  },
  allowedDevOrigins: ["192.168.1.6"],
};

export default nextConfig;
