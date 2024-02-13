import React from "react";

const Hero = () => {
  return (
    <div className="flex h-[640px] bg-hero bg-cover">
      <div className="flex m-auto h-[344px] w-[538px] flex-col text-center gap-5 ">
        <h1 className="text-[48px] px-3 leading-[57.6px] text-[#363131] ">
          <b>Process Documents </b>
          In The Government Only <b>From Your Hands</b>
        </h1>
        <p className="text-[24px] text-[#646464] mb-2">
          Now all your document can be handled online, much faster, more timely
          and easier to handle.
        </p>
        <button className="bg-[#1C25E7] text-white px-4 py-3 rounded-xl w-[300px] block m-auto">
          Explore Now
        </button>
      </div>
    </div>
  );
};

export default Hero;
