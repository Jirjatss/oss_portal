"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const Header = () => {
  const [scrollPosition, setScrollPosition] = useState(0);
  const lang = ["EN", "TP", "PT"];

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
          scrollPosition > 60 ? "bg-white" : "bg-white opacity-30"
        }`}
      />
      <div className="relative z-10 m-0">
        <ul className="flex gap-5 mt-2">
          <li className="m-auto ">
            <Link href="/">
              <Image src="/assets/logo.png" width={57} height={10} alt="" />
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
      <div className="relative z-10">
        <ul className="flex gap-7">
          <li className="flex m-auto">
            <select className="w-full border-none bg-transparent text-gray-900 cursor-pointer p-2 rounded-lg font-thin">
              {lang.map((e) => (
                <option key={e} className="py-2">
                  {e}
                </option>
              ))}
            </select>
          </li>
          <li className="m-auto">
            <a href="" className="text-[#1C25E7]">
              Login
            </a>
          </li>
          <li className="m-auto">
            <button className="bg-[#1C25E7] text-white py-2 px-3 rounded-lg block m-auto">
              Sign Up
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Header;
