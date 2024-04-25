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
  getUserInformation,
  savePersonalInformation,
} from "@/app/store/actions/userAction";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";
import { formattedDate } from "@/app/universalFunction";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import useLanguage from "@/app/useLanguage";

function FormIdentify({ onClick }) {
  const user = useAuthUser();
  const dispatch = useDispatch();
  // const router = useRouter();
  const { t } = useLanguage();
  const { profile } = useSelector((state) => state.userReducer);
  const { region, municipality, city, town, loading } = useSelector(
    (state) => state.regionReducer
  );

  const [input, setInput] = useState({});
  const { personalDetail, birthDetail } = profile || {};

  const { dateOfBirth, subDistrictId, countryCode, districtCode, stateCode } =
    birthDetail || {};

  const { firstName, lastName, identityNumber, identityType, gender } =
    personalDetail || {};

  const handleChangeSelect = (e) => {
    const { name, value } = e;
    setInput({
      ...input,
      [name]: value,
    });
  };

  useEffect(() => {
    if (firstName !== "")
      setInput((prevInput) => ({
        ...prevInput,
        DateOfBirth: dateOfBirth && formattedDate(dateOfBirth),
        FirstName: firstName,
        LastName: lastName,
        IdentityNumber: identityNumber,
        region: countryCode,
        IdentityType: identityType,
        Gender: gender,
        town: subDistrictId,
        municipality: stateCode,
        city: districtCode,
      }));
  }, [stateCode, districtCode, subDistrictId, countryCode, dateOfBirth]);

  const isDisabled =
    !input.FirstName ||
    !input.LastName ||
    !input.Gender ||
    !input.IdentityType ||
    !input.IdentityNumber ||
    !input.DateOfBirth ||
    !input.town;

  useEffect(() => {
    const fetchData = () => {
      dispatch(getUserInformation(user?.accessToken));
      dispatch(getRegionCountry(user?.accessToken));
      dispatch(getRegionMunicipality(user?.accessToken));
      if (input.municipality || stateCode) {
        dispatch(
          getRegionPostAdministrative(
            user?.accessToken,
            `stateCode=${input.municipality || stateCode}`
          )
        );
      }
      if (input.city || districtCode) {
        dispatch(
          getRegionSucos(
            user?.accessToken,
            `districtCode=${input.city || districtCode}`
          )
        );
      }
    };

    fetchData();
  }, [
    user,
    dispatch,
    input.municipality,
    input.city,
    countryCode,
    districtCode,
    stateCode,
    subDistrictId,
  ]);

  const genderForm = [
    { name: "male", code: "male", id: 1 },
    { name: "female", code: "female", id: 2 },
  ];
  const identityTypeForm = [
    { name: "citizenCard", code: "citizenCard", id: 1 },
    { name: "passport", code: "passport", id: 2 },
  ];

  return (
    <>
      {loading && <Loader />}
      <div>
        <h1 className="lg:text-[28px] text-[24px] font-semibold text-[#2E2D2D] mb-5">
          {personalDetail?.firstName ? t("profile") : t("identity")}
        </h1>
        {!personalDetail?.firstName && (
          <p className="text-[#646464] text-[16px] mb-10 capitalize">
            {t("personal_desc")}
          </p>
        )}
      </div>
      <div className="flex flex-col gap-6 mb-10">
        <div className="grid lg:grid-cols-2 grid-cols-1 lg:gap-10 gap-5">
          <div className="flex flex-col">
            <label className="text-label">{t("first_name")}</label>
            <input
              type="text"
              className="text-input text-black placeholder-gray-400"
              placeholder={t("first_name")}
              value={input.FirstName}
              name="FirstName"
              onChange={(e) => handleChangeSelect(e.target)}
            />
          </div>
          <div className="flex flex-col">
            <label className="text-label">{t("last_name")}</label>
            <input
              type="text"
              className="text-input text-black placeholder-gray-400"
              placeholder={t("last_name")}
              value={input.LastName}
              name="LastName"
              onChange={(e) => handleChangeSelect(e.target)}
            />
          </div>
        </div>
        <div className="grid lg:grid-cols-2 grid-cols-1 lg:gap-10 gap-5">
          <InputDropdown
            label={t("gender")}
            topic={genderForm}
            name="Gender"
            handleChange={(e) => handleChangeSelect(e)}
            selectedTopic={input.Gender}
          />
          <InputDropdown
            label={t("identity_type")}
            topic={identityTypeForm}
            name="IdentityType"
            handleChange={(e) => handleChangeSelect(e)}
            selectedTopic={input.IdentityType}
          />
        </div>
        <div className="grid lg:grid-cols-2 grid-cols-1 lg:gap-10 gap-5">
          <div className="flex flex-col">
            <label className="text-label">{t("identity_number")}</label>
            <input
              type="number"
              className="text-input text-black placeholder-gray-400 number-to-text"
              placeholder={t("identity_number")}
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
          {t("place_of_birth")}
        </h1>
        <div className="flex flex-col gap-6 mb-16">
          <div className="grid lg:grid-cols-2 grid-cols-1 lg:gap-10 gap-5">
            <InputDropdown
              label={t("country")}
              topic={region}
              handleChange={(e) => handleChangeSelect(e)}
              name="region"
              selectedTopic={input?.region}
            />
            <InputDropdown
              label={t("state")}
              topic={municipality}
              isDisabled={!input.region && !countryCode}
              handleChange={(e) => handleChangeSelect(e)}
              name="municipality"
              selectedTopic={input?.municipality}
            />
          </div>
          <div className="grid lg:grid-cols-2 grid-cols-1 lg:gap-10 gap-5">
            <InputDropdown
              label={t("city")}
              topic={city}
              handleChange={(e) => handleChangeSelect(e)}
              name="city"
              isDisabled={!input.municipality && !stateCode}
              selectedTopic={input?.city}
            />
            <InputDropdown
              label={t("town")}
              topic={town}
              handleChange={(e) => handleChangeSelect(e)}
              name="town"
              isDisabled={!input.city && !stateCode}
              selectedTopic={input.town}
            />
          </div>
        </div>
      </div>
      <button
        disabled={isDisabled}
        className={`${
          isDisabled ? "bg-[#DCDCDC] cursor-not-allowed" : "bg-[#1C25E7] "
        } py-4 lg:px-32 text-[#F3F3F3] flex m-auto rounded-[8px] lg:w-fit w-full text-center items-center justify-center  `}
        onClick={() => {
          const filteredInput = {
            FirstName: input.FirstName,
            LastName: input.LastName,
            Gender: input.Gender,
            IdentityType: input.IdentityType,
            IdentityNumber: input.IdentityNumber,
            DateOfBirth: input.DateOfBirth,
            PlaceOfBirthId: input.town,
          };
          dispatch(savePersonalInformation(filteredInput));
          onClick();
        }}
      >
        {personalDetail?.firstName
          ? t("update_profile_cta")
          : t("txt_continue")}
      </button>
    </>
  );
}

export default FormIdentify;
