import useLanguage from "@/app/useLanguage";
import Link from "next/link";
import React from "react";

const Hero = () => {
  const { t } = useLanguage();
  return (
    <div className="relative">
      <div className="flex md:h-[640px] lg:bg-hero bg-hero-mobile bg-cover py-24">
        <div className="absolute inset-0 bg-white opacity-70 lg:hidden h-[640px]"></div>
        <div className="flex m-auto h-[344px] w-[560px] flex-col text-center gap-5 relative z-10">
          <h1 className="lg:text-[48px] text-[32px] lg:px-3 lg:leading-[57.6px] leading-[38.4px] text-[#363131] px-5">
            {t(`landing_desc_1`)}
          </h1>
          <p className="lg:text-[24px] text-[16px] text-[#646464] mb-2 px-2">
            {t(`landing_desc_1_desc`)}
          </p>
          <Link
            href="/#services"
            className="bg-[#8B0000] text-white px-4 py-3 rounded-xl w-[300px] md:block m-auto hidden"
          >
            {t(`hero_button`)}
          </Link>
        </div>
      </div>
      <div className="relative flex justify-center">
        <div className="absolute bottom-5 flex justify-center m-auto md:hidden text-center">
          <Link
            href="/#services"
            className="bg-[#8B0000] text-white px-4 py-3 rounded-xl w-[300px]"
          >
            {t(`hero_button`)}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Hero;
