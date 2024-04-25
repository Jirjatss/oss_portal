import Image from "next/image";
import React, { useEffect } from "react";
import {
  EmptyApplicant,
  MyApplicants,
} from "../../../../public/assets/emoji/index";
import { useDispatch, useSelector } from "react-redux";
import { getMyApplications } from "@/app/store/actions/applicationAction";
import { useRouter } from "next/navigation";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";
import Link from "next/link";
import useLanguage from "@/app/useLanguage";

function MyApplicant() {
  const user = useAuthUser();
  const { myApplications } = useSelector((state) => state.applicationReducer);
  console.log("myApplications:", myApplications);
  const existApplication = myApplications.filter(
    (e) => e.status !== "completed"
  );
  const dispatch = useDispatch();
  const { t } = useLanguage();
  const isEmptyApplications = myApplications?.length === 0 || !myApplications;

  useEffect(() => {
    const fetchData = () => {
      if (user) {
        dispatch(getMyApplications(user?.accessToken));
      }
    };

    fetchData();
  }, [user, dispatch]);

  return (
    <div className="border-[#DCDCDC] rounded-[20px] border-[1px] p-[24px]">
      <div className="flex flex-col lg:gap-10 gap-5">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="lg:hidden">
              <Image
                src={isEmptyApplications ? EmptyApplicant : MyApplicants}
                width={20}
                height={20}
                alt={"Empty"}
              />
            </div>
            <p className="text-[18px] text-[#363131] font-semibold lg:max-w-[160px]">
              {t("home_my_application_title")}
            </p>
          </div>
          <Link
            href="/my-applications"
            className="text-[#1C25E7] lg:text-[18px] text-[16px] font-semibold cursor-pointer"
          >
            {t("home_my_application_cta")}
          </Link>
        </div>

        <div className="bg-[#DCDCDC] rounded-xl justify-center items-center lg:flex p-5 m-auto  hidden">
          <Image
            src={isEmptyApplications ? EmptyApplicant : MyApplicants}
            width={50}
            height={50}
            alt={"Empty"}
          />
        </div>

        <div className="flex justify-center items-center flex-col text-center gap-4">
          {existApplication?.length !== 0 && myApplications !== null ? (
            <p className="text-[18px] text-[#363131] font-semibold">
              {existApplication?.length} {t("applications")}{" "}
              <span className="text-[18px] text-[#646464] font-thin">
                {" "}
                {t("home_my_application_desc_on_going_exist")}
              </span>
            </p>
          ) : (
            <>
              <p className="text-[18px] text-[#363131] font-semibold">
                {t("no_applications")}
              </p>
              <p className="text-[16px] text-[#646464] font-thin">
                {t("home_my_application_desc_on_going_empty")}
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default MyApplicant;
