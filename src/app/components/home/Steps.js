import React from "react";
import {
  FlowStep1,
  FlowStep2,
  FlowStep3,
} from "../../../../public/assets/emoji";
import Image from "next/image";

const Steps = () => {
  return (
    <div
      className="border-[#DCDCDC] border shadow-lg rounded-xl mx-28 m-auto lg:-mt-12 mt-10 bg-white p-12 justify-center relative py-24"
      id="step"
    >
      <h1 className="text-[40px] px-3 leading-[57.6px] text-[#363131] text-center">
        <b>Easy Application</b> In Three Steps!
      </h1>
      <div className="flex mt-7 m-auto justify-between">
        <div className="w-[220px] h-[214px] flex justify-center items-center flex-col gap-2">
          <div className=" bg-[#E7953E] flex justify-center items-center rounded-[8px] p-4">
            <Image src={FlowStep1} width={55} height={50} alt={"Empty"} />
          </div>
          <div className="">
            <h1 className="text-[28px] text-[#363131] text-center font-bold">
              Step 1
            </h1>
            <p className="text-[18px] text-[#646464] text-center capitalize">
              Fill the form <br />
              and attached the required document
            </p>
          </div>
        </div>
        <div className="w-[87.3px] text-black m-auto flex justify-center items-center border-[4px] border-dashed border-[#DCDCDC]"></div>
        <div className="w-[220px] h-[214px] flex justify-center items-center flex-col gap-2 ">
          <div className=" bg-[#E7953E] flex justify-center items-center rounded-[8px] p-4">
            <Image src={FlowStep2} width={55} height={50} alt={"Empty"} />
          </div>
          <div className="">
            <h1 className="text-[28px] text-[#363131] text-center font-bold">
              Step 2
            </h1>
            <p className="text-[18px] text-[#646464] text-center capitalize">
              Submit For Online registration and wait for the approval
            </p>
          </div>
        </div>
        <div className="w-[87.3px] text-black m-auto flex justify-center items-center border-[4px] border-dashed border-[#DCDCDC]"></div>
        <div className="w-[220px] h-[214px] flex justify-center items-center flex-col gap-2 ">
          <div className=" bg-[#E7953E] flex justify-center items-center rounded-[8px] p-4">
            <Image src={FlowStep3} width={55} height={50} alt={"Empty"} />
          </div>
          <div className="">
            <h1 className="text-[28px] text-[#363131] text-center font-bold">
              Step 3
            </h1>
            <p className="text-[18px] text-[#646464] text-center capitalize">
              Get the approval and wait till the process reach to the completion
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Steps;
