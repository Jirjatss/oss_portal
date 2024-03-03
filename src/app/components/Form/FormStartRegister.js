import Link from "next/link";
import React from "react";

function FormStartRegister({ onClick }) {
  return (
    <div className="flex flex-col items-center justify-center text-center px-44 gap-10">
      <div className="flex flex-col gap-2">
        <h1 className="text-headForm capitalize">Start registering </h1>
        <p className="font-thin text-[16px] text-[#646464]">
          Please complete the information below
        </p>
      </div>

      <div className="flex flex-col text-start w-full">
        <label className="text-label">Phone Number</label>
        <input
          type="text"
          pattern="[0-9]*"
          className="border-b-[1px] border-[#F0F0F0] focus:outline-none pb-1 text-[18px] text-[#2E2D2D] placeholder-[#646464] bg-transparent"
          placeholder="+670 723 1234"
        />
      </div>

      <p className="text-[18px] text-[#646464]">
        We will sent an OTP to your phone Number
      </p>

      <div className="flex flex-col gap-5 w-full">
        <button
          className="py-4 bg-[#1C25E7] w-full rounded-[8px] text-white -mt-2"
          onClick={onClick}
        >
          Submit
        </button>
        <p className="text-[18px] text-[#646464]">
          Already have account?{" "}
          <Link href="/login" className="text-[#1C25E7]">
            Login Now
          </Link>
        </p>
      </div>
    </div>
  );
}

export default FormStartRegister;
