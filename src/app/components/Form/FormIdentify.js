import React, { useEffect, useState } from "react";
import InputDropdown from "../TagComponents/InputDropdown";
import DatePicker from "../TagComponents/DatePicker";
import { useDispatch, useSelector } from "react-redux";
import {
  getRegionCountry,
  getRegionMunicipality,
  getRegionPostAdministrative,
  getRegionSucos,
} from "@/app/store/actions/regionAction";
import Loader from "../Loader";
import {
  getUser,
  getUserInformation,
  savePersonalInformation,
} from "@/app/store/actions/userAction";

function FormIdentify({ onClick }) {
  const { user, profile, personalInformation } = useSelector(
    (state) => state.userReducer
  );

  const { region, municipality, city, town, loading } = useSelector(
    (state) => state.regionReducer
  );

  const [input, setInput] = useState({});
  const { personalDetail, residenceDetail, birthDetail } = profile || {};
  console.log("profile:", profile);

  const { dateOfBirth } = birthDetail || {};
  const { countryCode, municipalityCode, postAdministrativeCode, sucosCode } =
    residenceDetail || {};

  const { firstName, email, lastName, identityNumber, identityType, gender } =
    personalDetail || {};

  console.log("dateOfBirth:", dateOfBirth);
  const handleChangeSelect = (e) => {
    const { name, value } = e;
    setInput({
      ...input,
      [name]: value,
    });
  };

  useEffect(() => {
    setInput((prevInput) => ({
      ...prevInput,
      DateOfBirth: dateOfBirth && formattedDate(dateOfBirth),
      FirstName: firstName,
      LastName: lastName,
      IdentityNumber: identityNumber,
      region: countryCode,
      IdentityType: identityType,
      Gender: gender,
      town: sucosCode,
      municipality: municipalityCode,
      city: postAdministrativeCode,
    }));
  }, [
    sucosCode,
    municipalityCode,
    postAdministrativeCode,
    countryCode,
    dateOfBirth,
  ]);

  const isDisabled =
    !input.FirstName ||
    !input.LastName ||
    !input.Gender ||
    !input.IdentityType ||
    !input.IdentityNumber ||
    !input.DateOfBirth ||
    !input.town;

  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = () => {
      if (user?.status === "Active") {
        dispatch(getUserInformation(user?.accessToken));
        dispatch(getRegionCountry(user?.accessToken));
        dispatch(getRegionMunicipality(user?.accessToken));
        if (input.municipality || municipalityCode) {
          dispatch(
            getRegionPostAdministrative(
              user?.accessToken,
              `municipalityCode=${input.municipality || municipalityCode}`
            )
          );
        }
        if (input.city || postAdministrativeCode) {
          dispatch(
            getRegionSucos(
              user?.accessToken,
              `postAdministrativeCode=${input.city || postAdministrativeCode}`
            )
          );
        }
      }
    };

    fetchData();
  }, [
    user,
    dispatch,
    input.municipality,
    input.city,
    countryCode,
    municipalityCode,
    sucosCode,
    postAdministrativeCode,
  ]);

  const formattedDate = (dateOfBirth) => {
    const date = new Date(dateOfBirth);

    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    const formattedMonth = !isNaN(month)
      ? month.toString().padStart(2, "0")
      : "01";
    const formattedDay = !isNaN(day) ? day.toString().padStart(2, "0") : "01";
    const formattedYear = !isNaN(year) ? year.toString() : "2024";
    const formattedDate = `${formattedYear}-${formattedMonth}-${formattedDay}`;

    return formattedDate;
  };

  useEffect(() => {
    dispatch(getUser());
  }, []);

  useEffect(() => {
    if (personalInformation) {
      onClick();
    }
  }, [personalInformation]);

  const genderForm = [
    { name: "Male", code: "Male" },
    { name: "Female", code: "Female" },
  ];
  const identityTypeForm = [
    { name: "Citizen Card", code: "CitizenCard" },
    { name: "Passport", code: "Passport" },
  ];

  return (
    <>
      {loading && <Loader />}

      <div className="">
        <div>
          <h1 className="text-[28px] font-semibold text-[#2E2D2D] mb-5">
            {personalDetail?.firstName ? "Profile" : "Identify"}
          </h1>
          {!personalDetail?.firstName && (
            <p className="text-[#646464] text-[16px] mb-10">
              please to complete your personal data for account completion.
            </p>
          )}
        </div>
        <div className="flex flex-col gap-6 mb-10">
          <div className="grid grid-cols-2 gap-10">
            <div className="flex flex-col">
              <label className="text-label">First Name</label>
              <input
                type="text"
                className="text-input text-black placeholder-gray-400"
                placeholder="First Name"
                value={input.FirstName}
                name="FirstName"
                onChange={(e) => handleChangeSelect(e.target)}
              />
            </div>
            <div className="flex flex-col">
              <label className="text-label">Last Name</label>
              <input
                type="text"
                className="text-input text-black placeholder-gray-400"
                placeholder={"Last Name"}
                value={input.LastName}
                name="LastName"
                onChange={(e) => handleChangeSelect(e.target)}
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-10">
            <InputDropdown
              label={"Gender"}
              topic={genderForm}
              name="Gender"
              handleChange={(e) => handleChangeSelect(e)}
              selectedTopic={input.Gender}
            />
            <InputDropdown
              label={"Identity Type"}
              topic={identityTypeForm}
              name="IdentityType"
              handleChange={(e) => handleChangeSelect(e)}
              selectedTopic={input.IdentityType}
            />
          </div>
          <div className="grid grid-cols-2 gap-10">
            <div className="flex flex-col">
              <label className="text-label">Identity Number</label>
              <input
                type="number"
                className="text-input text-black placeholder-gray-400"
                placeholder="Identify Number"
                name="IdentityNumber"
                value={input.IdentityNumber}
                onChange={(e) => handleChangeSelect(e.target)}
                style={{ WebkitAppearance: "none", MozAppearance: "textfield" }}
              />
            </div>
            <DatePicker
              handleChange={(e) => handleChangeSelect(e.target)}
              name="DateOfBirth"
              value={input?.DateOfBirth}
            />
          </div>
        </div>
        <div>
          <h1 className="text-[18px] font-semibold text-[#2E2D2D] mb-8">
            Place of birth
          </h1>
          <div className="flex flex-col gap-6 mb-16">
            <div className="grid grid-cols-2 gap-10">
              <InputDropdown
                label={"Country"}
                topic={region}
                handleChange={(e) => handleChangeSelect(e)}
                name="region"
                selectedTopic={input?.region}
              />
              <InputDropdown
                label={"State"}
                topic={municipality}
                isDisabled={!input.region && !countryCode}
                handleChange={(e) => handleChangeSelect(e)}
                name="municipality"
                selectedTopic={input?.municipality}
              />
            </div>
            <div className="grid grid-cols-2 gap-10">
              <InputDropdown
                label={"City"}
                topic={city}
                handleChange={(e) => handleChangeSelect(e)}
                name="city"
                isDisabled={!input.municipality && !postAdministrativeCode}
                selectedTopic={input?.city}
              />
              <InputDropdown
                label={"Town"}
                topic={town}
                handleChange={(e) => handleChangeSelect(e)}
                name="town"
                isDisabled={!input.city && !postAdministrativeCode}
                selectedTopic={input.town}
              />
            </div>
          </div>
        </div>
        <button
          disabled={isDisabled}
          className={`${
            isDisabled ? "bg-[#DCDCDC] cursor-not-allowed" : "bg-[#1C25E7] "
          } py-4 px-32 text-[#F3F3F3] flex m-auto rounded-[8px]`}
          onClick={() => {
            const filteredInput = {
              FirstName: input.FirstName,
              LastName: input.LastName,
              Gender: input.Gender,
              IdentityType: input.IdentityType,
              IdentityNumber: input.IdentityNumber,
              DateOfBirth: input.DateOfBirth,
              PlaceOfBirthCode: input.town,
            };
            dispatch(savePersonalInformation(filteredInput));

            onClick();
          }}
        >
          {personalDetail?.firstName ? "Update Profile" : "Continue"}
        </button>
      </div>
    </>
  );
}

export default FormIdentify;
