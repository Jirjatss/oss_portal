import { requestOtp } from "@/app/store/actions/userAction";
import Link from "next/link";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../Loader";
import useLanguage from "@/app/useLanguage";

function FormStartRegister({ onClick }) {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [validPhoneNumber, setValidPhoneNumber] = useState(true);
  const { t } = useLanguage();
  const regexPhoneNumber = /^\+[1-9]\d{1,14}$/;

  const { loading } = useSelector((state) => state.userReducer);
  const dispatch = useDispatch();
  const isDisabled = phoneNumber === "" || !validPhoneNumber;

  const handleChangePhoneNumber = (e) => {
    const { value } = e.target;
    setPhoneNumber(value);
    setValidPhoneNumber(regexPhoneNumber.test(value));
  };

  return (
    <>
      {loading && <Loader />}
      <div className="flex flex-col items-center justify-center text-center lg:px-44 px-5 gap-10">
        <div className="flex flex-col gap-2">
          <h1 className="text-headForm">{t("register_phone_title")}</h1>
          <p className="font-thin lg:text-[16px] text-[#646464]">
            {t("register_phone_sub_title")}
          </p>
        </div>

        <div className="flex flex-col text-start w-full">
          <label className="text-label">{t("phone_number")}</label>
          <input
            type="text"
            className="text-input focus:outline-none pb-1 text-[18px] text-[#2E2D2D] bg-inherit"
            placeholder={t("phone_number")}
            value={phoneNumber}
            onChange={handleChangePhoneNumber}
          />
          {!validPhoneNumber && phoneNumber !== "" && (
            <p className="text-[12px] text-red-500">
              {t("phone_number_error_hint")}
            </p>
          )}
        </div>

        <p className="lg:text-[18px] text-[16px] text-[#646464]">
          {t("register_phone_otp_hint")}
        </p>

        <div className="flex flex-col gap-5 w-full">
          <button
            disabled={isDisabled}
            className={`py-4 ${
              isDisabled ? "bg-[#DCDCDC] cursor-not-allowed" : "bg-[#1C25E7] "
            }  w-full rounded-[8px] text-white  -mt-2`}
            onClick={() => {
              dispatch(requestOtp(phoneNumber)).then(() => onClick());
            }}
          >
            {t("submit")}
          </button>
          <p className="lg:text-[18px] text-[16px] text-[#646464]">
            {t("register_phone_confirmation_registered")}{" "}
            <Link href="/login" className="text-[#1C25E7]">
              {t("register_phone_login_now")}
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}

export default FormStartRegister;
