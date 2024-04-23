/** @type {import('next').NextConfig} */
// const { i18n } = require("./next-i18next.config.js");

import pkg from "./next-i18next.config.js";
const { i18n } = pkg;
const nextConfig = {
  experimental: {
    missingSuspenseWithCSRBailout: false,
  },
  i18n,
};

export default nextConfig;
