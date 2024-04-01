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
} from "../../../public/assets/emoji/index";
import empty from "../../../public/assets/images/zzz.png";
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

const MyApplications = () => {
  const router = useRouter();
  const user = useAuthUser();
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.userReducer);
  const { myApplications, detailApplication } = useSelector(
    (state) => state.applicationReducer
  );

  const { myAppointments } = useSelector((state) => state.appointmentReducer);
  const [filterStatus, setFilterStatus] = useState("All");
  const [filterApps, setFilterApps] = useState("Service");

  const filteredApplications = myApplications?.filter((app) => {
    if (filterStatus === "All") return true;
    if (filterStatus === "waiting approval")
      return app.status.includes("waitingApproval");
    return app.status.includes(filterStatus);
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
      <>
        <div className="max-w-fit grid grid-cols-7 gap-3 justify-start">
          {status.map((e, i) => (
            <div
              key={i}
              className={`${
                index === i
                  ? "border-[#2E2D2D] text-[#2E2D2D] font-semibold"
                  : "text-[#646464] border-[#DCDCDC]"
              } cursor-pointer px-1 lg:w-[150px] text-[16px] border-[1px] flex justify-center items-center py-2 rounded-[8px]`}
              onClick={() => {
                setIndex(i);
                setFilterStatus(e);
              }}
              style={{ whiteSpace: "pre-line" }}
            >
              <p className="text-center">
                {e.charAt(0).toUpperCase() + e.slice(1)}
              </p>
            </div>
          ))}
        </div>
      </>
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
      if (serviceType === "citizen-card") return CitizenCard;
      if (serviceType === "passport") return Passport;
      if (serviceType === "driving-license") return Driving;
      if (serviceType === "birth-of-certificate") return Akta;
      if (serviceType === "family-card") return Family;
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
          className={`grid grid-cols-6 justify-center items-center gap-2 ${
            (status === "completed" ||
              status === "rejectedFromBackOffice" ||
              status === "rejectedFromFrontOffice") &&
            "border-b-[1px] border-[#DCDCDC] pb-4"
          }`}
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
          <div className="flex flex-col justify-between gap-3 -ml-12">
            <p className="text-[#646464] text-[16px]">Service Type</p>
            <p className="text-[#2E2D2D] text-[16px] font-semibold">
              {serviceTypeDecider(serviceType)}
            </p>
          </div>
          <div className="flex flex-col justify-between gap-3 -ml-12">
            <p className="text-[#646464] text-[16px]">Applying</p>
            <p className="text-[#2E2D2D] text-[16px] font-semibold">
              {serviceTypeDecider(service)}
            </p>
          </div>
          <div className="flex flex-col justify-between gap-3 ">
            <p className="text-[#646464] text-[16px]">Apply Date</p>
            <p className="text-[#2E2D2D] text-[16px] font-semibold">
              {dateFormatter(appliedAt)}
            </p>
          </div>
          <div className="flex flex-col justify-between gap-3 ml-16 w-full">
            <p className="text-[#646464] text-[16px]">Status</p>
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
            Detail
          </div>
        </div>
        {status === "completed" && (
          <div className="flex gap-4 justify-end items-center mt-3">
            <p className="text-[14px] text-[#646464]">
              Your documents are ready to be picked up at the office
            </p>
            <Link
              href={`/set-appointment?serviceType=${serviceTypeId}&service=${serviceId}`}
              className="bg-[#1C25E7] text-[#F3F3F3] p-[8px] px-4 rounded-[8px] text-[16px]"
            >
              Schedule Pick Up
            </Link>
          </div>
        )}
        {(status === "rejectedFromBackOffice" ||
          status === "rejectedFromFrontOffice") && (
          <div className="flex gap-4 justify-end items-center mt-3">
            <Link
              href={`/set-appointment?serviceType=${serviceTypeId}&service=${serviceId}`}
              className="border-[#DCDCDC] border-[1px] bg-[#FFFFFF] text-[#1C25E7] p-[8px] px-4 rounded-[8px] text-[16px]"
            >
              Correct at Office
            </Link>
            <Link
              href={`/${serviceType}?id=${id}`}
              className="bg-[#1C25E7] text-[#F3F3F3] p-[8px] px-4 rounded-[8px] text-[16px]"
            >
              Correct Online
            </Link>
          </div>
        )}
      </div>
    );
  };

  const CardListAppointments = ({ appointments, key }) => {
    const { bookingCode, officeLocation, serviceType, scheduledAt, service } =
      appointments || {};

    return (
      <div
        className="border-[#DCDCDC] border-[1px] mt-8 p-[24px] rounded-[20px]"
        key={key}
      >
        <div className="grid grid-cols-5 justify-center items-center gap-2">
          <div className="flex flex-col justify-between gap-2">
            <p className="text-[#646464] text-[16px]">Location</p>
            <p className="text-[#2E2D2D] text-[16px] font-semibold">
              {officeLocation}
            </p>
          </div>
          <div className="flex flex-col justify-between gap-2">
            <p className="text-[#646464] text-[16px]">Service</p>
            <p className="text-[#2E2D2D] text-[16px] font-semibold">
              {serviceTypeDecider(serviceType)}
            </p>
          </div>
          <div className="flex flex-col justify-between gap-2">
            <p className="text-[#646464] text-[16px]">Purpose</p>
            <p className="text-[#2E2D2D] text-[16px] font-semibold">
              {serviceTypeDecider(service)}
            </p>
          </div>
          <div className="flex flex-col justify-between gap-2">
            <p className="text-[#646464] text-[16px]">Date</p>
            <p className="text-[#2E2D2D] text-[16px] font-semibold">
              {formattedDateAppointment(scheduledAt)}
            </p>
          </div>
          <div className="flex flex-col justify-between gap-2">
            <p className="text-[#646464] text-[16px]">Code Booking</p>
            <p className="text-[#2E2D2D] text-[16px] font-semibold">
              {bookingCode}
            </p>
          </div>
        </div>
      </div>
    );
  };

  const EmptyData = ({ string }) => {
    return (
      <div className="flex justify-center items-center flex-col mt-10">
        <Image src={empty} alt="empty" className="w-24" />
        <p className="text-[#646464] text-center text-[16px]">
          No {string} available
        </p>
      </div>
    );
  };

  return (
    <>
      <div className="px-28 bg-white py-10 min-h-screen">
        {loading && <Loader />}
        <div
          className="flex gap-2 cursor-pointer"
          onClick={() => router.push("/")}
        >
          <OSSIcons name="LeftArrow" />
          <p className="text-[18px] font-semibold text-[#2E2D2D]">
            My Applications
          </p>
        </div>

        <div className="flex gap-16 mt-7">
          <div className="flex-1 flex-col">
            <Header />

            {filterApps === "Service" ? (
              <>
                <HeaderStatus />
                {filteredApplications?.length === 0 ? (
                  <EmptyData string="Service" />
                ) : (
                  filteredApplications?.map((e, idx) => (
                    <CardListApplications applications={e} key={idx} />
                  ))
                )}
              </>
            ) : myAppointments?.length === 0 ? (
              <EmptyData string="Appointment" />
            ) : (
              myAppointments.map((e, i) => (
                <CardListAppointments key={i} appointments={e} />
              ))
            )}
          </div>
        </div>
      </div>
      <ModalDetailApplications data={detailApplication} />
    </>
  );
};

export default MyApplications;
