import React from "react";
import { OSSIcons } from "../../../../public/assets/icons/parent";
import useLanguage from "@/app/useLanguage";

function ModalSendLinkPassword({ onClick }) {
  const { t } = useLanguage();
  return (
    <dialog id="modalLink" className="modal">
      <div className=" bg-white flex flex-col px-10 py-7 rounded-[20px] lg:max-w-[594px] relative lg:mx-0 mx-5">
        <form method="dialog">
          <button className="absolute top-7 right-5" formMethod="dialog">
            <OSSIcons name={"Cancel"} fill="#2E2D2D" />
          </button>
        </form>

        <div className="mt-7 text-center flex flex-col gap-3">
          <h1 className="lg:text-[26px] text-[18px] font-bold text-[#2E2D2D]">
            {t("reset_password_dialog_title")}
          </h1>
          <p className="lg:text-[16px] text-[14px] font-thin text-[#646464]">
            {t("reset_password_dialog_desc")}
          </p>
          <form method="dialog">
            <button
              className="bg-[#1C25E7] px-16 text-[16px] py-2 text-[#F3F3F3] rounded-[8px] mt-2 capitalize"
              formMethod="dialog"
              onClick={onClick}
            >
              {t("understand")}
            </button>
          </form>
        </div>
      </div>
    </dialog>
  );
}

export default ModalSendLinkPassword;
