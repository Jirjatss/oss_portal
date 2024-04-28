"use client";

import React, { useEffect, useState } from "react";
import { OSSIcons } from "../../../../public/assets/icons/parent";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { login } from "@/app/store/actions/userAction";
import { toast } from "sonner";
import useSignIn from "react-auth-kit/hooks/useSignIn";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";
import useLanguage from "@/app/useLanguage";

function FormLogin({ forgotPassword }) {
  const { t } = useLanguage();

  const user = useAuthUser();
  const dispatch = useDispatch();
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [inputLogin, setInputLogin] = useState({
    email: "",
    password: "",
  });
  const handleChangeLoginInput = (e) => {
    const { value, name } = e.target;
    setInputLogin({
      ...inputLogin,
      [name]: value,
    });
  };
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const isDisabled = inputLogin.email === "" || inputLogin.password === "";
  const signIn = useSignIn();
  const handleLogin = () => {
    dispatch(login(inputLogin, signIn))
      .then(() => {
        router.push("/");
        toast.success(t("success_login"));
      })
      .catch((error) => {
        toast.error(error?.response?.data?.errorMessage);
      });
  };

  useEffect(() => {
    if (user) router.push("/");
  }, [user]);

  // useEffect(() => {
  //   if (!i18n.resolvedLanguage) i18n.changeLanguage("en");
  //   console.log("i18n:", i18n.resolvedLanguage);
  // }, []);

  return (
    <div className="flex flex-col items-center justify-center text-center lg:px-44 px-5 gap-10">
      <div className="flex flex-col gap-2">
        <h1 className="text-headForm">{t("login_title")}</h1>
        <p className="font-thin lg:text-[16px] text-[#646464]">
          {t("login_sub_title")}
        </p>
      </div>
      <div className="flex flex-col gap-5 w-full">
        <div className="flex flex-col text-start w-full">
          <label className="text-label">{t("email")}</label>
          <input
            type="email"
            className="text-input focus:outline-none pb-1 text-[18px] text-[#2E2D2D] bg-inherit"
            placeholder={t("email")}
            name="email"
            onChange={handleChangeLoginInput}
          />
        </div>
        <div className="flex flex-col text-start w-full">
          <label className="text-label">{t("password")}</label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              onChange={handleChangeLoginInput}
              className="text-input focus:outline-none pb-1 pr-10 text-[18px] text-[#2E2D2D]  w-full bg-transparent"
              placeholder={t("password")}
              name="password"
            />
            {inputLogin.password !== "" && (
              <button
                onClick={togglePasswordVisibility}
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
        <div className="flex justify-end">
          <button
            className="text-[15px] text-[#8B0000] mr-3 max-w-fit"
            onClick={forgotPassword}
          >
            {t("forgot_password")}
          </button>
        </div>
      </div>
      <div className="flex flex-col gap-5 w-full">
        <button
          className={`py-4 ${
            isDisabled ? "bg-[#DCDCDC] cursor-not-allowed" : "bg-[#8B0000] "
          }  w-full rounded-[8px] text-white  -mt-2`}
          onClick={handleLogin}
          disabled={isDisabled}
        >
          {t("login")}
        </button>
        <p className="lg:text-[18px] text-[16px] text-[#646464]">
          {t("login_hint_to_register")}{" "}
          <Link href="/register" className="text-[#8B0000]">
            {t("login_cta_register")}
          </Link>
        </p>
      </div>
    </div>
  );
}

export default FormLogin;
