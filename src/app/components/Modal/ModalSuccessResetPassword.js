import React from "react";
import { OSSIcons } from "../../../../public/assets/icons/parent";

function ModalSuccessResetPassword({ onClick }) {
  return (
    <dialog id="successResetPassword" className="modal">
      <div className=" bg-white flex flex-col px-10 py-7 rounded-[20px] lg:min-w-[594px] relative">
        <form method="dialog">
          <button className="absolute top-7 right-5" formMethod="dialog">
            <OSSIcons name={"Cancel"} fill="#2E2D2D" />
          </button>
        </form>

        <div className="mt-7 text-center flex flex-col gap-3">
          <h1 className="text-[26px] font-bold text-[#2E2D2D] capitalize">
            password successfully reset
          </h1>
          <p className="text-[16px] font-thin text-[#646464]">
            Please log in again with the new password
          </p>
          <form method="dialog">
            <button
              className="bg-[#8B0000] px-16 text-[16px] py-2 text-[#F3F3F3] rounded-[8px] mt-2"
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

export default ModalSuccessResetPassword;
