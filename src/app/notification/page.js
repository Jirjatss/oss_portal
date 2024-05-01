"use client";

import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { OSSIcons } from "../../../public/assets/icons/parent";
import useLanguage from "../useLanguage";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";
import axios from "axios";
import Loader from "../components/Loader";
import { toast } from "sonner";
import { useSelector } from "react-redux";

function Notification() {
  const router = useRouter();
  const { t } = useLanguage();
  const user = useAuthUser();
  const { lang } = useSelector((state) => state.languageReducer);

  const [data, setData] = useState(null);

  const getMyLog = async () => {
    try {
      const { data } = await axios({
        url: "https://api.ardhiansyah.com/me/logs",
        headers: {
          Authorization: `Bearer ${user?.accessToken}`,
        },
      });
      setData(data.data);
    } catch (error) {
      console.log(error);
    }
  };

  function groupByDate(array) {
    const grouped = array?.reduce((acc, obj) => {
      const date = new Date(obj.createdAt).toISOString().split("T")[0];
      if (!acc[date]) {
        acc[date] = [];
      }
      acc[date].push(obj);
      return acc;
    }, {});

    if (!grouped) {
      return [];
    }

    return Object.entries(grouped).map(([date, items]) => ({ date, items }));
  }

  function formatDate(dateString) {
    const date = new Date(dateString);
    const options = {
      weekday: "long",
      month: "long",
      day: "2-digit",
      year: "numeric",
    };
    let locales = "tl-PT";
    if (lang === "en") locales = "en-GB";

    const formatter = new Intl.DateTimeFormat(locales, options);
    const formattedDate = formatter.format(date);
    const [weekday, day, month, year] = formattedDate.split(" ");

    return `${weekday} ${month.replace(",", "")} ${day}  ${year}`;
  }

  function extractTime(dateString) {
    const date = new Date(dateString);
    const hours = date.getHours();
    const minutes = date.getMinutes();

    const formattedHours = hours < 10 ? "0" + hours : hours;
    const formattedMinutes = minutes < 10 ? "0" + minutes : minutes;

    return `${formattedHours}.${formattedMinutes}`;
  }

  const formattedTitle = (string) => {
    if (string) {
      const splitStrings = string.split("-");
      let label = splitStrings[0];
      const title = splitStrings.slice(1).join("-");
      if (label === "new") label = "new_text";

      return `${t(`${label}`)} ${t(`home_menu_${title}_title`)}`;
    }
  };

  useEffect(() => {
    if (user) getMyLog();
    else {
      router.push("/");
      toast.error("Login First");
    }
  }, []);

  const groupedByDate = groupByDate(data);

  return (
    <div className="lg:px-32 px-5 bg-white py-10 min-h-screen overflow-hidden">
      <div className="flex justify-between">
        <div
          className="flex gap-2 cursor-pointer"
          onClick={() => {
            router.back();
          }}
        >
          <OSSIcons name="LeftArrow" />
          <p className="text-[18px] font-semibold text-[#2E2D2D]">
            {t("notification")}
          </p>
        </div>
      </div>
      <div className="flex flex-col gap-2">
        {groupedByDate?.reverse().map((group, i) => (
          <>
            <p className="text-[18px] font-semibold mt-7">
              {formatDate(group.date)}
            </p>

            {group.items
              .filter(
                (item) => item.action !== "approveApplicationFromFrontOffice"
              )
              .map((item, j) => {
                // console.log("item:", item);
                const { createdAt, applicationService, action, type } =
                  item || {};

                let title;
                if (type === "application") {
                  if (action === "createApplication")
                    title = `${formattedTitle(applicationService)} ${t(
                      "notif_application_submitted"
                    )}`;

                  if (action === "rejectApplicationFromFrontOffice")
                    title = `${t(
                      "notif_application_rejected_fo"
                    )} ${formattedTitle(applicationService)} ${t(
                      "is_rejected"
                    )}`;

                  if (action === "rejectApplicationFromBackOffice")
                    title = `${t(
                      "notif_application_rejected_bo"
                    )} ${formattedTitle(applicationService)} ${t(
                      "is_rejected_bo"
                    )}`;

                  if (action === "approveApplicationFromBackOffice")
                    title = `${t(
                      "notif_application_approved_bo"
                    )} ${formattedTitle(applicationService)} ${t(
                      "is_completed"
                    )}`;
                }
                if (type === "appointment") {
                  if (action === "createAppointment")
                    title = `${t(
                      "notif_appointment_submitted"
                    )} ${formattedTitle(applicationService)} ${t(
                      "is_appointment_submitted"
                    )}`;

                  if (action === "approveAppointment")
                    title = `${t(
                      "notif_appointment_approved_fo"
                    )} ${formattedTitle(applicationService)} ${t(
                      "is_approved"
                    )}`;

                  if (action === "rejectAppointment")
                    title = `${t(
                      "notif_appointment_rejected_bo"
                    )} ${formattedTitle(applicationService)} ${t(
                      "is_choose_another_time"
                    )}`;
                }
                return (
                  <div
                    key={j}
                    className="border-b-[1px] px-[8px] py-[12px] flex flex-row"
                  >
                    <div className="flex-1">{title}</div>
                    <div className="items-end  text-end">
                      {extractTime(createdAt)}
                    </div>
                  </div>
                );
              })}
          </>
        ))}
      </div>
    </div>
  );
}

export default Notification;
