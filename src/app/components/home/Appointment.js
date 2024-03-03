import React from "react";
import { OSSIcons } from "../../../../public/assets/icons/parent";

function Appointment() {
  return (
    <div className="mt-24 flex px-28 text-black gap-10">
      <h1 className="text-[40px] capitalize w-[240px]">
        <b>Need meeting</b> with Officer?
      </h1>
      <div className="border-[1px] border-[#DCDCDC] rounded-[20px] flex flex-1 p-6 gap-8 items-center">
        <div className="bg-[#D9D7F9] rounded-[12.8px] w-[64px] h-[64px] flex justify-center items-center">
          <p className="text-[38.4px]">🗓</p>
        </div>
        <div className="flex flex-col flex-1">
          <h1 className="text-[24px] font-bold leading-[48px]">
            Set Appointment Online First
          </h1>
          <p className="text-[16px] text-[#646464]">
            Effortlessly book appointments with government officials <br />{" "}
            online for a seamless service experience
          </p>
        </div>
        <button className="">
          <OSSIcons
            name="RightArrow"
            style={{ width: "40px", height: "40px" }}
          />
        </button>
      </div>
    </div>
  );
}

export default Appointment;
