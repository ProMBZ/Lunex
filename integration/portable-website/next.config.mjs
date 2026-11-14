/** @type {import('next').NextConfig} */
const nextConfig = {
  poweredByHeader: false,
  reactStrictMode: true,
  // Keep Turbopack and workspace file resolution inside this portable app.
  turbopack: {
    root: process.cwd()
  }
};
export default nextConfig;
