/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  async rewrites() {
    console.log(process.env.APP_BE === process.env.APP_FE
      ? []
      : [
          {
            source: '/api/v1/:path*',
            destination: `${process.env.APP_BE}/:path*`, // Proxy to Backend
          },
        ]);
    return process.env.APP_BE === process.env.APP_FE
    ? []
    : [
        {
          source: '/api/v1/:path*',
          destination: `${process.env.APP_BE}/:path*`, // Proxy to Backend
        },
      ]
  }
 
}
module.exports = nextConfig
