"use client";

import React, { useRef, useState, useEffect } from "react";
import { OSSIcons } from "../../../../public/assets/icons/parent";

function FormOtp({ onClick, onClickSubmit }) {
  const [showResendButton, setShowResendButton] = useState(false);
  const [timer, setTimer] = useState(30);
  const [otp, setOtp] = useState(["", "", "", ""]);
  const inputRefs = [useRef(), useRef(), useRef(), useRef()];

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

  const handleResendClick = () => {
    setShowResendButton(false);
    setTimer(30);
    startTimer();
  };

  return (
    <div className="flex flex-col items-center justify-center text-center px-44 gap-10 relative">
      <button className="absolute top-7 left-7 flex gap-3" onClick={onClick}>
        <OSSIcons name="LeftArrow" className="flex m-auto" />
        <p className="text-[#2E2D2D] text-[18px] font-bold">Back</p>
      </button>
      <div className="flex flex-col gap-2">
        <h1 className="text-[28px] font-bold capitalize">Input OTP Code</h1>
        <p className="font-thin text-[16px] text-[#646464]">
          OTP Code sent to your phone number registered
        </p>
      </div>

      <div className="flex justify-center">
        {otp.map((digit, index) => (
          <input
            key={index}
            ref={inputRefs[index]}
            type="text"
            maxLength="1"
            value={digit}
            onChange={(e) => handleChange(index, e)}
            onKeyDown={(e) => handleKeyDown(index, e)}
            className="w-12 h-12 text-3xl mx-1 text-center border-b-[1px] border-[#F0F0F0] rounded focus:outline-none bg-transparent"
          />
        ))}
      </div>

      <div className="flex flex-col gap-5 w-full">
        <button
          className="py-4 bg-[#1C25E7] w-full rounded-[8px] text-white -mt-2"
          onClick={onClickSubmit}
        >
          Submit
        </button>
        <p className="text-[18px] text-[#646464]">
          {showResendButton ? (
            <button
              onClick={handleResendClick}
              className="text-[#1C25E7] focus:outline-none font-bold"
            >
              Resend Code Again
            </button>
          ) : (
            `You can request resend code in ${timer}s`
          )}
        </p>
      </div>
    </div>
  );
}

export default FormOtp;
