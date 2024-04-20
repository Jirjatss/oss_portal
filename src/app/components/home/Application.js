import Image from "next/image";
import React from "react";

function Application() {
  return (
    <div className="bg-[#2E2D2D] lg:px-28 lg:mt-24 mt-10 flex lg:flex-row flex-col lg:gap-10 gap-5">
      <Image
        src="/assets/images/app.PNG"
        className="h-[340px] lg:block hidden"
        width={900}
        height={325}
        alt=""
      />
      <img
        src="/assets/images/app.PNG"
        className="h-full w-full lg:hidden"
        alt=""
      />
      <div className="flex flex-col m-auto gap-5 lg:px-0 px-5">
        <h1 className="lg:text-[32px] text-[24px] text-white">
          <b>Use this government service</b> from now on, from anywhere, <br />{" "}
          and at any time!
        </h1>
        <div className="lg:flex gap-3 hidden">
          <Image
            src="/assets/images/appstore.png"
            width={220}
            height={40}
            alt=""
          />
          <Image
            src="/assets/images/googlestore.png"
            width={220}
            height={10}
            alt=""
          />
        </div>
        <div className="grid grid-cols-2 gap-3 lg:hidden pb-7">
          <Image
            src="/assets/images/appstore.png"
            width={250}
            height={150}
            alt=""
          />
          <Image
            src="/assets/images/googlestore.png"
            width={250}
            height={150}
            alt=""
            className="mt-1"
          />
        </div>
      </div>
    </div>
  );
}

export default Application;
