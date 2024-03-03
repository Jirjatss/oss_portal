import Image from "next/image";
import React from "react";
import { EmptyApplicant } from "../../../../public/assets/emoji";

function MyApplicant() {
  return (
    <div className="border-[#DCDCDC] rounded-[20px] border-[1px] p-[24px]">
      <div className="flex flex-col gap-8">
        <div className="flex justify-between items-center">
          <p className="text-[18px] text-[#363131] font-semibold">
            My Applications
          </p>
          <p className="text-[#1C25E7] text-[14px] font-semibold">See All</p>
        </div>

        <div className="bg-[#DCDCDC] rounded-xl justify-center items-center flex p-5 m-auto">
          <Image src={EmptyApplicant} width={50} height={50} alt={"Empty"} />
        </div>

        <div className="flex justify-center items-center flex-col text-center gap-4">
          <p className="text-[18px] text-[#363131] font-semibold">
            No Applications Yet
          </p>
          <p className="text-[16px] text-[#646464] font-thin">
            Once you submitted applicants, you can track the status here
          </p>
        </div>
      </div>
    </div>
  );
}

export default MyApplicant;
