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
// import { useTranslation } from "next-i18next";

function FormLogin({ forgotPassword }) {
  // const { t, i18n } = useTranslation();
  // console.log("i18n:", i18n);

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
        toast.success("Success Login");
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
        <h1 className="text-headForm">Welcome Back</h1>
        <p className="font-thin lg:text-[16px] text-[#646464]">
          Please log in to your account
        </p>
      </div>
      <div className="flex flex-col gap-5 w-full">
        <div className="flex flex-col text-start w-full">
          <label className="text-label">Email</label>
          <input
            type="email"
            className="text-input focus:outline-none pb-1 text-[18px] text-[#2E2D2D] bg-inherit"
            placeholder="Email"
            name="email"
            onChange={handleChangeLoginInput}
          />
        </div>
        <div className="flex flex-col text-start w-full">
          <label className="text-label">Password</label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              onChange={handleChangeLoginInput}
              className="text-input focus:outline-none pb-1 pr-10 text-[18px] text-[#2E2D2D]  w-full bg-transparent"
              placeholder="Password"
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
            className="text-[15px] text-[#1C25E7] mr-3 max-w-fit"
            onClick={forgotPassword}
          >
            Forgot Password?
          </button>
        </div>
      </div>
      <div className="flex flex-col gap-5 w-full">
        <button
          className={`py-4 ${
            isDisabled ? "bg-[#DCDCDC] cursor-not-allowed" : "bg-[#1C25E7] "
          }  w-full rounded-[8px] text-white  -mt-2`}
          onClick={handleLogin}
          disabled={isDisabled}
        >
          Login
        </button>
        <p className="lg:text-[18px] text-[16px] text-[#646464]">
          Don’t have an account yet?{" "}
          <Link href="/register" className="text-[#1C25E7]">
            Register Here
          </Link>
        </p>
      </div>
    </div>
  );
}

export default FormLogin;
