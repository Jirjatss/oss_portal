"use client";

import React, { useState } from "react";
import { OSSIcons } from "../../../public/assets/icons/parent";
import { useRouter } from "next/navigation";
import FormIdentify from "../components/Form/FormIdentify";
import FormContact from "../components/Form/FormContact";
import FormUploadPhoto from "../components/Form/FormUploadPhoto";

function Verification() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const nextHandler = () => {
    setStep(step + 1);
  };
  const submitData = () => {
    alert("sajad ganteng");
  };
  return (
    <div className="px-52 bg-white py-10 min-h-screen">
      <div className="flex justify-between items-center mb-10">
        <div
          className="flex gap-2 cursor-pointer"
          onClick={() => {
            if (step === 1) router.back();
            setStep(step - 1);
          }}
        >
          <OSSIcons name="LeftArrow" />
          <p className="text-[18px] font-semibold text-[#2E2D2D]">
            Personal Information
          </p>
        </div>
        <div className="flex gap-3 items-center">
          <div className="w-[98px] h-[8.5px] bg-[#DCDCDC] rounded-[20px] relative">
            <div
              className={`${
                step === 1 ? "w-1/3" : step === 2 ? "w-2/3" : "w-full"
              } bg-[#000A80] rounded-[20px] h-[8.5px] absolute top-0`}
            ></div>
          </div>
          <p className="text-[16px] text-[#646464]">{step}/3 Steps</p>
        </div>
      </div>
      {step === 1 && <FormIdentify onClick={nextHandler} />}
      {step === 2 && <FormContact onClick={nextHandler} />}
      {step === 3 && <FormUploadPhoto onClick={submitData} />}
    </div>
  );
}

export default Verification;
