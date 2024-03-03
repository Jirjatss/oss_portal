import React from "react";

const Hero = () => {
  return (
    <div className="relative">
      <div className="flex h-[640px] lg:bg-hero bg-hero-mobile bg-cover">
        <div className="absolute inset-0 bg-white opacity-70 lg:hidden h-[640px]"></div>
        {/* Lapisan putih */}
        <div className="flex m-auto h-[344px] w-[538px] flex-col text-center gap-5 relative z-10">
          <h1 className="lg:text-[48px] text-[32px] lg:px-3 lg:leading-[57.6px] leading-[38.4px] text-[#363131] px-5">
            <b>Process Documents </b>
            In The Government Only <b>From Your Hands</b>
          </h1>
          <p className="lg:text-[24px] text-[16px] text-[#646464] mb-2 px-2">
            Now all your document can be handled online, much faster, more
            timely and easier to handle.
          </p>
          <button className="bg-[#1C25E7] text-white px-4 py-3 rounded-xl w-[300px] block m-auto">
            Explore Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default Hero;
