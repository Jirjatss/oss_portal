"use client";

import React, { useEffect, useState } from "react";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";
import InputDropdown from "../TagComponents/InputDropdown";
import { useDispatch, useSelector } from "react-redux";
import { setAppointmentData } from "@/app/store/actions/appointmentAction";
import FormOtpAppointment from "../Modal/FormOtpAppointment";
import { requestOtp } from "@/app/store/actions/userAction";
import Loader from "../Loader";

function FormAppointmentProfile() {
  const user = useAuthUser();
  const dispatch = useDispatch();
  const { appointmentData } = useSelector((state) => state.appointmentReducer);
  const [isShowModal, setIsShowModal] = useState(false);
  const [input, setInput] = useState({});
  const isDisabledButton =
    !input.firstName ||
    !input.lastName ||
    !input.identityNumber ||
    !input.identityType ||
    !input.email ||
    !input.phoneNumber;

  const isDisabled = user;
  const [data, setData] = useState({});
  const { profile, loading } = useSelector((state) => state.userReducer);
  const { personalDetail } = profile || {};
  const {
    firstName,
    lastName,
    identityNumber,
    identityType,
    phoneNumber,
    email,
  } = personalDetail || {};
  console.log("personalDetail:", personalDetail);

  const identityTypeForm = [
    { name: "Citizen Card", code: "citizenCard" },
    { name: "Passport", code: "passport" },
  ];

  const handleChangeSelect = (e) => {
    const { name, value } = e;
    setInput({
      ...input,
      [name]: value,
    });
  };

  useEffect(() => {
    if (user)
      setInput((prevInput) => ({
        ...prevInput,
        firstName: firstName,
        lastName: lastName,
        identityNumber: identityNumber,
        identityType: identityType,
        phoneNumber: phoneNumber,
        email: email,
      }));
  }, [
    firstName,
    email,
    identityNumber,
    lastName,
    identityType,
    user,
    phoneNumber,
  ]);

  useEffect(() => {
    if (isShowModal) form_otp_appointment.showModal();
  }, [isShowModal]);

  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-2 my-10 gap-x-10">
        {loading && <Loader />}
        <div>
          <h1 className="text-[28px] text-[#2E2D2D] font-semibold mb-2">
            Your Profile
          </h1>
          <p className="text-[16px] text-[#646464] lg:mb-0 mb-10">
            Completing your profile will assist officers in accurately tracking
            your attendance. Please ensure your profile is up-to-date.
          </p>
        </div>
        <div className="flex flex-col gap-5">
          <div className="flex flex-col">
            <label className="text-label">First Name</label>
            <input
              disabled={isDisabled}
              type="text"
              className={`text-input text-black placeholder-gray-400 ${
                isDisabled && "cursor-not-allowed"
              }`}
              placeholder="First Name"
              value={input.firstName}
              name="firstName"
              onChange={(e) => handleChangeSelect(e.target)}
            />
          </div>
          <div className="flex flex-col">
            <label className="text-label">Last Name</label>
            <input
              disabled={isDisabled}
              type="text"
              className={`text-input text-black placeholder-gray-400 ${
                isDisabled && "cursor-not-allowed"
              }`}
              placeholder={"Last Name"}
              value={input.lastName}
              name="lastName"
              onChange={(e) => handleChangeSelect(e.target)}
            />
          </div>
          <InputDropdown
            isDisabled={isDisabled}
            label={"Identity Type"}
            topic={identityTypeForm}
            name="identityType"
            handleChange={(e) => handleChangeSelect(e)}
            selectedTopic={input.identityType}
          />
          <div className="flex flex-col">
            <label className="text-label">Identity Number</label>
            <input
              disabled={isDisabled}
              type="number"
              className={`text-input text-black placeholder-gray-400 number-to-text ${
                isDisabled && "cursor-not-allowed"
              }`}
              placeholder="Identify Number"
              name="identityNumber"
              value={input.identityNumber}
              onChange={(e) => handleChangeSelect(e.target)}
              style={{ WebkitAppearance: "none", MozAppearance: "textfield" }}
            />
          </div>
          <div className="flex flex-col">
            <label className="text-label">Email</label>
            <input
              disabled={isDisabled}
              type="email"
              className={`text-input text-black placeholder-gray-400 ${
                isDisabled && "cursor-not-allowed"
              }`}
              placeholder="email"
              value={input.email}
              name="email"
              onChange={(e) => handleChangeSelect(e.target)}
            />
          </div>
          <div className="flex flex-col">
            <label className="text-label">Phone Number</label>
            <input
              disabled={isDisabled}
              type="text"
              className={`text-input text-black placeholder-gray-400 ${
                isDisabled && "cursor-not-allowed"
              }`}
              placeholder="Phone Number"
              value={input.phoneNumber}
              name="phoneNumber"
            />
          </div>
          <button
            disabled={isDisabledButton}
            className={`${
              isDisabledButton
                ? "bg-[#DCDCDC] cursor-not-allowed"
                : "bg-[#1C25E7]"
            }  px-3 py-4 text-[#F3F3F3] rounded-lg max-w-full mt-5 font-semibold`}
            onClick={() => {
              if (user) {
                setData({
                  ...appointmentData,
                });
              } else {
                setData({
                  ...appointmentData,
                  firstName: input.firstName,
                  lastName: input.lastName,
                  identityType: input.identityType,
                  identityNumber: input.identityNumber,
                  email: input.email,
                  phoneNumber: input.phoneNumber,
                });
              }
              setIsShowModal(false);
              dispatch(requestOtp(personalDetail?.phoneNumber))
                .then(() => setIsShowModal(true))
                .catch((err) => {
                  console.log(err);
                  toast.error(err.response.data.errorMessage);
                });
            }}
          >
            Submit
          </button>
        </div>
      </div>
      {isShowModal && <FormOtpAppointment data={data} />}
    </>
  );
}

export default FormAppointmentProfile;
