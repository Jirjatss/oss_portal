"use client";

import React, { useState } from "react";
import { OSSIcons } from "../../../../public/assets/icons/parent";
import {
  Booking,
  Passport,
  Driving,
  Family,
  CitizenCard,
  Akta,
} from "../../../../public/assets/emoji/index";
import Image from "next/image";
import Link from "next/link";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";
import Appointment from "./Appointment";
const Services = () => {
  const user = useAuthUser();
  const [service, setService] = useState([
    {
      icon: Akta,
      title: "Birth of Certificate",
      desc: "Secure your identity. Obtain your birth certificate now!",
      url: "/birth-of-certificate",
    },
    {
      icon: CitizenCard,
      title: "Citizen ID",
      desc: "Secure your identity. Obtain your birth certificate now!",
      url: "/citizen-id",
    },
    {
      icon: Passport,
      title: "Passport",
      desc: "Secure your identity. Obtain your birth certificate now!",
      url: "/passport",
    },
    {
      icon: Family,
      title: "Family Card",
      desc: "Secure your identity. Obtain your birth certificate now!",
      url: "/family-card",
    },
    {
      icon: Driving,
      title: "Driving License",
      desc: "Secure your identity. Obtain your birth certificate now!",
      url: "/driving-license",
    },
  ]);

  if (user && !service.some((item) => item.title === "Set Appointment")) {
    setService((prevService) => [
      {
        icon: Booking,
        title: "Set Appointment",
        desc: "Book appointments with government officials",
        url: "/passport-card",
      },
      ...prevService,
    ]);
  }

  const ServicesCard = ({ title, icon, desc, url }) => {
    return (
      <Link href={url}>
        <div
          className={`w-full border-[1px] border-[#DCDCDC] rounded-[20px] ${
            user ? "px-[15px] py-[20px]" : "p-[20px]"
          } flex flex-col gap-[24px] col-span-1 cursor-pointer`}
        >
          <div className="flex justify-between">
            <div
              className={`w-[64px] h-[64px] ${
                title === "Set Appointment" ? "bg-[#F0EFFD]" : "bg-[#E7953E]"
              }  rounded-[12.8px] flex justify-center items-center`}
            >
              <Image src={icon} width={40} height={40} alt={title} />
            </div>
            <button>
              <OSSIcons name="RightArrow" />
            </button>
          </div>
          <div>
            <h1
              className={`${
                user ? "text-[18px]" : "text-[24px]"
              } font-semibold text-[#2E2D2D] mb-1`}
            >
              {title}
            </h1>
            <p
              className="text-[#646464] text-[16px]"
              style={{ fontWeight: 400 }}
            >
              {desc}
            </p>
          </div>
        </div>
      </Link>
    );
  };

  return (
    <div className={`${!user && "px-28 pt-24"}`} id="services">
      {user ? (
        <>
          <h1 className="text-[28px] leading-[57.6px] text-[#363131] text-start capitalize font-semibold">
            What your needs today?
          </h1>
          <p className="mb-10 text-[#646464] text-[16px]">
            Easily upload, process, and manage documents for efficient
            administration.
          </p>
        </>
      ) : (
        <h1 className="text-[40px] px-3 leading-[57.6px] text-[#363131] text-start capitalize mb-10">
          Choose the <b>various services</b> you need here
        </h1>
      )}

      {user ? (
        <div className="grid grid-cols-3 gap-3">
          {service.map((e, index) => (
            <ServicesCard
              key={index}
              title={e.title}
              desc={e.desc}
              icon={e.icon}
              url={e.url}
            />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-4 gap-5">
          {service.map((e, index) => (
            <ServicesCard
              key={index}
              title={e.title}
              desc={e.desc}
              icon={e.icon}
              url={e.url}
            />
          ))}
          <div className="col-span-3">
            <div className="border-[1px] border-[#DCDCDC] rounded-[20px] flex flex-1 p-6 gap-8 items-center h-full">
              <div className="bg-[#D9D7F9] rounded-[12.8px] w-[64px] h-[64px] flex justify-center items-center">
                <p className="text-[38.4px]">🗓</p>
              </div>
              <div className="flex flex-col flex-1">
                <h1 className="text-[24px] font-bold leading-[48px]">
                  Set Appointment Online First
                </h1>
                <p className="text-[16px] text-[#646464]">
                  Effortlessly book appointments with government officials{" "}
                  <br /> online for a seamless service experience
                </p>
              </div>
              <button className="">
                <OSSIcons
                  name="RightArrow"
                  style={{ width: "40px", height: "40px" }}
                />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Services;
