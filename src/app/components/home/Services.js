"use client";

import React, { useState } from "react";
import { OSSIcons } from "../../../../public/assets/icons/parent";
import {
  Passport,
  Driving,
  Family,
  CitizenCard,
  Akta,
  Booking,
} from "../../../../public/assets/emoji/index";
import Image from "next/image";
import Link from "next/link";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";
import { useRouter } from "next/navigation";

export const ServicesCard = ({ title, icon, desc, url }) => {
  const user = useAuthUser();
  return (
    <Link href={url}>
      <div
        className={`w-full border-[1px] border-[#DCDCDC] rounded-[20px] ${
          user ? "lg:px-[15px] px-2 py-[20px]" : "lg:p-[20px] p-2"
        } flex flex-col lg:gap-[24px] gap-2 col-span-1 cursor-pointer`}
      >
        <div className="flex justify-between">
          <div
            className={`lg:w-[64px] lg:h-[64px] w-[54px] h-[54px] ${
              title === "Set Appointment" ? "bg-[#F0EFFD]" : "bg-[#E7953E]"
            }  rounded-[12.8px] flex justify-center items-center`}
          >
            <Image
              src={icon}
              width={40}
              height={40}
              alt={title}
              className="lg:block hidden"
            />
            <Image
              src={icon}
              width={30}
              height={30}
              alt={title}
              className="lg:hidden block"
            />
          </div>
          <button className="lg:hidden block">
            <OSSIcons name="RightArrow" styleDiv={{ width: "25px" }} />
          </button>
          <button className="lg:block hidden">
            <OSSIcons name="RightArrow" />
          </button>
        </div>
        <div>
          <h1
            className={`${
              user ? "lg:text-[18px] text-[16px]" : "lg:text-[24px] text-[16px]"
            } font-semibold text-[#2E2D2D] mb-1`}
          >
            {title}
          </h1>
          <p
            className="text-[#646464] lg:text-[16px] text-[12px]"
            style={{ fontWeight: 400 }}
          >
            {desc}
          </p>
        </div>
      </div>
    </Link>
  );
};

const Services = () => {
  const user = useAuthUser();
  const router = useRouter();
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
        desc: (
          <>
            Book appointments with government <br /> officials
          </>
        ),
        url: "/set-appointment",
      },
      ...prevService,
    ]);
  }

  return (
    <div className={`${!user && "lg:pt-24 pt-16"}`} id="services">
      {user ? (
        <>
          <h1 className="lg:text-[28px] text-[24px] lg:leading-[57.6px] text-[#363131] text-start capitalize font-semibold mt-5 lg:mt-0">
            What your needs today?
          </h1>
          <p className="lg:mb-10 mb-5 text-[#646464] text-[16px]">
            Easily upload, process, and manage documents for efficient
            administration.
          </p>
        </>
      ) : (
        <h1 className="lg:text-[40px] text-[28px] lg:px-3 lg:leading-[57.6px] text-[#363131] text-start capitalize mb-10">
          Choose the <b>various services</b> you need here
        </h1>
      )}

      {user ? (
        <div className="grid lg:grid-cols-3 grid-cols-2 gap-3 gap-y-5">
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
        <div className="grid lg:grid-cols-4 grid-cols-2 gap-5">
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
      )}
    </div>
  );
};

export default Services;
