import Image from "next/image";
import React from "react";

function Application() {
  return (
    <div className="bg-[#2E2D2D] px-48 mt-24 flex gap-10">
      <Image
        src="/assets/images/app.PNG"
        className="h-[325px]"
        width={900}
        height={325}
        alt=""
      />
      <div className="flex flex-col m-auto gap-5">
        <h1 className="text-[32px] text-white">
          <b>Use this government service</b> from now on, from anywhere, <br />{" "}
          and at any time!
        </h1>
        <div className="flex gap-3">
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
      </div>
    </div>
  );
}

export default Application;
