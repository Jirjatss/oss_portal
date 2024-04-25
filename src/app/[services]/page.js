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
  const [index, setIndex] = useState(0);
  const { services } = useSelector((state) => state.serviceReducer);
  const desc = ["", "", ""];

  const newServices = services?.map((e) => {
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

  useEffect(() => {
    dispatch(getServicesHandler(code));
  }, []);

  const ServicesHeader = () => {
    return (
      <>
        <div className="grid grid-cols-4 lg:gap-3 gap-1 justify-start lg:w-3/4 w-full border-b-[1px] border-b-[#DCDCDC]">
          {newServices?.map((e, i) => (
            <div
              key={i}
              className={`${
                index === i
                  ? "border-[#1C25E7] border-b-[2px] text-[#1C25E7]"
                  : "text-[#646464]"
              } cursor-pointer  lg:text-[16px] text-[14px]`}
              onClick={() => setIndex(i)}
            >
              <p className="mb-1 text-center lg:text-[16px] text-[14px]">
                {t(`${e.label}`)} <br /> {t(`${e.name}`)}
              </p>
            </div>
          ))}
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
            className="bg-[#1C25E7] px-3 py-2 text-[#F3F3F3] rounded-lg max-w-fit mt-2.5 font-semibold"
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
        <div className="bg-white rounded-[20px] p-[20px] border-[1px] border-[#DCDCDC] lg:hidden flex flex-row lg:gap-1 gap-5 lg:w-[206px] h-fit mt-7">
          <div className="flex flex-col">
            <h1 className="text-[18px] font-semibold text-[#2E2D2D]">
              {t("service_footer_title")}
            </h1>
            <p className="text-[14px] text-[#646464]">
              {t("service_footer_desc")}
            </p>
          </div>
          <button
            className="bg-[#1C25E7] px-3 py-2 text-[#F3F3F3] rounded-lg max-w-fit mt-2.5 font-semibold h-fit"
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
          <div className="flex-1 flex-col w-screen lg:max-w-fit overflow-hidden">
            <h1 className="lg:text-[28px] font-semibold text-[#2E2D2D] mb-10">
              {t("category")}
            </h1>
            {services && <ServicesHeader />}
            <div className="flex flex-col gap-10 mt-10">
              {/* <div className="flex flex-col gap-3">
                <h1 className="text-[18px] text-[#2E2D2D] font-semibold">
                  📋 About Applications
                </h1>
                <p className="text-[16px] text-[#646464]">
                  Explore our Applicant Service for {title}! Streamlining the
                  application process, it ensures hassle-free access to
                  essential services. From simplified documentation to efficient
                  processing, we’re here to make managing your family’s needs
                  easier. Apply today for a smoother administrative experience!
                </p>
              </div>
              <div className="flex flex-col gap-3">
                <h1 className="text-[18px] text-[#2E2D2D] font-semibold">
                  🗂 What you need prepare for this?
                </h1>
                <ul className="list-disc ml-5 text-[16px] text-[#646464]">
                  <li>Scan of original valid CNIC/ NICOP/ Smart card.</li>
                  <li>
                    Scan of the data page, two random pages asked by the system
                    and the last ten passport pages of the original exhausted
                    passport. Finger Prints Performa.
                  </li>
                  <li>
                    Original scan of a color picture with white background
                    having specification 350/467 Pixels in JPEG/JPG format and
                    not more than 3MB size.
                  </li>
                  <li>
                    The applicant has to submit a statement/declaration as per
                    the prescribed format. (can be downloaded through the
                    download tab after login to your account) that he/ she holds
                    the original exhausted passport at the time of application
                    and his passport pages have been exhausted due to frequent
                    travel.
                  </li>
                </ul>
              </div>
              <div className="flex flex-col gap-3">
                <h1 className="text-[18px] text-[#2E2D2D] font-semibold">
                  ⏳ How Long It Will Take?
                </h1>
                <ul className="list-disc ml-5 text-[16px] text-[#646464]">
                  <li>Duration submited : 3 Working Day</li>
                  <li>
                    Step following:
                    <ul className="ml-5 list-disc">
                      <li>Waiting for approval</li>
                      <li>
                        Request Approved - In Progress, Registration Completed
                      </li>
                      <li>Passport Delivered</li>
                    </ul>
                  </li>
                </ul>
              </div> */}
              {desc.map((e, i) => {
                let icon;
                if (i === 0) icon = "📋";
                if (i === 1) icon = "🗂";
                if (i === 2) icon = "⏳";
                return (
                  <div className="flex flex-col gap-3" key={i}>
                    <h1 className="text-[18px] text-[#2E2D2D] font-semibold">
                      {icon} {t(`service_desc_title_${i + 1}`)}
                    </h1>
                    <p className="text-[16px] text-[#646464]">
                      <div
                        dangerouslySetInnerHTML={{
                          __html: t(`service_desc_desc_${i + 1}`),
                        }}
                      />
                    </p>
                  </div>
                );
              })}
            </div>
            <SubmissionMobile onClick={startSubmission} />
          </div>
          <Submission onClick={startSubmission} />
        </div>
      )}

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
