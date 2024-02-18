import React from "react";
import { OSSIcons } from "../../../../public/assets/icons/parent";

function ModalSendLinkPassword({ onClick }) {
  return (
    <dialog id="modalLink" class="modal">
      <div class=" bg-white flex flex-col px-10 py-7 rounded-[20px]  relative">
        <form method="dialog">
          <button className="absolute top-7 right-5" formMethod="dialog">
            <OSSIcons name={"Cancel"} fill="#2E2D2D" />
          </button>
        </form>

        <div className="mt-7 text-center flex flex-col gap-3">
          <h1 className="text-[26px] font-bold text-[#2E2D2D]">
            We sent a link to your Email
          </h1>
          <p className="text-[16px] font-thin text-[#646464]">
            Please check your email inputed and click the link for continue
            reset your <br /> password
          </p>
          <form method="dialog">
            <button
              className="bg-[#1C25E7] px-16 text-[16px] py-2 text-[#F3F3F3] rounded-[8px] mt-2"
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

export default ModalSendLinkPassword;
