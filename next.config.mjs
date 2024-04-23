/** @type {import('next').NextConfig} */
// const { i18n } = require("./next-i18next.config.js");
// import { i18n } from "next-i18next";
// import path from "path";
import pkg from "./next-i18next.config.js";
const { i18n } = pkg;

const nextConfig = {
  experimental: {
    missingSuspenseWithCSRBailout: false,
  },
  i18n,
  // // localePath: path.resolve("./assets/locales"),
  // react: {
  //   useSuspense: true,
  // },
};

export default nextConfig;
