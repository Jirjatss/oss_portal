import React from "react";
import { OSSIcons } from "../../../../public/assets/icons/parent";

function ModalVerifiedOtp({ onClick }) {
  return (
    <dialog id="modal_verified_otp" className="modal">
      <div className=" bg-white flex flex-col px-10 py-7 rounded-[20px]  relative">
        <form method="dialog">
          <button className="absolute top-7 right-5" formMethod="dialog">
            <OSSIcons name={"Cancel"} fill="#2E2D2D" />
          </button>
        </form>

        <div className="mt-7 text-center flex flex-col gap-3">
          <h1 className="text-[26px] font-bold text-[#2E2D2D]">
            Your Phone Verified
          </h1>
          <p className="text-[16px] font-thin text-[#646464]">
            One more step to unlock full access. Create your account to register
            in this website!
          </p>
          <form method="dialog">
            <button
              className="bg-[#1C25E7] px-28 text-[16px] py-2 text-[#F3F3F3] rounded-[8px] mt-2"
              formMethod="dialog"
              onClick={onClick}
            >
              Continue
            </button>
          </form>
        </div>
      </div>
    </dialog>
  );
}

export default ModalVerifiedOtp;
