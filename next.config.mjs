/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  // --- Structura integration ---------------------------------------------
  // The Structura jewelry configurator is a separate Next.js app. To make it
  // appear as part of this site (e.g. musallis.com/studio), run Structura on
  // its own port and uncomment the rewrite below, OR later merge Structura's
  // routes directly into this app under src/app/studio.
  //
  // async rewrites() {
  //   return [
  //     {
  //       source: '/studio/:path*',
  //       destination: 'http://localhost:3001/:path*', // Structura dev server
  //     },
  //   ];
  // },
};

export default nextConfig;
