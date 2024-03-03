import React from "react";
import { OSSIcons } from "../../../../public/assets/icons/parent";

function FormForgotPassword({ onClick, onClickSubmit }) {
  return (
    <div className="flex flex-col items-center justify-center text-center px-44 gap-10 relative">
      <button className="absolute top-7 left-7 flex gap-3" onClick={onClick}>
        <OSSIcons name="LeftArrow" className="flex m-auto" />
        <p className="text-[#2E2D2D] text-[18px] font-bold">Back</p>
      </button>
      <div className="flex flex-col gap-2">
        <h1 className="text-headForm capitalize">Forget Password</h1>
        <p className="font-thin text-[16px] text-[#646464]">
          Please input your email, and get the link for reset your password
        </p>
      </div>
      <div className="flex flex-col text-start w-full">
        <label className="text-label">Email</label>
        <input
          type="email"
          className="border-b-[1px] border-[#F0F0F0] focus:outline-none pb-1 text-[18px] text-[#2E2D2D] placeholder-[#646464] bg-transparent"
          placeholder="M_Gustao@mail.com"
        />
      </div>
      <button
        className="py-4 bg-[#1C25E7] w-full rounded-[8px] text-white -mt-2"
        onClick={onClickSubmit}
      >
        Request Reset Password
      </button>
    </div>
  );
}

export default FormForgotPassword;
