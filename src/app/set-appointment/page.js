"use client";

import React, { useEffect, useState } from "react";
import { OSSIcons } from "../../../public/assets/icons/parent";
import { useRouter, useSearchParams } from "next/navigation";
import FormAppointment from "../components/Form/FormAppointment";
import FormSetDate from "../components/Form/FormSetDate";
import FormAppointmentProfile from "../components/Form/FormAppointmentProfile";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";
import { useDispatch, useSelector } from "react-redux";
import { getUserInformation } from "../store/actions/userAction";
import { toast } from "sonner";
import ModalSuccess from "../components/Modal/ModalSuccess";

const SetAppointment = () => {
  const user = useAuthUser();
  const router = useRouter();
  const dispatch = useDispatch();
  const searchParams = useSearchParams();
  const reschedule = searchParams.get("reschedule");

  const [step, setStep] = useState(1);

  const { profile } = useSelector((state) => state.userReducer);

  const { personalDetail } = profile || {};
  const { firstName } = personalDetail || {};

  const nextHandler = () => {
    setStep(step + 1);
  };

  useEffect(() => {
    if (user) dispatch(getUserInformation(user.accessToken));
  }, [user, dispatch]);

  useEffect(() => {
    if (reschedule && reschedule === "true") setStep(2);
  }, [reschedule]);

  useEffect(() => {
    if (user && firstName === "") {
      toast.error("You need to Verification your account First");
      router.push("/personal-informations");
    }
  });

  return (
    <>
      <div className="lg:px-52 px-5 bg-white py-10 min-h-screen">
        <div className="flex lg:flex-row flex-col justify-between ">
          <div
            className="flex gap-2 cursor-pointer"
            onClick={() => {
              if (step > 1) setStep(step - 1);
              else router.push("/");
            }}
          >
            <OSSIcons name="LeftArrow" />
            <p className="text-[18px] font-semibold text-[#2E2D2D]">
              Set Appointment
            </p>
          </div>
          {!reschedule && (
            <div className="flex lg:flex-row flex-col lg:gap-3 gap-1 items-center  lg:mt-0 mt-5">
              <div className="w-[98px] h-[8.5px] bg-[#DCDCDC] rounded-[20px] relative">
                <div
                  className={`${
                    step === 1 ? "w-1/2" : step === 2 ? "w-2/3" : "w-full"
                  } bg-[#000A80] rounded-[20px] h-[8.5px] absolute top-0`}
                ></div>
              </div>
              <p className="text-[16px] text-[#646464]">{step}/3 Steps</p>
            </div>
          )}
        </div>
        {step === 1 && <FormAppointment onContinue={nextHandler} />}
        {step === 2 && <FormSetDate onContinue={nextHandler} />}
        {step === 3 && <FormAppointmentProfile />}
        <ModalSuccess
          id="appointment_success"
          title="Your Appointement Have Submitted"
          description={
            user
              ? "Your Appointment is being reviewed by our team. Verification may take some time. Thank you for your patience!"
              : "Your Appointment is being reviewed by our team. Verification will sent to your email, please check regularly."
          }
          onClick={() => {
            router.push(user ? "/my-applications" : "/");
          }}
        />
      </div>
    </>
  );
};

export default SetAppointment;
