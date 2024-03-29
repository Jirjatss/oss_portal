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
import { useDispatch, useSelector } from "react-redux";
import { getMyApplications } from "../store/actions/applicationAction";
import { getUser } from "../store/actions/userAction";
import Image from "next/image";
import Loader from "../components/Loader";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";

const MyApplications = () => {
  const router = useRouter();
  const user = useAuthUser();
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.userReducer);
  const { myApplications } = useSelector((state) => state.applicationReducer);
  const [filterStatus, setFilterStatus] = useState("All");

  const filteredApplications = myApplications?.filter((app) => {
    if (filterStatus === "All") return true;
    return app.status === filterStatus;
  });

  useEffect(() => {
    dispatch(getUser());
  }, []);

  useEffect(() => {
    const fetchData = () => {
      if (user) {
        dispatch(getMyApplications(user?.accessToken));
      }
    };

    fetchData();
  }, [user, dispatch]);

  const Header = () => {
    const [index, setIndex] = useState(0);
    const status = [
      "All",
      "Submitted",
      "Pending",
      "Rejected",
      "Completed",
      "Delivered",
    ];

    useEffect(() => {
      const newIndex = status.findIndex((s) => s === filterStatus);
      if (newIndex !== -1) {
        setIndex(newIndex);
      }
    }, [filterStatus]);

    return (
      <>
        <div className="border-b-[1px] border-[#646464] max-w-fit grid grid-cols-6 gap-3">
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
                setFilterStatus(e);
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

  const CardListApplications = ({ applications }) => {
    const { serviceType, service, appliedAt, status } = applications || {};
    const iconDecider = (serviceType) => {
      if (serviceType === "citizen-card") return CitizenCard;
      if (serviceType === "passport") return Passport;
      if (serviceType === "driving-license") return Driving;
      if (serviceType === "birth-of-certificate") return Akta;
      if (serviceType === "family-card") return Family;
    };

    const serviceTypeDecider = (serviceType) => {
      return `${serviceType?.charAt(0).toUpperCase() + serviceType?.slice(1)}`;
    };

    const statusColorDecider = (status) => {
      if (status === "Pending") return `text-[#DBC300] bg-[#DBC300]`;
      if (status === "Approved") return `text-[#1C25E7] bg-[#1C25E7]`;
      if (status === "RejectedFromBackOffice" || status === "Rejected")
        return `text-[#D84E42] bg-[#D84E42]`;
      if (status === "Submitted") return `text-[#646464] bg-[#646464]`;
      if (status === "Completed") return `text-[#1C25E7] bg-[#1C25E7]`;

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

    return (
      <div className="border-[#DCDCDC] border-[1px] mt-8 p-[24px] rounded-[20px]">
        <div className="grid grid-cols-6 justify-center items-center gap-2">
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
            <p className="text-[#2E2D2D] text-[16px]">{serviceType}</p>
          </div>
          <div className="flex flex-col justify-between gap-3 -ml-12">
            <p className="text-[#646464] text-[16px]">Applying</p>
            <p className="text-[#2E2D2D] text-[16px]">
              {serviceTypeDecider(service)}
            </p>
          </div>
          <div className="flex flex-col justify-between gap-3 ">
            <p className="text-[#646464] text-[16px]">Apply Date</p>
            <p className="text-[#2E2D2D] text-[16px]">
              {dateFormatter(appliedAt)}
            </p>
          </div>
          <div className="flex flex-col justify-between gap-3 ml-16">
            <p className="text-[#646464] text-[16px]">Status</p>
            <span
              className={`${statusColorDecider(
                status
              )} text-[12px] w-fit p-2 bg-opacity-15 rounded-[4px] font-semibold`}
            >
              {status}
            </span>
          </div>
          <div className="flex flex-col justify-between items-end text-[#1C25E7] font-semibold cursor-pointer">
            Detail
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      {loading && <Loader />}
      <div className="px-52 bg-white py-10 min-h-screen">
        <div
          className="flex gap-2 cursor-pointer"
          onClick={() => router.back()}
        >
          <OSSIcons name="LeftArrow" />
          <p className="text-[18px] font-semibold text-[#2E2D2D]">
            My Applications
          </p>
        </div>

        <div className="flex gap-16 mt-7">
          <div className="flex-1 flex-col">
            <h1 className="lg:text-[28px] font-semibold text-[#2E2D2D] mb-10">
              Status
            </h1>
            <Header />

            {filteredApplications?.map((e, idx) => (
              <CardListApplications applications={e} key={idx} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default MyApplications;
