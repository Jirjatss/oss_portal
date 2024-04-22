"use client";

import React, { useEffect, useState } from "react";
import { isSameDay } from "date-fns";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";
import { useDispatch, useSelector } from "react-redux";
import { getRegionMunicipality } from "@/app/store/actions/regionAction";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import { appointmentDateFormatter } from "@/app/universalFunction";
import {
  rescheduleAppointment,
  setAppointmentData,
} from "@/app/store/actions/appointmentAction";
import { useRouter, useSearchParams } from "next/navigation";
import axios from "axios";
import Loader from "../Loader";

function FormSetDate({ onContinue }) {
  const user = useAuthUser();
  const dispatch = useDispatch();
  const searchParams = useSearchParams();
  const appointmentId = searchParams.get("appointmentId");
  console.log("appointmentId:", appointmentId);
  const { appointmentData } = useSelector((state) => state.appointmentReducer);
  const { loading } = useSelector((state) => state.userReducer);
  const [selectedDate, setSelectedDate] = useState(null);
  const [disabledDate, setIsDisabledDate] = useState(null);
  const router = useRouter();
  const minDate = new AdapterDayjs().dayjs();

  const isDisabled = !selectedDate;
  const handleChangeDate = (date) => {
    setSelectedDate(date);
  };

  const getDetailAppointment = async () => {
    try {
      const { data } = await axios({
        url: `https://api.ardhiansyah.com/appointments/${appointmentId}`,
        headers: {
          Authorization: `Bearer ${user?.accessToken}`,
        },
      });
      // console.log(data.data.scheduledAt);
      setIsDisabledDate(data.data.scheduledAt);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (appointmentId) {
      getDetailAppointment();
    }
  }, [appointmentId]);

  useEffect(() => {
    if (user) {
      dispatch(getRegionMunicipality(user?.accessToken));
    }
  }, [dispatch, user]);

  const isDisabledDate = (date) => {
    if (typeof disabledDate === "string") {
      const selectedDateString = date.toISOString().split("T")[0];
      const disabledDateString = disabledDate.split("T")[0];

      return selectedDateString === disabledDateString;
    }
    return false;
  };

  return (
    <>
      {loading && <Loader />}

      <div className="grid lg:grid-cols-2 grid-cols-1 my-10 gap-x-10">
        <div>
          <h1 className="lg:text-[28px] text-[24px] text-[#2E2D2D] font-semibold mb-2">
            Select Date
          </h1>
          <p className="text-[16px] text-[#646464]  lg:mb-0 mb-10">
            Please note, there’s a limit of 100 appointments per day. If today
            is fully booked, you can choose another available day and time. Once
            submitted, you’ll receive a schedule confirmation from the officer.
          </p>
        </div>
        <div className="flex flex-col gap-5">
          <LocalizationProvider dateAdapter={AdapterDayjs} locale="pt">
            <DateCalendar
              value={selectedDate}
              onChange={handleChangeDate}
              minDate={minDate}
              shouldDisableDate={isDisabledDate}
              className="w-full"
              sx={{
                [`& .MuiPickersFadeTransitionGroup-root`]: {
                  width: "100%",
                  zIndex: 0,
                },
                [`& .MuiDayCalendar-weekContainer, & .MuiDayCalendar-header`]: {
                  justifyContent: "space-between",
                  display: "flex",
                  zIndex: 10,
                },
                [`& .MuiPickersCalendarHeader-root `]: {
                  width: "105%",
                  marginLeft: "-2%",
                  justifyContent: "space-between",
                  display: "flex",
                  zIndex: 10,
                },
              }}
            />
          </LocalizationProvider>
          <button
            disabled={isDisabled}
            className={`${
              isDisabled ? "bg-[#DCDCDC] cursor-not-allowed" : "bg-[#1C25E7]"
            }  px-3 py-4 text-[#F3F3F3] rounded-lg w-full mt-1 font-semibold`}
            onClick={() => {
              if (appointmentId) {
                dispatch(
                  rescheduleAppointment(
                    appointmentId,
                    { scheduledAt: appointmentDateFormatter(selectedDate.$d) },
                    user?.accessToken
                  )
                ).then(() => appointment_success.showModal());
              } else {
                dispatch(
                  setAppointmentData({
                    ...appointmentData,
                    scheduledAt: appointmentDateFormatter(selectedDate.$d),
                  })
                );
                onContinue();
              }
            }}
          >
            {appointmentId ? "Submit" : "Continue"}
          </button>
        </div>
      </div>
    </>
  );
}

export default FormSetDate;
