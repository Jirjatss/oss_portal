import {
  activateUser,
  getUserInformation,
} from "@/app/store/actions/userAction";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import { OSSIcons } from "../../../../public/assets/icons/parent";
import {
  FlowStep1,
  ResendVerif,
  VerifSuccess,
  verifSuccess,
} from "../../../../public/assets/emoji/index";
import Image from "next/image";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";

function Verif() {
  const router = useRouter();
  const dispatch = useDispatch();
  const user = useAuthUser();

  const { dataRegister, profile } = useSelector((state) => state.userReducer);

  const [isHidden, setIsHidden] = useState(false);
  const { personalDetail } = profile || {};
  const { firstName } = personalDetail || {};

  const verifComplete = firstName !== "";

  const buttonTitle =
    user?.status === "Inactive" ? "Resend to Email" : "Verification";

  const titleDecider = () => {
    if (user?.status === "Inactive") return "Verification your mail first";
    if (user?.status === "Active" && firstName === "")
      return "Verification your account first";
    if (verifComplete) return "Verification Successful! 🎉";
  };

  const iconDecider = () => {
    if (user?.status === "Inactive") return ResendVerif;
    if (user?.status === "Active" && firstName === "") return FlowStep1;
    if (verifComplete) return VerifSuccess;
  };

  const descriptionDecider = () => {
    if (user?.status === "Inactive")
      return "To be able to use all the available facilities, please to verifiy your email first so you can eligible to continue.";
    if (user?.status === "Active" && firstName === "")
      return "To be able to use all the available facilities, please to complete your personal data first so you can eligible to continue.";
    if (verifComplete)
      return "Congratulations! Your data has been verified, granting you complete access to our facilities. Start exploring now!";
  };

  useEffect(() => {
    if (user?.status === "Active") {
      dispatch(getUserInformation(user?.accessToken));
    }
  }, []);

  if (isHidden) return null;

  return (
    <div className="border-[#DCDCDC] rounded-[20px] border-[1px] p-[24px] relative">
      <div className="absolute top-5 right-5">
        {verifComplete ? (
          <button onClick={() => setIsHidden(true)}>
            <OSSIcons name={"Cancel"} fill="#2E2D2D" />
          </button>
        ) : (
          <p className="text-[16px] text-[#646464] font-semibold">
            Only 3 steps!
          </p>
        )}
      </div>

      <div className="flex flex-col gap-4">
        <div className="flex gap-3 items-center">
          <h1 className="text-[#2E2D2D] font-semibold text-[28px]">
            {titleDecider()}
          </h1>
          <div className="-mt-2.5">
            <Image
              src={iconDecider()}
              width={30}
              height={30}
              alt={titleDecider()}
            />
          </div>
        </div>
        <p className="text-[#646464] text-[16px] -mt-2 lg:w-3/5">
          {descriptionDecider()}
        </p>
        {!verifComplete && (
          <div>
            <button
              className="bg-[#1C25E7] px-7 py-2 rounded-lg text-[#F3F3F3] inline-block"
              onClick={() => {
                if (user?.status === "Inactive") {
                  dispatch(activateUser(dataRegister.token, user?.accessToken))
                    .then(() => toast.success("Success Activate"))
                    .catch((err) => console.log(err));
                } else {
                  router.push("/personal-informations");
                }
              }}
            >
              {buttonTitle}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Verif;
