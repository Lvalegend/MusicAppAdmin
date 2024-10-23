/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true, // Recommended for the `pages` directory, default in `app`.
  swcMinify: true,
  experimental: {
    cssChunking: 'loose' // default
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '0e22-14-232-239-60.ngrok-free.app',
        port: '',
        pathname: '/**'
      }
    ]
  },
  env: {
    // API_URL: 'http://localhost:3000/lvalegend',
    API_URL: `https://0e22-14-232-239-60.ngrok-free.app/lvalegend`
  }
};

export default nextConfig;
