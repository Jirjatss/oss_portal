import React from "react";

const Steps = () => {
  return (
    <div className="border-[#DCDCDC] border shadow-lg rounded-xl w-[1100px] h-[382px] m-auto -mt-12 bg-white p-12 justify-center">
      <h1 className="text-[40px] px-3 leading-[57.6px] text-[#363131] text-center">
        <b>Easy Application</b> In Three Steps!
      </h1>
      <div className="flex mt-7  w-[922px] m-auto justify-between">
        <div className="w-[220px] h-[214px] flex justify-center items-center flex-col gap-2">
          <div className="w-[72px] h-[72px] bg-[#E7953E] flex justify-center items-center rounded-[8px] p-10">
            <p className="flex justify-center items-center text-[54px]">📋</p>
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
          <div className="w-[72px] h-[72px] bg-[#E7953E] flex justify-center items-center rounded-[8px] p-10">
            <p className="flex justify-center items-center text-[54px]">⏱</p>
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
          <div className="w-[72px] h-[72px] bg-[#E7953E] flex justify-center items-center rounded-[8px] p-10">
            <p className="flex justify-center items-center text-[54px]">☑️</p>
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
