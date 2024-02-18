import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "../app/components/layout/Header";
import Head from "next/head";
import Footer from "./components/layout/Footer";

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
        <link
          href="https://fonts.googleapis.com/css2?family=Lato:wght@300&family=Roboto:wght@500&display=swap"
          rel="stylesheet"
        />
      </Head>
      <body className="font-lato text-black">
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
