import React, { useEffect, useState } from "react";
import { OSSIcons } from "../../../../public/assets/icons/parent";
import { useDispatch } from "react-redux";
import { forgotPasswordHandler } from "@/app/store/actions/userAction";
import { toast } from "sonner";
import useLanguage from "@/app/useLanguage";

function FormForgotPassword({ onClick, onClickSubmit }) {
  const [email, setEmail] = useState("");
  const isDisabled = email === "";
  const [isValidEmail, setIsValidEmail] = useState(true);
  const dispatch = useDispatch();
  const { t } = useLanguage();

  useEffect(() => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setIsValidEmail(emailRegex.test(email));
  }, [email]);

  return (
    <div className="flex flex-col items-center justify-center text-center lg:px-44 px-5 gap-10 relative">
      <button className="absolute top-7 left-7 flex gap-3" onClick={onClick}>
        <OSSIcons name="LeftArrow" className="flex m-auto" />
        <p className="text-[#2E2D2D] text-[18px] font-bold">{t("back")}</p>
      </button>
      <div className="flex flex-col gap-2">
        <h1 className="text-headForm capitalize leading-none">
          {t("forgot_password_title")}
        </h1>
        <p className="font-thin text-[16px] text-[#646464]">
          {t("forgot_password_desc")}
        </p>
      </div>
      <div className="flex flex-col text-start w-full">
        <label className="text-label">{t("email")}</label>
        <input
          type="email"
          className="text-input focus:outline-none pb-1 lg:text-[18px] text-[16px] text-[#2E2D2D] placeholder-gray-400 bg-transparent"
          placeholder={t("email")}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        {!isValidEmail && email !== "" && (
          <p className="text-red-500 text-xs"> {t("email_error_hint")}</p>
        )}
      </div>
      <button
        className={`py-4 ${
          isDisabled || !isValidEmail
            ? "bg-[#DCDCDC] cursor-not-allowed"
            : "bg-[#1C25E7]"
        }  w-full rounded-[8px] text-white lg:-mt-2 mt-5 capitalize`}
        disabled={isDisabled || !isValidEmail}
        onClick={() => {
          // onClickSubmit();
          dispatch(forgotPasswordHandler(email)).then((data) => {
            if (!data) toast.error("Email Not Found");
            else onClickSubmit();
          });
        }}
      >
        {t("forgot_password_request_reset")}
      </button>
    </div>
  );
}

export default FormForgotPassword;
