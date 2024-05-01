"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { OSSIcons } from "../../../public/assets/icons/parent";
import FormSubmisson from "../components/Form/FormSubmisson";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";
import ModalSuccess from "../components/Modal/ModalSuccess";
import { useDispatch, useSelector } from "react-redux";
import { getServicesHandler } from "../store/actions/serviceAction";
import useLanguage from "../useLanguage";
import { dataServices } from "../constant/services";

function Service() {
  const auth = useAuthUser();
  const pathname = usePathname();
  const router = useRouter();
  const dispatch = useDispatch();
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const code = searchParams.get("code");
  const { t } = useLanguage();
  const [isSubmission, setIsSubmission] = useState(false);
  const [index, setIndex] = useState("new_text");
  const { services } = useSelector((state) => state.serviceReducer);

  const [desc, setDesc] = useState(
    `new_text_home_menu_${pathname.slice(1)}_title_desc`
  );

  const data = dataServices.filter((e) => e.name === pathname.slice(1));

  const newServices = data[0]?.data?.map((e) => {
    const splitStrings = e.name.split("-");
    let label = splitStrings[0];
    const title = splitStrings.slice(1).join("-");
    if (label === "new") label = "new_text";

    return {
      label: label,
      name: `home_menu_${title}_title`,
    };
  });

  const title = pathname.replace(/^\//, "");
  console.log("pathname:", pathname);
  const [width, setWidth] = useState(newServices.length);

  useEffect(() => {
    if (code) dispatch(getServicesHandler(code));
  }, [code]);

  const ServicesHeader = () => {
    if (data[0].data.length === 0) return null;
    return (
      <>
        <div
          className={`grid grid-cols-${width} lg:gap-3 gap-1 justify-start ${
            pathname === "/commercial-registration"
              ? "lg:w-4/4"
              : width > 3
              ? "lg:w-3/4"
              : `lg:w-${width}/4`
          }   w-full border-b-[1px] border-b-[#DCDCDC]`}
        >
          {newServices?.map((e, i) => {
            return (
              <div
                key={i}
                className={`${
                  index === e.label
                    ? "border-[#8B0000] border-b-[2px] text-[#8B0000]"
                    : "text-[#646464]"
                } cursor-pointer  lg:text-[16px] text-[14px]`}
                onClick={() => {
                  setIndex(e.label);
                  setDesc(`${e.label}_${e.name}_desc`);
                }}
              >
                {e.label === "renew" ? (
                  <p className="mb-1 text-center lg:text-[16px] text-[14px]">
                    {t(`${e.label}`)} <br /> {t(`${e.name}`)}
                  </p>
                ) : (
                  <p className="mb-1 text-center lg:text-[16px] text-[14px]">
                    {t(`${e.name}`)} <br /> {t(`${e.label}`)}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </>
    );
  };

  const Submission = ({ onClick }) => {
    return (
      <>
        <div className="bg-white rounded-[20px] p-[20px] border-[1px] border-[#DCDCDC] lg:flex flex-col gap-1 lg:w-[250px] h-fit hidden">
          <h1 className="text-[18px] font-semibold text-[#2E2D2D]">
            {t("service_footer_title")}
          </h1>
          <p className="text-[14px] text-[#646464]">
            {t("service_footer_desc")}
          </p>
          <button
            className="bg-[#8B0000] px-3 py-2 text-[#F3F3F3] rounded-lg max-w-fit mt-2.5 font-semibold"
            onClick={onClick}
          >
            {t("service_footer_cta")}
          </button>
        </div>
      </>
    );
  };
  const SubmissionMobile = ({ onClick }) => {
    return (
      <>
        <div className="bg-white justify-between  p-[20px] border-[1px] border-[#DCDCDC] lg:hidden flex flex-row lg:gap-1 gap-5 lg:w-[206px] h-fit  fixed bottom-0 w-screen -ml-5">
          <div className="flex flex-col">
            <h1 className="text-[18px] font-semibold text-[#2E2D2D]">
              {t("service_footer_title")}
            </h1>
            <p className="text-[14px] text-[#646464]">
              {t("service_footer_desc")}
            </p>
          </div>
          <button
            className="bg-[#8B0000] px-3 py-2 text-[#F3F3F3] rounded-lg max-w-fit mt-2.5 font-semibold h-fit"
            onClick={onClick}
          >
            {t("service_footer_cta")}
          </button>
        </div>
      </>
    );
  };

  const startSubmission = () => {
    if (!auth) router.replace("/login");
    else setIsSubmission(true);
  };

  return (
    <div className="lg:px-32 px-5 bg-white py-10 min-h-screen  overflow-hidden">
      <div
        className="flex gap-2 cursor-pointer"
        onClick={() => {
          if (isSubmission) setIsSubmission(false);
          else router.back();
        }}
      >
        <OSSIcons name="LeftArrow" />
        <p className="text-[18px] font-semibold text-[#2E2D2D]">
          {t("service")} {t(`home_menu_${title}_title`)}
        </p>
      </div>
      {isSubmission || id !== null ? (
        <FormSubmisson code={code} />
      ) : (
        <div className="flex gap-16 mt-7 ">
          <div className="flex-1 flex-col w-screen overflow-hidden item flex">
            <h1 className="lg:text-[28px] font-semibold text-[#2E2D2D] mb-10">
              {t("category")}
            </h1>
            {services && <ServicesHeader />}
            {data[0].data.length > 0 ? (
              <div
                dangerouslySetInnerHTML={{
                  __html: t(`${desc}`),
                }}
              />
            ) : (
              <div
                className="lg:min-h-[340px] lg:text-[24px]  font-semibold w-full justify-center items-center text-center flex m-auto min-h-[200px]"
                dangerouslySetInnerHTML={{
                  __html: t(`service_empty`),
                }}
              />
            )}
          </div>
          <Submission onClick={startSubmission} />
        </div>
      )}
      <SubmissionMobile onClick={startSubmission} />

      <ModalSuccess
        id="success_submission"
        title={t("dialog_data_submitted_title")}
        description={t("dialog_data_submitted_desc")}
        onClick={() => {
          router.push("/my-applications");
        }}
      />
    </div>
  );
}

export default Service;
