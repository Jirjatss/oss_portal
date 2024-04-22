"use client";

import React, { useEffect, useRef, useState } from "react";
import { OSSIcons } from "../../../../public/assets/icons/parent";
import { useDispatch, useSelector } from "react-redux";
import { requestOtp, verifyOtp } from "@/app/store/actions/userAction";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";
import { toast } from "sonner";
import Loader from "../Loader";
import {
  editMyApplication,
  submitApplication,
} from "@/app/store/actions/applicationAction";
import { useRouter, useSearchParams } from "next/navigation";

function FormOtpModalSubmisson({ data }) {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  const [timer, setTimer] = useState(30);
  const { dataRegister, loading } = useSelector((state) => state.userReducer);

  const [otp, setOtp] = useState(["", "", "", ""]);
  const [successSubmit, setSuccessSubmit] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [sentOtp, setSentOtp] = useState("");
  const inputRefs = [useRef(), useRef(), useRef(), useRef()];
  const [showResendButton, setShowResendButton] = useState(false);
  const dispatch = useDispatch();
  const user = useAuthUser();
  const { profile } = useSelector((state) => state.userReducer);
  const { personalDetail } = profile || {};
  useEffect(() => {
    inputRefs[0].current.focus();
  }, []);

  const handleChange = (index, event) => {
    const value = event.target.value;
    if (isNaN(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    if (value !== "") {
      if (index < 3) {
        inputRefs[index + 1].current.focus();
      }
    }
  };

  const handleKeyDown = (index, event) => {
    if (event.key === "Backspace" && index > 0 && otp[index] === "") {
      inputRefs[index - 1].current.focus();
    }
  };

  const startTimer = () => {
    const interval = setInterval(() => {
      setTimer((prevTimer) => prevTimer - 1);
    }, 1000);
    return interval;
  };

  useEffect(() => {
    let intervalId;
    if (timer > 0 && !showResendButton) {
      intervalId = startTimer();
    } else {
      setShowResendButton(true);
    }

    return () => clearInterval(intervalId);
  }, [showResendButton, timer]);

  const editSubmissonHandler = () => {
    dispatch(
      verifyOtp({
        phoneNumber: dataRegister.phoneNumber,
        token: dataRegister.token,
        otpCode: otp.join(""),
      })
    )
      .then(() => {
        setSuccessSubmit(true);
        dispatch(editMyApplication(id, data, user?.accessToken)).then(() => {
          success_submission.showModal();
        });
      })
      .catch((err) => {
        setErrorMessage(err.response.data.errorMessage);
        setOtp(["", "", "", ""]);
      });
  };

  const submitSubmissionHandler = () => {
    dispatch(
      verifyOtp({
        phoneNumber: dataRegister.phoneNumber,
        token: dataRegister.token,
        otpCode: otp.join(""),
      })
    )
      .then(() => {
        setSuccessSubmit(true);
        dispatch(submitApplication(data, user?.accessToken)).then(() => {
          success_submission.showModal();
        });
      })
      .catch((err) => {
        setErrorMessage(err.response.data.errorMessage);
        setOtp(["", "", "", ""]);
      });
  };

  if (successSubmit) return null;
  return (
    <dialog id="form_otp_modal_submisson" className="modal">
      {loading && <Loader />}
      <div className=" bg-white flex flex-col px-10 py-7 rounded-[20px] relative lg:w-[594px] lg:mx-0 mx-5">
        <form method="dialog">
          <button className="absolute top-7 right-5" formMethod="dialog">
            <OSSIcons name={"Cancel"} fill="#2E2D2D" />
          </button>
        </form>

        <div className="mt-7 text-center flex flex-col gap-3">
          <h1 className="text-[26px] font-bold text-[#2E2D2D]">
            Input OTP Code
          </h1>
          <p className="text-[16px] font-thin text-[#646464]">
            OTP Code sent to your phone number registered
          </p>

          <div className="flex justify-center">
            {otp.map((digit, index) => (
              <input
                key={index}
                ref={inputRefs[index]}
                autoFocus={index === 0}
                type="text"
                maxLength="1"
                value={digit}
                onChange={(e) => handleChange(index, e)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                className={`w-12 h-12 text-3xl mx-1 text-center ${
                  errorMessage === ""
                    ? "text-input"
                    : "border-b-[2px] border-red-500"
                } rounded focus:outline-none bg-transparent`}
              />
            ))}
          </div>
          {errorMessage !== "" && (
            <p className="text-[16px] font-thin text-red-500">{errorMessage}</p>
          )}
          {sentOtp !== "" && (
            <p className="text-[16px] font-thin text-[#2E2D2D]">{sentOtp}</p>
          )}

          <div className="mt-5">
            <div className="grid lg:grid-cols-2 grid-cols-1 gap-5">
              <button
                onClick={() => {
                  dispatch(requestOtp(personalDetail?.phoneNumber))
                    .then(() => {
                      setShowResendButton(false);
                      setTimer(30);
                      startTimer();
                      setErrorMessage("");
                      setSentOtp("We sent an OTP to your phone Number");
                    })
                    .catch((err) => {
                      console.log(err);
                      toast.error(err.response.data.errorMessage);
                    });
                }}
                disabled={!showResendButton}
                className={`${
                  !showResendButton
                    ? "bg-[#DCDCDC] cursor-not-allowed text-[#646464]"
                    : "bg-[#FFFFFF] text-[#1C25E7]"
                } px-4 text-[16px] py-2 rounded-[8px] mt-2 border-[2px] border-[#DCDCDC] hidden lg:flex`}
                formMethod="dialog"
              >
                {!showResendButton
                  ? `Request resend code in ${timer}s`
                  : " Resend Code Again"}
              </button>
              <button
                className={`${
                  otp.some((element) => element === "")
                    ? "bg-[#DCDCDC] cursor-not-allowed text-[#646464]"
                    : "bg-[#1C25E7] text-[#F3F3F3] "
                }  lg:px-16 text-[16px] py-2  rounded-[8px] mt-2 `}
                formMethod={successSubmit && "dialog"}
                disabled={otp.some((element) => element === "")}
                onClick={() => {
                  if (id) editSubmissonHandler();
                  else submitSubmissionHandler();
                }}
              >
                Submit
              </button>
              <p className="lg:text-[18px] text-[16px] text-[#646464] lg:hidden">
                {showResendButton ? (
                  <button
                    onClick={() => {
                      dispatch(requestOtp(personalDetail?.phoneNumber))
                        .then(() => {
                          setShowResendButton(false);
                          setTimer(30);
                          startTimer();
                          setSentOtp("We sent an OTP to your phone Number");
                        })
                        .catch((err) => {
                          console.log(err);
                          toast.error(err.response.data.errorMessage);
                        });
                    }}
                    className="text-[#1C25E7] focus:outline-none font-semibold"
                  >
                    Resend Code Again
                  </button>
                ) : (
                  `You can request resend code in ${timer}s`
                )}
              </p>
            </div>
          </div>
        </div>
      </div>
    </dialog>
  );
}

export default FormOtpModalSubmisson;
