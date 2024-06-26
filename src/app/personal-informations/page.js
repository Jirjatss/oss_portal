"use client";

import React, { useEffect, useState } from "react";
import { OSSIcons } from "../../../public/assets/icons/parent";
import { useRouter } from "next/navigation";
import FormIdentify from "../components/Form/FormIdentify";
import FormContact from "../components/Form/FormContact";
import FormUploadPhoto from "../components/Form/FormUploadPhoto";
import { useDispatch, useSelector } from "react-redux";
import { LOADING } from "../store/actions/action_type";
import FormOtpModal from "../components/Modal/FormOtp";
import ModalSuccess from "../components/Modal/ModalSuccess";
import { requestOtp, showVerif } from "../store/actions/userAction";
import SubmitConfirmation from "../components/Modal/SubmitConfirmation";
import useLanguage from "../useLanguage";

function Verification() {
  const router = useRouter();
  const dispatch = useDispatch();
  const { t } = useLanguage();
  const [isShowOtp, setIsShowOtp] = useState(false);
  const [step, setStep] = useState(1);
  const { profile } = useSelector((state) => state.userReducer);

  const { personalDetail } = profile || {};
  const nextHandler = () => {
    dispatch({
      type: LOADING,
    });
    setStep(step + 1);
  };

  const requestEditProfile = () => {
    dispatch(requestOtp(personalDetail?.phoneNumber)).then(() => {
      setIsShowOtp(true);
    });
  };

  useEffect(() => {
    if (isShowOtp) form_otp_modal.showModal();
  }, [isShowOtp]);

  return (
    <div className="lg:px-52 px-5 bg-white py-10 min-h-screen">
      <div className="flex lg:flex-row flex-col justify-between mb-10">
        <div
          className="flex gap-2 cursor-pointer"
          onClick={() => {
            if (step === 1) router.push("/");
            else setStep(step - 1);
          }}
        >
          <OSSIcons name="LeftArrow" />
          <p className="text-[18px] font-semibold text-[#2E2D2D]">
            {t("update_profile_title")}
          </p>
        </div>
        {!personalDetail?.firstName && (
          <div className="flex lg:flex-row flex-col lg:gap-3 gap-1 items-center  lg:mt-0 mt-5">
            <div className="w-[98px] h-[8.5px] bg-[#DCDCDC] rounded-[20px] relative">
              <div
                className={`${
                  step === 1 ? "w-1/3" : step === 2 ? "w-2/3" : "w-full"
                } bg-[#000A80] rounded-[20px] h-[8.5px] absolute top-0`}
              ></div>
            </div>
            <p className="text-[16px] text-[#646464]">
              {step}/3 {t("step")}
            </p>
          </div>
        )}
      </div>

      {step === 1 && (
        <FormIdentify
          onClick={() => {
            if (personalDetail?.firstName) {
              requestEditProfile();
            } else nextHandler();
          }}
        />
      )}
      {step === 2 && <FormContact onClick={() => nextHandler()} />}

      {step === 3 && <FormUploadPhoto />}

      {isShowOtp && <FormOtpModal />}

      <ModalSuccess
        id="personal_informations"
        title="Your Data Have Submitted"
        description=" Your submitted data is being reviewed by our team. Verification may take some time. Thank you for your patience!"
        onClick={() => {
          router.push("/");
        }}
      />
    </div>
  );
}

export default Verification;
