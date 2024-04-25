"use client";

import React, { useEffect, useState } from "react";
import { OSSIcons } from "../../../../public/assets/icons/parent";
import {
  Passport,
  Driving,
  Family,
  CitizenCard,
  Akta,
  Booking,
  Mariage,
  Criminal,
  Cr,
} from "../../../../public/assets/emoji/index";
import Image from "next/image";
import Link from "next/link";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { getServicesTypeHandler } from "@/app/store/actions/serviceAction";
import { toast } from "sonner";
import useLanguage from "@/app/useLanguage";

export const ServicesCard = ({ title, icon, desc, url }) => {
  const user = useAuthUser();
  return (
    <Link href={url}>
      <div
        className={`w-full lg:min-h-[300px] min-h-[170px] border-[1px] border-[#DCDCDC] rounded-[20px] ${
          user ? "lg:px-[15px] p-4" : "lg:p-[20px] p-4"
        } flex flex-col lg:gap-[24px] gap-2 col-span-1 cursor-pointer`}
      >
        <div className="flex justify-between">
          <div
            className={`lg:w-[64px] lg:h-[64px] items-start flex justify-start ${
              title === "Set Appointment"
                ? "lg:bg-[#F0EFFD]"
                : "lg:bg-[#E7953E]"
            }  rounded-[12.8px] flex justify-center items-center`}
          >
            <Image src={icon} width={40} height={40} alt={title} />
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
              user ? "lg:text-[18px] text-[14px]" : "lg:text-[24px] text-[14px]"
            } font-semibold text-[#2E2D2D] mb-1 leading-tight lg:mt-0 mt-2`}
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
  const { t } = useLanguage();
  // const router = useRouter();
  const { servicesType } = useSelector((state) => state.serviceReducer);
  const [service, setService] = useState([]);
  const dispatch = useDispatch();
  const { lang } = useSelector((state) => state.languageReducer);

  useEffect(() => {
    dispatch(getServicesTypeHandler()).catch((err) =>
      toast.error("Failed to fetch")
    );
  }, []);

  useEffect(() => {
    if (servicesType && servicesType.length > 0) {
      const updatedService = servicesType.map((e) => {
        let icon;
        switch (e.name) {
          case "family-card":
            icon = Family;
            break;
          case "general-passport":
            icon = Passport;
            break;
          case "driving-license":
            icon = Driving;
            break;
          case "citizen-id":
            icon = CitizenCard;
            break;
          case "birth-certificate":
            icon = Akta;
            break;
          case "marriage-certificate":
            icon = Mariage;
            break;
          case "criminal-record-certificate":
            icon = Criminal;
            break;
          case "commercial-registration":
            icon = Cr;
            break;
          default:
            icon = Family;
        }
        return {
          icon: icon,
          url: `/${e.name}`,
          title: e.name
            .split("-")
            .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
            .join(" "),
          name: e.name,
        };
      });
      if (
        user &&
        !updatedService.some((item) => item.title === "Set Appointment")
      ) {
        updatedService.unshift({
          icon: Booking,
          title: "Set Appointment",
          desc: "Book appointments with government officials",
          name: "set-appointment",
          url: "/set-appointment",
        });
      }
      setService(updatedService);
    }
  }, [servicesType, user, lang]);

  return (
    <div className={`${!user && "lg:pt-24 pt-16"}`} id="services">
      {user ? (
        <>
          <h1 className="lg:text-[28px] text-[24px] lg:leading-[57.6px] text-[#363131] text-start capitalize font-semibold mt-5 lg:mt-0">
            {t("home_title")}
          </h1>
          <p className="lg:mb-10 mb-5 text-[#646464] text-[16px]">
            {t("home_sub_title")}
          </p>
        </>
      ) : (
        <h1 className="lg:text-[40px] text-[28px] lg:px-3 lg:leading-[57.6px] text-[#363131] text-start capitalize mb-10">
          {t("landing_desc_3")}
        </h1>
      )}

      {user ? (
        <div className="grid lg:grid-cols-3 grid-cols-2 gap-3 gap-y-5">
          {service?.map((e, index) => {
            return (
              <ServicesCard
                key={index}
                title={t(`home_menu_${e.name}_title`)}
                desc={t(`home_menu_${e.name}_desc`)}
                icon={e.icon}
                url={e.url}
              />
            );
          })}
        </div>
      ) : (
        <div className="grid lg:grid-cols-4 grid-cols-2 gap-5">
          {service?.map((e, index) => (
            <ServicesCard
              key={index}
              title={t(`home_menu_${e.name}_title`)}
              desc={t(`home_menu_${e.name}_desc`)}
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
