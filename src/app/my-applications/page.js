"use client";
import React, { useEffect, useState } from "react";
import { OSSIcons } from "../../../public/assets/icons/parent";
import { useRouter } from "next/navigation";
import {
  Passport,
  Driving,
  Akta,
  Family,
  CitizenCard,
  Mariage,
  Cr,
  Criminal,
} from "../../../public/assets/emoji/index";
import { useDispatch, useSelector } from "react-redux";
import {
  getDetailApplicationStatus,
  getMyApplications,
} from "../store/actions/applicationAction";
import Image from "next/image";
import Loader from "../components/Loader";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";
import { toast } from "sonner";
import { getMyAppointments } from "../store/actions/appointmentAction";
import { formattedDateAppointment } from "../universalFunction";
import ModalDetailApplications from "../components/Modal/ModalDetailApplications";
import Link from "next/link";
import useLanguage from "../useLanguage";

const MyApplications = () => {
  const router = useRouter();
  const user = useAuthUser();
  const { t } = useLanguage();
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.userReducer);
  const { myApplications, detailApplication } = useSelector(
    (state) => state.applicationReducer
  );

  const { myAppointments } = useSelector((state) => state.appointmentReducer);

  const [filterStatus, setFilterStatus] = useState("All");
  const [filterStatusAppointment, setFilterStatusAppointmen] = useState("All");

  // useEffect(() => {
  //   console.log("filterStatusAppointment:", filterStatusAppointment);
  // }, [filterStatusAppointment]);

  const [filterApps, setFilterApps] = useState("Service");

  const filteredApplications = myApplications?.filter((app) => {
    if (filterStatus === "All") return true;
    if (filterStatus === "waiting approval")
      return app.status.includes("waitingApproval");
    return app.status.includes(filterStatus);
  });

  const filteredAppointments = myAppointments?.filter((e) => {
    if (filterStatusAppointment === "All") return true;
    return e.status.includes(filterStatusAppointment);
  });

  const serviceTypeDecider = (serviceType) => {
    const words = serviceType.split("-");
    const capitalizedWords = words.map(
      (word) => word.charAt(0).toUpperCase() + word.slice(1)
    );
    return capitalizedWords.join(" ");
  };

  useEffect(() => {
    const fetchData = () => {
      if (user) {
        dispatch(getMyApplications(user?.accessToken));
        dispatch(getMyAppointments(user.accessToken));
      }
    };

    fetchData();
  }, [user, dispatch]);

  useEffect(() => {
    if (!user) {
      toast.error("Unauthorized");
      router.push("/");
    }
  }, [user]);

  const Header = () => {
    const [index, setIndex] = useState(0);
    const status = ["Service", "Appoinment"];

    useEffect(() => {
      const newIndex = status.findIndex((s) => s === filterApps);
      if (newIndex !== -1) {
        setIndex(newIndex);
      }
    }, [filterApps]);

    return (
      <>
        <div className="border-b-[1px] border-[#646464] max-w-fit grid grid-cols-2 gap-3 mb-5 w-full">
          {status.map((e, i) => (
            <div
              key={i}
              className={`${
                index === i
                  ? "border-[#1C25E7] border-b-[2px] text-[#1C25E7] font-semibold"
                  : "text-[#646464]"
              } cursor-pointer px-1 lg:w-[150px] text-[16px] `}
              onClick={() => {
                setIndex(i);
                setFilterApps(e);
              }}
              style={{ whiteSpace: "pre-line" }}
            >
              <p className="mb-1 text-center">{e}</p>
            </div>
          ))}
        </div>
      </>
    );
  };

  const HeaderStatus = () => {
    const [index, setIndex] = useState(0);
    const status = [
      "All",
      "submitted",
      "waiting approval",
      "rejected",
      "resubmitted",
      "completed",
      "delivered",
    ];

    useEffect(() => {
      const newIndex = status.findIndex((s) => s === filterStatus);
      if (newIndex !== -1) {
        setIndex(newIndex);
      }
    }, [filterStatus]);

    return (
      <div className="flex lg:grid lg:grid-cols-7 lg:gap-3 gap-1 justify-start overflow-y-hidden overflow-x-auto lg:pb-0 pb-2">
        {status.map((e, i) => (
          <div
            key={i}
            className={`${
              index === i
                ? "border-[#2E2D2D] text-[#2E2D2D] font-semibold"
                : "text-[#646464] border-[#DCDCDC]"
            } cursor-pointer px-1 min-w-[150px]  lg:text-[16px] text-[14px] border-[1px] flex justify-center items-center lg:py-2 py-1 rounded-[8px] `}
            onClick={() => {
              setIndex(i);
              setFilterStatus(e);
            }}
          >
            <p className="text-center">
              {e.charAt(0).toUpperCase() + e.slice(1)}
            </p>
          </div>
        ))}
      </div>
    );
  };

  const HeaderStatusAppointment = () => {
    const [index, setIndex] = useState(0);
    const status = ["All", "waitingApproval", "reject", "completed", "absent"];

    useEffect(() => {
      const newIndex = status.findIndex((s) => s === filterStatusAppointment);
      if (newIndex !== -1) {
        setIndex(newIndex);
      }
    }, [filterStatusAppointment]);

    return (
      <div className="flex lg:grid lg:grid-cols-7 lg:gap-3 gap-1 justify-start overflow-y-hidden overflow-x-auto lg:pb-0 pb-2">
        {status.map((e, i) => (
          <div
            key={i}
            className={`${
              index === i
                ? "border-[#2E2D2D] text-[#2E2D2D] font-semibold"
                : "text-[#646464] border-[#DCDCDC]"
            } cursor-pointer px-1 min-w-[150px]  lg:text-[16px] text-[14px] border-[1px] flex justify-center items-center lg:py-2 py-1 rounded-[8px] `}
            onClick={() => {
              setIndex(i);
              setFilterStatusAppointmen(e);
            }}
          >
            <p className="text-center">
              {e.charAt(0).toUpperCase() + e.slice(1)}
            </p>
          </div>
        ))}
      </div>
    );
  };

  const CardListApplications = ({ applications }) => {
    const {
      serviceType,
      service,
      appliedAt,
      status,
      id,
      serviceId,
      serviceTypeId,
    } = applications || {};

    const iconDecider = (serviceType) => {
      if (serviceType === "family-card") return Family;
      if (serviceType === "general-passport") return Passport;
      if (serviceType === "driving-license") return Driving;
      if (serviceType === "citizen-id") return CitizenCard;
      if (serviceType === "birth-certificate") return Akta;
      if (serviceType === "marriage-certificate") return Mariage;
      if (serviceType === "criminal-record-certificate") return Criminal;
      if (serviceType === "commercial-registration") return Cr;
    };

    const statusColorDecider = (status) => {
      if (status.includes("waitingApproval"))
        return `text-[#DBC300] bg-[#DBC300]`;
      if (status.includes("delivered")) return `text-[#1C25E7] bg-[#1C25E7]`;
      if (status.includes("rejected")) return `text-[#D84E42] bg-[#D84E42]`;
      if (status.includes("submitted")) return `text-[#646464] bg-[#646464]`;
      if (status.includes("completed")) return `text-[#1C25E7] bg-[#1C25E7]`;

      return;
    };

    const dateFormatter = (dateString) => {
      const date = new Date(dateString);
      const options = {
        day: "2-digit",
        month: "long",
        year: "numeric",
        hour12: false,
        hour: "2-digit",
        minute: "2-digit",
      };
      const formattedDate = date.toLocaleDateString("en-GB", options);
      return formattedDate.replace("at", "").trim();
    };

    const statusDecider = (status) => {
      if (status.includes("rejected")) return "Rejected";
      if (status.includes("waitingApproval")) return "Waiting Approval";
      return status.charAt(0).toUpperCase() + status.slice(1);
    };

    return (
      <div className="border-[#DCDCDC] border-[1px] mt-8 p-[24px] rounded-[20px] flex flex-col">
        <div
          className={`grid-cols-6 justify-center items-center gap-2 ${
            (status === "completed" || status.includes("reject")) &&
            "border-b-[1px] border-[#DCDCDC] pb-4"
          } lg:grid hidden`}
        >
          <div
            className={`w-[64px] h-[64px]  bg-[#E7953E]
                 rounded-[12.8px] flex justify-center items-center`}
          >
            <Image
              src={iconDecider(serviceType)}
              width={40}
              height={40}
              alt={serviceType}
            />
          </div>
          <div className="flex flex-col  gap-3 -ml-12 max-w-[170px] min-h-[80px]">
            <p className="text-[#646464] text-[16px]">{t("service_type")}</p>
            <p className="text-[#2E2D2D] text-[16px] font-semibold leading-1">
              {serviceTypeDecider(serviceType)}
            </p>
          </div>
          <div className="flex flex-col  gap-3 -ml-12 min-h-[80px]">
            <p className="text-[#646464] text-[16px]">{t("applying")}</p>
            <p className="text-[#2E2D2D] text-[16px] font-semibold leading-1">
              {serviceTypeDecider(service)}
            </p>
          </div>
          <div className="flex flex-col  gap-3 min-h-[80px]">
            <p className="text-[#646464] text-[16px]">{t("apply_date")}</p>
            <p className="text-[#2E2D2D] text-[16px] font-semibold">
              {dateFormatter(appliedAt)}
            </p>
          </div>
          <div className="flex flex-col  gap-3 ml-16 w-full min-h-[80px]">
            <p className="text-[#646464] text-[16px]">{t("status")}</p>
            <span
              className={`${statusColorDecider(
                status
              )} text-[12px] w-fit p-2 bg-opacity-15 rounded-[4px] font-semibold `}
            >
              {statusDecider(status)}
            </span>
          </div>
          <div
            className="flex flex-col justify-between items-end text-[#1C25E7] font-semibold cursor-pointer"
            onClick={() => {
              dispatch(getDetailApplicationStatus(id, user.accessToken)).then(
                () => detailModal.showModal()
              );
            }}
          >
            {t("detail")}
          </div>
        </div>
        {/* mobile */}
        <div
          className={`flex flex-col justify-center items-center gap-2 ${
            (status === "completed" || status.includes("reject")) &&
            "border-b-[1px] border-[#DCDCDC] pb-4"
          } lg:hidden`}
        >
          <div className="flex justify-between w-full items-center">
            <div
              className={`w-[54px] h-[54px]  bg-[#E7953E]
                 rounded-md flex justify-center items-center`}
            >
              <Image
                src={iconDecider(serviceType)}
                width={30}
                height={30}
                alt={serviceType}
              />
            </div>
            <div
              className="flex flex-col justify-between items-end text-[#1C25E7] font-semibold cursor-pointer"
              onClick={() => {
                dispatch(getDetailApplicationStatus(id, user.accessToken)).then(
                  () => detailModal.showModal()
                );
              }}
            >
              {t("detail")}
            </div>
          </div>
          <div className="flex justify-between w-full items-center mt-3 border-b-[1px] border-[#DCDCDC] pb-4 gap-16">
            <div className="flex flex-col justify-between lg:gap-3 gap-1">
              <p className="text-[#646464] text-[16px]">{t("service_type")}</p>
              <p className="text-[#2E2D2D] text-[16px] font-semibold">
                {serviceTypeDecider(serviceType)}
              </p>
            </div>
            <div className="flex flex-col justify-between lg:gap-3 gap-1 items-end text-end">
              <p className="text-[#646464] text-[16px]">{t("applying")}</p>
              <p className="text-[#2E2D2D] text-[16px] font-semibold">
                {serviceTypeDecider(service)}
              </p>
            </div>
          </div>
          <div className="flex justify-between w-full items-center pt-4 gap-5">
            <div className="flex flex-col justify-between lg:gap-3 gap-1">
              <p className="text-[#646464] text-[16px]">{t("apply_date")}</p>
              <p className="text-[#2E2D2D] text-[16px] font-semibold">
                {dateFormatter(appliedAt)}
              </p>
            </div>
            <div className="flex flex-col justify-between lg:gap-3 gap-1 text-end">
              <p className="text-[#646464] text-[16px]">{t("status")}</p>
              <span
                className={`${statusColorDecider(
                  status
                )} text-[12px] w-fit p-2 bg-opacity-15 rounded-[4px] font-semibold `}
              >
                {statusDecider(status)}
              </span>
            </div>
          </div>
        </div>

        {status === "completed" && (
          <div className="flex lg:gap-4 gap-2 lg:flex-row flex-col justify-end items-center mt-3">
            <p className="text-[14px] text-[#646464]">
              {t("application_completed_footer_desc")}
            </p>
            <Link
              href={`/set-appointment?serviceType=${serviceTypeId}&service=${serviceId}`}
              className="bg-[#1C25E7] text-[#F3F3F3] p-[8px] px-4 rounded-[8px] text-[16px] w-full lg:max-w-fit text-center"
            >
              {t("application_completed_footer_cta")}
            </Link>
          </div>
        )}
        {status.includes("rejected") && (
          <div className="flex lg:flex-row flex-col lg:gap-4 gap-2 justify-end items-center mt-3">
            <Link
              href={`/set-appointment?serviceType=${serviceTypeId}&service=${serviceId}`}
              className="border-[#DCDCDC] border-[1px] bg-[#FFFFFF] text-[#1C25E7] p-[8px] px-4 rounded-[8px] text-[16px] w-full lg:max-w-fit text-center"
            >
              {t("application_rejected_footer_cta_secondary")}
            </Link>
            <Link
              href={`/${serviceType}?id=${id}&serviceId=${serviceId}`}
              className="bg-[#1C25E7] text-[#F3F3F3] p-[8px] px-4 rounded-[8px] text-[16px] w-full lg:max-w-fit text-center"
            >
              {t("application_rejected_footer_cta_primary")}
            </Link>
          </div>
        )}
      </div>
    );
  };

  const CardListAppointments = ({ appointments }) => {
    const {
      bookingCode,
      officeLocation,
      serviceType,
      scheduledAt,
      service,
      status,
      id,
    } = appointments || {};

    return (
      <div className="border-[#DCDCDC] border-[1px] mt-8 p-[24px] rounded-[20px]">
        <div
          className={`grid-cols-5 justify-center items-center gap-2 lg:grid hidden ${
            status.includes("reject") &&
            "lg:border-none border-b-[1px] border-[#DCDCDC] pb-4"
          }`}
        >
          <div className="flex flex-col justify-between gap-2">
            <p className="text-[#646464] text-[16px]">{t("location")}</p>
            <p className="text-[#2E2D2D] text-[16px] font-semibold">
              {officeLocation}
            </p>
          </div>
          <div className="flex flex-col justify-between gap-2 max-w-[200px]">
            <p className="text-[#646464] text-[16px]">{t("service")}</p>
            <p className="text-[#2E2D2D] text-[16px] font-semibold">
              {serviceTypeDecider(serviceType)}
            </p>
          </div>
          <div className="flex flex-col justify-between gap-2 max-w-[200px]">
            <p className="text-[#646464] text-[16px]">{t("purpose")}</p>
            <p className="text-[#2E2D2D] text-[16px] font-semibold">
              {serviceTypeDecider(service)}
            </p>
          </div>
          <div className="flex flex-col justify-between gap-2">
            <p className="text-[#646464] text-[16px]">{t("date")}</p>
            <p className="text-[#2E2D2D] text-[16px] font-semibold">
              {formattedDateAppointment(scheduledAt)}
            </p>
          </div>
          <div className="flex flex-col justify-between gap-2 ml-8">
            <p className="text-[#646464] text-[16px]">
              {status === "confirm" ? t("code_booking") : t("status")}
            </p>
            <p className="text-[#2E2D2D] text-[16px] font-semibold">
              {status === "confirm"
                ? bookingCode
                : status
                    .replace(/([A-Z])/g, " $1")
                    .trim()
                    .split("-")
                    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                    .join(" ")}
            </p>
          </div>
        </div>

        {/* Mobile */}
        <div className="flex flex-col justify-between items-center gap-2 lg:hidden">
          <div className="grid grid-cols-2 justify-between w-full border-b-[#DCDCDC] border-b-[1px] pb-4">
            <div className="flex flex-col justify-between gap-2 w-full">
              <p className="text-[#646464] text-[16px]">{t("location")}</p>
              <p className="text-[#2E2D2D] text-[16px] font-semibold">
                {officeLocation}
              </p>
            </div>
            <div className="flex flex-col justify-between gap-2 text-end">
              <p className="text-[#646464] text-[16px]">Date</p>
              <p className="text-[#2E2D2D] text-[16px] font-semibold">
                {formattedDateAppointment(scheduledAt)}
              </p>
            </div>
          </div>
          <div className="grid grid-cols-2 justify-between w-full border-b-[#DCDCDC] border-b-[1px] pt-2 pb-4">
            <div className="flex flex-col justify-between gap-2 w-full ">
              <p className="text-[#646464] text-[16px]">Service</p>
              <p className="text-[#2E2D2D] text-[16px] font-semibold">
                {serviceTypeDecider(serviceType)}
              </p>
            </div>
            <div className="flex flex-col justify-between gap-2 w-full items-end">
              <p className="text-[#646464] text-[16px]">Purpose</p>
              <p className="text-[#2E2D2D] text-[16px] font-semibold">
                {serviceTypeDecider(service)}
              </p>
            </div>
          </div>
          <div className="flex justify-between w-full pt-2">
            <div className="flex flex-col justify-between gap-2 w-full ">
              <p className="text-[#646464] text-[16px]">
                {status === "confirm" ? t("code_booking") : t("status")}
              </p>
              <p className="text-[#2E2D2D] text-[16px] font-semibold">
                {status === "confirm"
                  ? bookingCode
                  : status
                      .replace(/([A-Z])/g, " $1")
                      .trim()
                      .split("-")
                      .map(
                        (word) => word.charAt(0).toUpperCase() + word.slice(1)
                      )
                      .join(" ")}
              </p>
            </div>
          </div>
        </div>

        {status.includes("reject") && (
          <div className="flex lg:flex-row flex-col lg:gap-4 gap-2 justify-end items-center mt-3 border-t-[1px] border-t-[#DCDCDC] pt-4">
            <p className="text-[14px] text-[#646464] lg:mb-0 mb-2">
              {t("appointment_rejected_msg")}
            </p>
            <Link
              href={`/set-appointment?appointmentId=${id}&reschedule=true`}
              className="bg-[#1C25E7] text-[#F3F3F3] p-[8px] px-4 rounded-[8px] text-[16px] w-full lg:w-[180px] text-center"
            >
              {t("reschedule")}
            </Link>
          </div>
        )}
      </div>
    );
  };

  const EmptyData = ({ string }) => {
    return (
      <div className="flex justify-center items-center flex-col mt-10">
        <svg
          stroke="currentColor"
          fill="currentColor"
          strokeWidth="0"
          viewBox="0 0 24 24"
          aria-hidden="true"
          className=" text-gray-500"
          height="80"
          width="80"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            d="M6.912 3a3 3 0 00-2.868 2.118l-2.411 7.838a3 3 0 00-.133.882V18a3 3 0 003 3h15a3 3 0 003-3v-4.162c0-.299-.045-.596-.133-.882l-2.412-7.838A3 3 0 0017.088 3H6.912zm13.823 9.75l-2.213-7.191A1.5 1.5 0 0017.088 4.5H6.912a1.5 1.5 0 00-1.434 1.059L3.265 12.75H6.11a3 3 0 012.684 1.658l.256.513a1.5 1.5 0 001.342.829h3.218a1.5 1.5 0 001.342-.83l.256-.512a3 3 0 012.684-1.658h2.844z"
            clipRule="evenodd"
          ></path>
        </svg>
        <p className="text-[#646464] text-center text-[20px] font-semibold">
          Oops...
        </p>
        <p className="text-[#646464] text-center text-[16px]">
          No {string} available
        </p>
      </div>
    );
  };

  return (
    <>
      <div className="lg:px-48 px-5 bg-white py-10 min-h-screen">
        {loading && <Loader />}
        <div
          className="flex gap-2 cursor-pointer"
          onClick={() => router.push("/")}
        >
          <OSSIcons name="LeftArrow" />
          <p className="text-[18px] font-semibold text-[#2E2D2D]">
            {t("home_my_application_title")}
          </p>
        </div>

        <div className="flex gap-16 mt-7">
          <div className="flex-1 flex-col w-screen overflow-hidden">
            <Header />

            {filterApps === "Service" && (
              <>
                <HeaderStatus />
                {filteredApplications?.length === 0 || !filteredApplications ? (
                  <EmptyData string="Service" />
                ) : (
                  filteredApplications?.map((e, idx) => (
                    <CardListApplications applications={e} key={idx} />
                  ))
                )}
              </>
            )}
            {filterApps !== "Service" && (
              <>
                <HeaderStatusAppointment />
                {filteredAppointments?.length === 0 || !filteredAppointments ? (
                  <EmptyData string="Appointment" />
                ) : (
                  filteredAppointments.map((e, i) => (
                    <CardListAppointments key={i} appointments={e} />
                  ))
                )}
              </>
            )}
          </div>
        </div>
      </div>
      <ModalDetailApplications data={detailApplication} />
    </>
  );
};

export default MyApplications;
