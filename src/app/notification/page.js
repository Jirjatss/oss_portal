"use client";

import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { OSSIcons } from "../../../public/assets/icons/parent";
import useLanguage from "../useLanguage";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";
import axios from "axios";

function Notification() {
  const router = useRouter();
  const { t } = useLanguage();
  const user = useAuthUser();

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
    const formatter = new Intl.DateTimeFormat("en-US", options);
    const formattedDate = formatter.format(date);
    const [weekday, day, month, year] = formattedDate.split(" ");

    return `${weekday} ${month.replace(",", "")} ${day}  ${year}`;
  }

  useEffect(() => {
    if (user) getMyLog();
  }, []);

  const groupedByDate = groupByDate(data);
  console.log("groupedByDate:", groupedByDate);

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
        <div className="flex items-center">Mark as read</div>
      </div>
      <div className="flex flex-col gap-1 mt-3">
        {groupedByDate?.map((group, i) => (
          <>
            <p>{formatDate(group.date)}</p>
            <div key={i}>
              {group.items.map((item, j) => (
                <div key={j}></div>
              ))}
            </div>
          </>
        ))}
      </div>
    </div>
  );
}

export default Notification;
