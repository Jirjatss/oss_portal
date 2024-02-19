"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import LanguageSelector from "../languangeSelector/LanguangeSelector";

const Header = () => {
  const [scrollPosition, setScrollPosition] = useState(0);
  const pathname = usePathname();

  useEffect(() => {
    const updatePosition = () => {
      setScrollPosition(window.pageYOffset);
    };

    window.addEventListener("scroll", updatePosition);
    return () => window.removeEventListener("scroll", updatePosition);
  }, []);

  return (
    <div className="sticky top-0 z-30 p-5 px-28 flex justify-between text-navbar">
      <div
        className={`absolute inset-0 ${
          pathname !== "/"
            ? "bg-white border-b-2"
            : scrollPosition > 60
            ? "bg-white border-b-2"
            : "bg-white opacity-30"
        }`}
      />
      <div className="relative z-10 m-0">
        <ul className="flex gap-5 mt-1">
          <li className="m-auto ">
            <Link href="/">
              <Image src="/assets/logo.png" width={70} height={70} alt="" />
            </Link>
          </li>
          <li className="m-auto ">
            <Link href="">How To Apply</Link>
          </li>
          <li className="m-auto">
            <a href="">Services</a>
          </li>
          <li className="m-auto">
            <a href="">Contact us</a>
          </li>
        </ul>
      </div>
      <div className="relative z-10 mt-1">
        <ul className="flex gap-7">
          <li className="flex m-auto">
            <LanguageSelector />
          </li>
          <li className="m-auto">
            <Link href="/login" className="text-[#1C25E7]">
              Login
            </Link>
          </li>
          <li className="m-auto">
            <button className="bg-[#1C25E7] text-white py-2 px-3 rounded-lg block m-auto">
              <Link href="/register">Sign Up</Link>
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Header;
