import React from "react";
import { OSSIcons } from "../../../../public/assets/icons/parent";

function ModalOtp({ onClick }) {
  return (
    <dialog id="my_modal_1" className="modal">
      <div className=" bg-white flex flex-col px-10 py-7 rounded-[20px]  relative">
        <form method="dialog">
          <button className="absolute top-7 right-5" formMethod="dialog">
            <OSSIcons name={"Cancel"} fill="#2E2D2D" />
          </button>
        </form>

        <div className="mt-7 text-center flex flex-col gap-3">
          <h1 className="text-[26px] font-bold text-[#2E2D2D]">
            We sent an OTP to your Phone Number
          </h1>
          <p className="text-[16px] font-thin text-[#646464]">
            Please check your short message and input the OTP Number to continue{" "}
            <br /> register
          </p>
          <form method="dialog">
            <button
              className="bg-[#8B0000] px-28 text-[16px] py-2 text-[#F3F3F3] rounded-[8px] mt-2"
              formMethod="dialog"
              onClick={onClick}
            >
              Understand
            </button>
          </form>
        </div>
      </div>
    </dialog>
  );
}

export default ModalOtp;
