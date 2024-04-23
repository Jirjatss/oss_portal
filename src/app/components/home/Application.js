import Image from "next/image";
import React from "react";

function Application() {
  return (
    <div className="bg-[#2E2D2D] lg:px-28 lg:mt-24 mt-10 flex lg:flex-row flex-col lg:gap-10 gap-5">
      <Image
        src="/assets/images/app.png"
        className="h-[340px] lg:block hidden"
        width={900}
        height={325}
        alt=""
      />
      <img
        src="/assets/images/app.png"
        className="h-full w-full lg:hidden"
        alt=""
      />
      <div className="flex flex-col m-auto gap-5 lg:px-0 px-5">
        <h1 className="lg:text-[32px] text-[24px] text-white">
          Uza serbisu governu nian ne’e husi agora ba oin, husi fatin nebe
          de’it, no iha tempu saida de’it!
        </h1>
        <div className="lg:flex gap-3 hidden cursor-pointer">
          <Image
            src="/assets/images/appstore.png"
            width={220}
            height={10}
            alt=""
          />
        </div>
        <div className="grid grid-cols-2 gap-3 lg:hidden pb-7 cursor-pointer">
          <Image
            src="/assets/images/appstore.png"
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
