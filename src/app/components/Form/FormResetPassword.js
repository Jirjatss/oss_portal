"use Client";

import React, { useState, useEffect } from "react";
import { OSSIcons } from "../../../../public/assets/icons/parent";

function FormResetPassword({
  back,
  password,
  reenterPassword,
  showReenterPassword,
  showPassword,
  onClickShowPassword,
  onChangePassword,
  onClickReenterPassword,
  onChangeReenterPassword,
  onSubmit,
}) {
  const [passwordValid, setPasswordValid] = useState(false);
  const [reenterPasswordValid, setReenterPasswordValid] = useState(false);
  const [isUppercaseValid, setUppercaseValid] = useState(false);
  const [isLowercaseValid, setLowercaseValid] = useState(false);
  const [isNumberValid, setNumberValid] = useState(false);
  const [isLengthValid, setLengthValid] = useState(false);

  const validatePassword = () => {
    const uppercaseRegex = /[A-Z]/;
    const lowercaseRegex = /[a-z]/;
    const numberRegex = /[0-9]/;
    const isLengthValid = password.length >= 8;

    const isUppercaseValid = uppercaseRegex.test(password);
    const isLowercaseValid = lowercaseRegex.test(password);
    const isNumberValid = numberRegex.test(password);

    setUppercaseValid(isUppercaseValid);
    setLowercaseValid(isLowercaseValid);
    setNumberValid(isNumberValid);
    setLengthValid(isLengthValid);
  };

  const validatePassword2 = () => {
    const isReenterPasswordValid = reenterPassword === password;
    setReenterPasswordValid(isReenterPasswordValid);
  };

  const handleReenterPasswordChange = (e) => {
    onChangeReenterPassword(e);
    validatePassword2();
  };

  const handlePasswordChange = (e) => {
    onChangePassword(e);
    validatePassword();
  };
  useEffect(() => {
    validatePassword(password);
    validatePassword2(reenterPassword, password);
  }, [password, reenterPassword]);

  useEffect(() => {
    if (
      isUppercaseValid &&
      isLowercaseValid &&
      isLengthValid &&
      isNumberValid &&
      reenterPasswordValid
    )
      setPasswordValid(true);
  }, [
    isUppercaseValid,
    isLowercaseValid,
    isLengthValid,
    isNumberValid,
    reenterPasswordValid,
  ]);

  return (
    <div className="flex flex-col items-center justify-center text-center px-44 gap-10 relative">
      <button className="absolute top-7 left-7 flex gap-3" onClick={back}>
        <OSSIcons name="LeftArrow" className="flex m-auto" />
        <p className="text-[#2E2D2D] text-[18px] font-bold">Back</p>
      </button>
      <div className="flex flex-col gap-2">
        <h1 className="text-headForm">Reset Your Password</h1>
      </div>
      <div className="flex flex-col text-start w-full">
        <label className="text-label">Password</label>
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={handlePasswordChange}
            className="border-b-[1px] border-[#F0F0F0] focus:outline-none pb-1 pr-10 text-[18px] text-[#2E2D2D] placeholder-[#646464] w-full bg-transparent"
            placeholder="••••••••••••"
          />
          {password !== "" && (
            <button
              onClick={onClickShowPassword}
              className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-600 cursor-pointer"
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? (
                <OSSIcons name="EyeOff" />
              ) : (
                <OSSIcons name="EyeOn" />
              )}
            </button>
          )}
        </div>
      </div>
      <div className="flex flex-col text-start w-full">
        <label className="text-label">Reenter Password</label>
        <div className="relative">
          <input
            type={showReenterPassword ? "text" : "password"}
            value={reenterPassword}
            onChange={handleReenterPasswordChange}
            className="border-b-[1px] border-[#F0F0F0] focus:outline-none pb-1 pr-10 text-[18px] text-[#2E2D2D] placeholder-[#646464] w-full bg-transparent"
            placeholder="••••••••••••"
          />
          {reenterPassword !== "" && (
            <button
              onClick={onClickReenterPassword}
              className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-600 cursor-pointer"
              aria-label={
                showReenterPassword ? "Hide password" : "Show password"
              }
            >
              {showReenterPassword ? (
                <OSSIcons name="EyeOff" />
              ) : (
                <OSSIcons name="EyeOn" />
              )}
            </button>
          )}
        </div>
      </div>

      {password !== "" && (
        <div className="self-start -mt-2 w-full">
          <p className="text-[16px] font-thin text-[#646464] mb-3 text-start">
            Make sure your password contains it
          </p>
          <div className="grid grid-cols-2">
            <div className="flex flex-col gap-2">
              <div className="flex gap-3">
                <div
                  className={`w-[24px] h-[24px] rounded-full ${
                    isUppercaseValid
                      ? "bg-[#000A80]"
                      : "bg-transparent border-[1px] border-[#DCDCDC]"
                  }  justify-center items-center flex gap-3`}
                >
                  {isUppercaseValid ? <OSSIcons name="Approve" /> : null}
                </div>
                <p
                  className="text-[14px] text-[#313131]"
                  style={{ fontWeight: 400 }}
                >
                  Uppercase
                </p>
              </div>
              <div className="flex gap-3">
                <div
                  className={`w-[24px] h-[24px] rounded-full ${
                    isLowercaseValid
                      ? "bg-[#000A80]"
                      : "bg-transparent border-[1px] border-[#DCDCDC]"
                  }  justify-center items-center flex gap-3`}
                >
                  {isLowercaseValid ? <OSSIcons name="Approve" /> : null}
                </div>
                <p
                  className="text-[14px] text-[#313131]"
                  style={{ fontWeight: 400 }}
                >
                  LowerCase
                </p>
              </div>
              <div className="flex gap-3">
                <div
                  className={`w-[24px] h-[24px] rounded-full ${
                    reenterPasswordValid
                      ? "bg-[#000A80]"
                      : "bg-transparent border-[1px] border-[#DCDCDC]"
                  }  justify-center items-center flex gap-3`}
                >
                  {reenterPasswordValid ? <OSSIcons name="Approve" /> : null}
                </div>
                <p
                  className="text-[14px] text-[#313131]"
                  style={{ fontWeight: 400 }}
                >
                  Password Match
                </p>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <div className="flex gap-3">
                <div
                  className={`w-[24px] h-[24px] rounded-full ${
                    isNumberValid
                      ? "bg-[#000A80]"
                      : "bg-transparent border-[1px] border-[#DCDCDC]"
                  }  justify-center items-center flex gap-3`}
                >
                  {isNumberValid ? <OSSIcons name="Approve" /> : null}
                </div>
                <p
                  className="text-[14px] text-[#313131]"
                  style={{ fontWeight: 400 }}
                >
                  Number
                </p>
              </div>
              <div className="flex gap-3">
                <div
                  className={`w-[24px] h-[24px] rounded-full ${
                    isLengthValid
                      ? "bg-[#000A80]"
                      : "bg-transparent border-[1px] border-[#DCDCDC]"
                  }  justify-center items-center flex gap-3`}
                >
                  {isLengthValid ? <OSSIcons name="Approve" /> : null}
                </div>
                <p
                  className="text-[14px] text-[#313131]"
                  style={{ fontWeight: 400 }}
                >
                  Minimum 8 Characters
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      <button
        className={`py-4 ${
          passwordValid ? "bg-[#1C25E7] " : "bg-[#DCDCDC] cursor-not-allowed"
        }  w-full rounded-[8px] text-white -mt-2`}
        disabled={!passwordValid}
        onClick={onSubmit}
      >
        Submit
      </button>
    </div>
  );
}

export default FormResetPassword;
