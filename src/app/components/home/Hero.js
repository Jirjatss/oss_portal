import Link from "next/link";
import React from "react";

const Hero = () => {
  return (
    <div className="relative">
      <div className="flex md:h-[640px] lg:bg-hero bg-hero-mobile bg-cover py-24">
        <div className="absolute inset-0 bg-white opacity-70 lg:hidden h-[640px]"></div>
        <div className="flex m-auto h-[344px] w-[560px] flex-col text-center gap-5 relative z-10">
          <h1 className="lg:text-[48px] text-[32px] lg:px-3 lg:leading-[57.6px] leading-[38.4px] text-[#363131] px-5">
            Prosesu Dokumentu Sira Iha Governu Husi Ita-nia Liman Rasik De’it.
          </h1>
          <p className="lg:text-[24px] text-[16px] text-[#646464] mb-2 px-2">
            Agora ita-boot sira-nia dokumentu hotu bele trata online, lalais
            liu, oportunu no fasil liu atu kontrola.
          </p>
          <Link
            href="/#services"
            className="bg-[#1C25E7] text-white px-4 py-3 rounded-xl w-[300px] md:block m-auto hidden"
          >
            Esplora Agora
          </Link>
        </div>
      </div>
      <div className="relative flex justify-center">
        <div className="absolute bottom-5 flex justify-center m-auto md:hidden text-center">
          <Link
            href="/#services"
            className="bg-[#1C25E7] text-white px-4 py-3 rounded-xl w-[300px]"
          >
            Esplora Agora
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Hero;
