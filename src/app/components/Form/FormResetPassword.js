"use Client";

import React, { useState } from "react";
import { OSSIcons } from "../../../../public/assets/icons/parent";
import { useDispatch, useSelector } from "react-redux";
import { resetPasswordHandler } from "@/app/store/actions/userAction";
import useLanguage from "@/app/useLanguage";

function FormResetPassword({ back, onSubmit }) {
  const { t } = useLanguage();
  const [showPassword, setShowPassword] = useState({
    password: false,
    reenterPassword: false,
  });

  const [input, setInput] = useState({
    password: "",
    reenterPassword: "",
  });
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.userReducer);

  const [passwordValid, setPasswordValid] = useState(false);
  const [isUppercaseValid, setIsUppercaseValid] = useState(false);
  const [isLowercaseValid, setIsLowercaseValid] = useState(false);
  const [isNumberValid, setIsNumberValid] = useState(false);
  const [isLengthValid, setIsLengthValid] = useState(false);
  const [reenterPasswordValid, setReenterPasswordValid] = useState(false);

  const validatePassword = (password, reenterPassword) => {
    const uppercaseRegex = /[A-Z]/;
    const lowercaseRegex = /[a-z]/;
    const numberRegex = /[0-9]/;
    const isLengthValid = password.length >= 8;
    const isUppercaseValid = uppercaseRegex.test(password);
    const isLowercaseValid = lowercaseRegex.test(password);
    const isNumberValid = numberRegex.test(password);
    const isReenterPasswordValid = reenterPassword === password;

    setIsUppercaseValid(isUppercaseValid);
    setIsLowercaseValid(isLowercaseValid);
    setIsNumberValid(isNumberValid);
    setIsLengthValid(isLengthValid);
    setReenterPasswordValid(isReenterPasswordValid);

    setPasswordValid(
      isUppercaseValid &&
        isLowercaseValid &&
        isLengthValid &&
        isNumberValid &&
        isReenterPasswordValid
    );
  };

  const handleChangeInput = (e) => {
    const { value, name } = e.target;
    setInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));

    if (name === "password" || name === "reenterPassword") {
      validatePassword(
        name === "password" ? value : input.password,
        name === "reenterPassword" ? value : input.reenterPassword
      );
    }
  };

  const togglePasswordVisibility = (fieldName) => {
    setShowPassword((prevState) => ({
      ...prevState,
      [fieldName]: !prevState[fieldName],
    }));
  };

  return (
    <div className="flex flex-col items-center justify-center text-center lg:px-44 px-5 gap-10 relative">
      <button className="absolute top-7 left-7 flex gap-3" onClick={back}>
        <OSSIcons name="LeftArrow" className="flex m-auto" />
        <p className="text-[#2E2D2D] text-[18px] font-bold">{t("back")}</p>
      </button>
      <div className="flex flex-col gap-2 lg:mt-0 mt-16">
        <h1 className="text-headForm">{t("reset_password_screen_title")}</h1>
      </div>
      <div className="flex flex-col text-start w-full">
        <label className="text-label">{t("password")}</label>
        <div className="relative">
          <input
            type={showPassword.password ? "text" : "password"}
            value={input.password}
            onChange={handleChangeInput}
            className="border-b-[1px] border-[#F0F0F0] focus:outline-none pb-1 pr-10 lg:text-[18px] text-[16px] text-[#2E2D2D] placeholder-[#646464] w-full bg-transparent"
            placeholder={t("password")}
            name="password"
          />
          {input.password !== "" && (
            <button
              onClick={() => togglePasswordVisibility("password")}
              className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-600 cursor-pointer"
              aria-label={
                showPassword.password ? "Hide password" : "Show password"
              }
            >
              {showPassword.password ? (
                <OSSIcons name="EyeOff" />
              ) : (
                <OSSIcons name="EyeOn" />
              )}
            </button>
          )}
        </div>
      </div>
      <div className="flex flex-col text-start w-full">
        <label className="text-label">{t("re_password")}</label>
        <div className="relative">
          <input
            type={showPassword.reenterPassword ? "text" : "password"}
            value={input.reenterPassword}
            onChange={handleChangeInput}
            className="border-b-[1px] border-[#F0F0F0] focus:outline-none pb-1 pr-10 lg:text-[18px] text-[16px] text-[#2E2D2D] placeholder-[#646464] w-full bg-transparent"
            placeholder={t("re_password")}
            name="reenterPassword"
          />
          {input.reenterPassword !== "" && (
            <button
              onClick={() => togglePasswordVisibility("reenterPassword")}
              className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-600 cursor-pointer"
              aria-label={
                showPassword.reenterPassword ? "Hide password" : "Show password"
              }
            >
              {showPassword.reenterPassword ? (
                <OSSIcons name="EyeOff" />
              ) : (
                <OSSIcons name="EyeOn" />
              )}
            </button>
          )}
        </div>
        {input.reenterPassword !== "" && !reenterPasswordValid && (
          <p className="text-[12px] text-red-500 mt-1">
            {t("password_not_match_hint")}
          </p>
        )}
      </div>

      {input.password !== "" && (
        <div className="self-start -mt-2 w-full">
          <p className="text-[16px] font-thin text-[#646464] mb-3 text-start">
            {t("register_main_pass_requirement")}
          </p>
          <div className="grid grid-cols-2">
            <div className="flex flex-col gap-2">
              <div className="flex gap-3">
                <div
                  className={`w-[24px] h-[24px] rounded-full ${
                    isUppercaseValid
                      ? "bg-[#000A80]"
                      : "bg-transparent border-[1px] border-[#DCDCDC]"
                  } justify-center items-center flex gap-3`}
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
                  } justify-center items-center flex gap-3`}
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
            </div>
            <div className="flex flex-col gap-2">
              <div className="flex gap-3">
                <div
                  className={`w-[24px] h-[24px] rounded-full ${
                    isNumberValid
                      ? "bg-[#000A80]"
                      : "bg-transparent border-[1px] border-[#DCDCDC]"
                  } justify-center items-center flex gap-3`}
                >
                  {isNumberValid ? <OSSIcons name="Approve" /> : null}
                </div>
                <p
                  className="text-[14px] text-[#313131]"
                  style={{ fontWeight: 400 }}
                >
                  {t("register_main_number")}
                </p>
              </div>
              <div className="flex gap-3">
                <div
                  className={`w-[24px] h-[24px] rounded-full ${
                    isLengthValid
                      ? "bg-[#000A80]"
                      : "bg-transparent border-[1px] border-[#DCDCDC]"
                  } justify-center items-center flex gap-3`}
                >
                  {isLengthValid ? <OSSIcons name="Approve" /> : null}
                </div>
                <p
                  className="text-[14px] text-[#313131]"
                  style={{ fontWeight: 400 }}
                >
                  {t("register_main_min_char")}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      <button
        className={`py-4 ${
          passwordValid ? "bg-[#8B0000] " : "bg-[#DCDCDC] cursor-not-allowed"
        } w-full rounded-[8px] text-white -mt-2`}
        disabled={!passwordValid}
        onClick={() => {
          dispatch(
            resetPasswordHandler({
              activationToken: token,
              password: input.password,
            })
          ).then(() => {
            onSubmit();
          });
        }}
      >
        {t("submit")}
      </button>
    </div>
  );
}

export default FormResetPassword;
