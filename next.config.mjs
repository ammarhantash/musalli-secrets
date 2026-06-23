/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async rewrites() {
    return [
      { source: "/:lang(en|ar)/shop", destination: "http://localhost:3001" },
      { source: "/:lang(en|ar)/shop/:path*", destination: "http://localhost:3001/:path*" },
    ];
  },
};

export default nextConfig;
