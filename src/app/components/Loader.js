import React from "react";

function Loader({ message = "loading" }) {
  return (
    <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-70 z-30">
      <div className="flex flex-col gap-3 justify-center items-center">
        <img
          src="/assets/images/loading.gif"
          alt="Loading..."
          className="w-10"
        />
        <p className="text-[#FFFFFF] text-[16px] font-thin">{message}</p>
      </div>
    </div>
  );
}

export default Loader;
