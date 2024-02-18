import React from "react";
import { OSSIcons } from "../../../../public/assets/icons/parent";
import Link from "next/link";

function FormLogin({
  password,
  showPassword,
  onClick,
  onChange,
  forgotPassword,
}) {
  return (
    <div className="flex flex-col items-center justify-center text-center px-44 gap-10">
      <div className="flex flex-col gap-2">
        <h1 className="text-[28px] font-bold">Welcome Back</h1>
        <p className="font-thin text-[16px] text-[#646464]">
          Please log in to your account
        </p>
      </div>
      <div className="flex flex-col gap-5 w-full">
        <div className="flex flex-col text-start w-full">
          <label className="text-[16px] font-thin text-[#646464] mb-1">
            Email
          </label>
          <input
            type="email"
            className="border-b-[1px] border-[#F0F0F0] focus:outline-none pb-1 text-[18px] text-[#2E2D2D] placeholder-[#2E2D2D] bg-transparent"
            placeholder="M_Gustao@mail.com"
          />
        </div>
        <div className="flex flex-col text-start w-full">
          <label className="text-[16px] font-thin text-[#646464] mb-1">
            Password
          </label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={onChange}
              className="border-b-[1px] border-[#F0F0F0] focus:outline-none pb-1 pr-10 text-[18px] text-[#2E2D2D] placeholder-[#2E2D2D] w-full bg-transparent"
              placeholder="••••••••••••"
            />
            {password !== "" && (
              <button
                onClick={onClick}
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
        <button
          className="text-[15px] text-[#1C25E7] text-end mr-3"
          onClick={forgotPassword}
        >
          Forgot Password?
        </button>
      </div>
      <div className="flex flex-col gap-5 w-full">
        <button className="py-4 bg-[#1C25E7] w-full rounded-[8px] text-white -mt-2">
          Login
        </button>
        <p className="text-[18px] text-[#646464]">
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
