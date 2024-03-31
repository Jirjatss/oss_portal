"use client";

import React, { useEffect, useState } from "react";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";
import { useDispatch, useSelector } from "react-redux";
import { getRegionMunicipality } from "@/app/store/actions/regionAction";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import { appointmentDateFormatter } from "@/app/universalFunction";
import { setAppointmentData } from "@/app/store/actions/appointmentAction";

function FormSetDate({ onContinue }) {
  const user = useAuthUser();
  const dispatch = useDispatch();
  const { appointmentData } = useSelector((state) => state.appointmentReducer);
  const [selectedDate, setSelectedDate] = useState(null);

  const minDate = new AdapterDayjs().dayjs();

  const isDisabled = !selectedDate;
  const handleChangeDate = (date) => {
    setSelectedDate(date);
  };

  useEffect(() => {
    if (user) {
      dispatch(getRegionMunicipality(user?.accessToken));
    }
  }, [dispatch, user]);

  return (
    <div className="grid grid-cols-2 my-10 gap-x-10">
      <div>
        <h1 className="text-[28px] text-[#2E2D2D] font-semibold mb-2">
          Select Date
        </h1>
        <p className="text-[16px] text-[#646464]">
          Please note, there’s a limit of 100 appointments per day. If today is
          fully booked, you can choose another available day and time. Once
          submitted, you’ll receive a schedule confirmation from the officer.
        </p>
      </div>
      <div className="flex flex-col gap-5">
        <LocalizationProvider dateAdapter={AdapterDayjs} locale="pt">
          <DateCalendar
            value={selectedDate}
            onChange={handleChangeDate}
            minDate={minDate}
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
            dispatch(
              setAppointmentData({
                ...appointmentData,
                scheduledAt: appointmentDateFormatter(selectedDate.$d),
              })
            );
            onContinue();
          }}
        >
          Continue
        </button>
      </div>
    </div>
  );
}

export default FormSetDate;
