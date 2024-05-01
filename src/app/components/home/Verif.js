import {
  activateUser,
  getTokenHandler,
  getUserInformation,
  hideVerif,
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
} from "../../../../public/assets/emoji/index";
import Image from "next/image";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";
import useLanguage from "@/app/useLanguage";

function Verif() {
  const router = useRouter();
  const { t } = useLanguage();
  const dispatch = useDispatch();
  const user = useAuthUser();

  const { lang } = useSelector((state) => state.languageReducer);
  const [isVerifComplete, setIsVerifComplete] = useState(false);
  const { profile, isShowVerif } = useSelector((state) => state.userReducer);

  const [title, setTitle] = useState(null);

  useEffect(() => {
    if (user.status === "inactive")
      setTitle(<>{t("home_need_verify_email_title")}</>);
    if (user.status === "needToFillPersonalInformation")
      setTitle(<>{t("home_verification_title")}</>);
    if (isVerifComplete) setTitle(<>{t("home_verification_succeed_title")}</>);
  }, [user, lang]);

  useEffect(() => {
    if (user) dispatch(getUserInformation(user?.accessToken));
  }, [user]);

  const { personalDetail } = profile || {};
  const { firstName } = personalDetail || {};

  useEffect(() => {
    if (user?.status === "active") setIsVerifComplete(true);
    else setIsVerifComplete(false);
  }, [firstName]);

  const buttonTitle =
    user?.status === "inactive"
      ? t("home_need_verify_email_resend")
      : t("home_verification_cta");

  const titleDecider = () => {
    if (profile?.status === "inactive" && !profile)
      return "Verification your mail first";
    if (user?.status === "needToFillPersonalInformation")
      return "Verification your account first";
    if (isVerifComplete) return "Verification Successful!";
  };

  const iconDecider = () => {
    if (user?.status === "inactive") return ResendVerif;
    if (
      user?.status === "needToFillPersonalInformation" ||
      firstName === "" ||
      firstName === null
    )
      return FlowStep1;
    if (isVerifComplete) return VerifSuccess;
  };

  const descriptionDecider = () => {
    if (user?.status === "inactive" && !profile)
      return <>{t("home_need_verify_email_desc")}</>;
    if (
      user?.status === "needToFillPersonalInformation" ||
      firstName === "" ||
      firstName === null
    )
      return <>{t("home_verification_desc")}</>;
    if (isVerifComplete) return <>{t("home_verification_succeed_desc")}</>;
  };

  if (!isShowVerif) return null;

  return (
    <>
      <div className="border-[#DCDCDC] rounded-[20px] border-[1px] p-[24px] relative">
        <div className="absolute top-5 right-5">
          {isVerifComplete ? (
            <button onClick={() => dispatch(hideVerif())}>
              <OSSIcons name={"Cancel"} fill="#2E2D2D" />
            </button>
          ) : (
            <p className="text-[16px] text-[#646464] font-semibold">
              Only 3 steps!
            </p>
          )}
        </div>

        <div className="flex flex-col gap-4 lg:mt-0 mt-9">
          <div className="flex lg:flex-row flex-col lg:gap-3 lg:items-center">
            <h1 className="text-[#2E2D2D] font-semibold lg:text-[28px] text-[18px] leading-none capitalize">
              {title}
            </h1>
            <div className="lg:-mt-2.5 hidden lg:flex">
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
          {!isVerifComplete && (
            <div>
              <button
                className="bg-[#8B0000] px-7 py-2 rounded-lg text-[#F3F3F3] inline-block"
                onClick={() => {
                  if (user?.status === "inactive") {
                    dispatch(getTokenHandler(user?.accessToken)).then(() =>
                      toast.success(t("check_email"))
                    );
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
    </>
  );
}

export default Verif;
