import { getUserInformation } from "@/app/store/actions/userAction";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

function Verif() {
  const router = useRouter();
  const { user, profile } = useSelector((state) => state.userReducer);

  const title =
    user?.status === "Inactive"
      ? "Verification your mail first"
      : "Verification your account first";

  const buttonTitle =
    user?.status === "Inactive" ? "Resend to Email" : "Verification";
  const description =
    user?.status === "Inactive"
      ? "To be able to use all the available facilities, please to verifiy your email first so you can eligible to continue."
      : "To be able to use all the available facilities, please to complete your personal data first so you can eligible to continue.";
  return (
    <div className="border-[#DCDCDC] rounded-[20px] border-[1px] p-[24px] relative">
      <div className="absolute top-5 right-5">
        <p className="text-[16px] text-[#646464] font-semibold">
          Only 3 steps!
        </p>
      </div>
      <div className="flex flex-col gap-4">
        <div className="flex">
          <h1 className="text-[#2E2D2D] font-semibold text-[28px]">{title}</h1>
        </div>
        <p className="text-[#646464] text-[16px] -mt-2 lg:w-3/5">
          {description}
        </p>
        <div>
          <button
            className="bg-[#1C25E7] px-7 py-2 rounded-lg text-[#F3F3F3] inline-block"
            onClick={() => {
              router.push("/personal-informations");
            }}
          >
            {buttonTitle}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Verif;
