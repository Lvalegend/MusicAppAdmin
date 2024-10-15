/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true, // Recommended for the `pages` directory, default in `app`.
  swcMinify: true,
  experimental: {
    cssChunking: 'loose' // default
  },
  env: {
    // API_URL: 'http://localhost:3000/lvalegend',
    API_URL: ' https://d696-14-231-164-7.ngrok-free.app/lvalegend'
  }
};

export default nextConfig;
