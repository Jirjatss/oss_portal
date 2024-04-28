import React from "react";
import { OSSIcons } from "../../../../public/assets/icons/parent";
import useLanguage from "@/app/useLanguage";

function SubmitConfirmation({ onSubmit }) {
  const { t } = useLanguage();
  return (
    <dialog id="submit_confirmation" className="modal">
      <div className=" bg-white flex flex-col px-10 py-7 rounded-[20px] lg:max-w-[594px]  relative  lg:mx-0 mx-5">
        <form method="dialog">
          <button className="absolute top-7 right-5" formMethod="dialog">
            <OSSIcons name={"Cancel"} fill="#2E2D2D" />
          </button>
        </form>

        <div className="mt-7 text-center flex flex-col gap-3 items-center">
          <h1 className="lg:text-[26px] text-[18px] font-bold text-[#2E2D2D]">
            {t("submit_confirmation_title")}
          </h1>
          <p className="text-[16px] font-thin text-[#646464] w-3/4 items-center">
            {t("submit_confirmation_desc")}
          </p>
          <form method="dialog" className="w-full mt-4">
            <div className="grid grid-cols-2 gap-5">
              <button
                className="bg-[#FFFFFF] lg:px-16 text-[16px] py-2 text-[#8B0000] rounded-[8px] mt-2 border-[2px] border-[#DCDCDC] item"
                formMethod="dialog"
              >
                {t("recheck")}
              </button>
              <button
                className="bg-[#8B0000] lg:px-16 text-[16px] py-2 text-[#F3F3F3] rounded-[8px] mt-2"
                onClick={() => onSubmit()}
              >
                {t("submit")}
              </button>
            </div>
          </form>
        </div>
      </div>
    </dialog>
  );
}

export default SubmitConfirmation;
