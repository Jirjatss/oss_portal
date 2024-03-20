"use client";

import React, { useState } from "react";
import { OSSIcons } from "../../../public/assets/icons/parent";
import { useRouter } from "next/navigation";
import FormIdentify from "../components/Form/FormIdentify";
import FormContact from "../components/Form/FormContact";
import FormUploadPhoto from "../components/Form/FormUploadPhoto";
import { useDispatch, useSelector } from "react-redux";
import { editProfile } from "../store/actions/userAction";
import { LOADING } from "../store/actions/action_type";
import { toast } from "sonner";

function Verification() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const { user, personalInformation, loading, profile } = useSelector(
    (state) => state.userReducer
  );

  const { personalDetail } = profile || {};
  const dispatch = useDispatch();
  const nextHandler = () => {
    dispatch({
      type: LOADING,
    });
    setStep(step + 1);
  };

  const updateProfile = () => {
    dispatch(editProfile(personalInformation, user?.accessToken)).then(() =>
      toast.success("Success Edit Profile")
    );
  };

  return (
    <>
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
          {!personalDetail?.firstName && (
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
          )}
        </div>
        {step === 1 && (
          <FormIdentify
            onClick={() => {
              if (personalDetail?.firstName) updateProfile();
              else nextHandler();
            }}
          />
        )}
        {step === 2 && <FormContact onClick={nextHandler} />}
        {step === 3 && <FormUploadPhoto />}
      </div>
    </>
  );
}

export default Verification;
