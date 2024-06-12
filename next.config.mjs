/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    experimental: {
      appDir: true,
    },
    images: {
      domains: ['localhost']
    },
    async rewrites() {
      return [
        {
          source: "/register",
          destination: "/auth/register",
        },
        {
          source: "/login",
          destination: "/auth/login",
        },
        {
          source: "/siswa",
          destination: "/siswa/dashboard",
        },
      ];
    },
  };

export default nextConfig;
