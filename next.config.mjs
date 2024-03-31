/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    missingSuspenseWithCSRBailout: false,
  },
  i18n: {
    locales: ["en", "pt"],
    defaultLocale: "en",
  },
};

export default nextConfig;
