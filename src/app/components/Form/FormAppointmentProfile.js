"use client";

import React, { useEffect, useState } from "react";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";
import InputDropdown from "../TagComponents/InputDropdown";
import { useDispatch, useSelector } from "react-redux";
import FormOtpAppointment from "../Modal/FormOtpAppointment";
import { requestOtp } from "@/app/store/actions/userAction";
import Loader from "../Loader";
import { toast } from "sonner";
import useLanguage from "@/app/useLanguage";

function FormAppointmentProfile() {
  const user = useAuthUser();
  const dispatch = useDispatch();
  const { appointmentData } = useSelector((state) => state.appointmentReducer);
  console.log("appointmentData:", appointmentData);

  const [isShowModal, setIsShowModal] = useState(false);
  const [input, setInput] = useState({});
  const [isDisabledButton, setIsDisabledButton] = useState(true);
  const { t } = useLanguage();
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

  const identityTypeForm = [
    { name: "citizenCard", code: "citizenCard", id: 1 },
    { name: "passport", code: "passport", id: 2 },
  ];

  const [validPhoneNumber, setValidPhoneNumber] = useState(true);

  const validatePhoneNumber = (phoneNumber) => {
    const regexPhoneNumber = /^\+[1-9]\d{1,14}$/;
    return regexPhoneNumber.test(phoneNumber);
  };

  const handleChangeSelect = (e) => {
    const { name, value } = e;
    setInput({
      ...input,
      [name]: value,
    });

    if (name === "phoneNumber") {
      setValidPhoneNumber(validatePhoneNumber(value));
    }
  };

  useEffect(() => {});

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
    if (
      !input.firstName ||
      !input.lastName ||
      !input.identityNumber ||
      !input.identityType ||
      !input.email ||
      !validPhoneNumber
    )
      setIsDisabledButton(true);
    else setIsDisabledButton(false);
  }, [input, validPhoneNumber]);

  useEffect(() => {
    if (isShowModal) form_otp_appointment.showModal();
  }, [isShowModal]);

  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-2 my-10 gap-x-10">
        {loading && <Loader />}
        <div>
          <h1 className="text-[28px] text-[#2E2D2D] font-semibold mb-2">
            {t("your_profile")}
          </h1>
          <p className="text-[16px] text-[#646464] lg:mb-0 mb-10">
            {t("your_profile_desc")}
          </p>
        </div>
        <div className="flex flex-col gap-5">
          <div className="flex flex-col">
            <label className="text-label"> {t("first_name")}</label>
            <input
              disabled={isDisabled}
              type="text"
              className={`text-input text-black placeholder-gray-400 ${
                isDisabled && "cursor-not-allowed"
              }`}
              placeholder={t("first_name")}
              value={input.firstName}
              name="firstName"
              onChange={(e) => handleChangeSelect(e.target)}
            />
          </div>
          <div className="flex flex-col">
            <label className="text-label">{t("last_name")}</label>
            <input
              disabled={isDisabled}
              type="text"
              className={`text-input text-black placeholder-gray-400 ${
                isDisabled && "cursor-not-allowed"
              }`}
              placeholder={t("last_name")}
              value={input.lastName}
              name="lastName"
              onChange={(e) => handleChangeSelect(e.target)}
            />
          </div>
          <InputDropdown
            isDisabled={isDisabled}
            label={t("identity_type")}
            topic={identityTypeForm}
            name="identityType"
            handleChange={(e) => handleChangeSelect(e)}
            selectedTopic={input.identityType}
          />
          <div className="flex flex-col">
            <label className="text-label">{t("identity_number")}</label>
            <input
              disabled={isDisabled}
              type="number"
              className={`text-input text-black placeholder-gray-400 number-to-text ${
                isDisabled && "cursor-not-allowed"
              }`}
              placeholder={t("identity_number")}
              name="identityNumber"
              value={input.identityNumber}
              onChange={(e) => handleChangeSelect(e.target)}
              style={{ WebkitAppearance: "none", MozAppearance: "textfield" }}
            />
          </div>
          <div className="flex flex-col">
            <label className="text-label">{t("email")}</label>
            <input
              disabled={isDisabled}
              type="email"
              className={`text-input text-black placeholder-gray-400 ${
                isDisabled && "cursor-not-allowed"
              }`}
              placeholder={t("email")}
              value={input.email}
              name="email"
              onChange={(e) => handleChangeSelect(e.target)}
            />
          </div>
          <div className="flex flex-col">
            <label className="text-label">{t("phone_number")}</label>
            <input
              disabled={isDisabled}
              type="text"
              className={`text-input text-black placeholder-gray-400 ${
                isDisabled && "cursor-not-allowed"
              }`}
              placeholder={t("phone_number")}
              value={input.phoneNumber}
              name="phoneNumber"
              onChange={(e) => handleChangeSelect(e.target)}
            />
            {!validPhoneNumber && (
              <p className="text-[12px] text-red-500">
                {t("phone_number_error_hint")}
              </p>
            )}
          </div>
          <button
            disabled={isDisabledButton}
            className={`${
              isDisabledButton
                ? "bg-[#DCDCDC] cursor-not-allowed"
                : "bg-[#1C25E7]"
            }  px-3 py-4 text-[#F3F3F3] rounded-lg max-w-full mt-5 font-semibold`}
            onClick={() => {
              setData({
                ...appointmentData,
                firstName: input.firstName,
                lastName: input.lastName,
                identityType: input.identityType,
                identityNumber: input.identityNumber,
                email: input.email,
                phoneNumber: input.phoneNumber,
              });

              setIsShowModal(false);
              if (!user) {
                dispatch(requestOtp(input.phoneNumber))
                  .then(() => setIsShowModal(true))
                  .catch((err) => {
                    console.log(err);
                    toast.error(err.response.data.errorMessage);
                  });
              } else
                dispatch(requestOtp(personalDetail?.phoneNumber))
                  .then(() => setIsShowModal(true))
                  .catch((err) => {
                    console.log(err);
                    toast.error(err.response.data.errorMessage);
                  });
            }}
          >
            {t("submit")}
          </button>
        </div>
      </div>
      {isShowModal && <FormOtpAppointment data={data} />}
    </>
  );
}

export default FormAppointmentProfile;
