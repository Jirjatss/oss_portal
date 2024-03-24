import { Inter } from "next/font/google";
import "./globals.css";
import Head from "next/head";
import App from "./App";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "OSS Portal",
  description: "",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
      </Head>
      <body className="font-lato text-[#2E2D2D]">
        <App>{children}</App>
      </body>
    </html>
  );
}
