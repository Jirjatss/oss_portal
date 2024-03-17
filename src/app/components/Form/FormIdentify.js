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

function FormIdentify({ onClick, isEditProfile = false }) {
  const { user } = useSelector((state) => state.userReducer);
  const [input, setInput] = useState({});

  const handleChangeSelect = (e) => {
    const { name, value } = e;
    setInput({
      ...input,
      [name]: value,
    });
  };

  useEffect(() => {
    console.log(input);
  }, [input]);

  const { region, municipality, city, town, loading } = useSelector(
    (state) => state.regionReducer
  );

  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = () => {
      if (user) {
        dispatch(getRegionCountry(user?.accessToken));
        dispatch(getRegionMunicipality(user?.accessToken));
      }
      if (input.municipality) {
        dispatch(
          getRegionPostAdministrative(
            user?.accessToken,
            `municipalityCode=${input.municipality}`
          )
        );
      }
      if (input.city) {
        dispatch(
          getRegionSucos(
            user?.accessToken,
            `postAdministrativeCode=${input.city}`
          )
        );
      }
    };

    fetchData();
  }, [user, dispatch, input.municipality, input.city]);

  const gender = [
    {
      name: "Male",
      code: "Male",
    },
    {
      name: "Female",
      code: "Female",
    },
  ];
  const identifyType = [
    { name: "Citizen Card", code: "CitizenCard" },
    { name: "Passport", code: "Passport" },
  ];

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="">
      <div>
        <h1 className="text-[28px] font-semibold text-[#2E2D2D] mb-5">
          {isEditProfile ? "Profile" : "Identify"}
        </h1>
        {!isEditProfile && (
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
              name="FirstName"
              onChange={(e) => handleChangeSelect(e.target)}
            />
          </div>
          <div className="flex flex-col">
            <label className="text-label">Last Name</label>
            <input
              type="text"
              className="text-input text-black placeholder-gray-400"
              placeholder="Last Name"
              name="LastName"
              onChange={(e) => handleChangeSelect(e.target)}
            />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-10">
          <InputDropdown
            label={"Gender"}
            topic={gender}
            name="Gender"
            handleChange={(e) => handleChangeSelect(e)}
            selectedTopic={input.Gender}
          />
          <InputDropdown
            label={"Identify Type"}
            topic={identifyType}
            name="IdentifyType"
            handleChange={(e) => handleChangeSelect(e)}
            selectedTopic={input.IdentifyType}
          />
        </div>
        <div className="grid grid-cols-2 gap-10">
          <div className="flex flex-col">
            <label className="text-label">Identity Number</label>
            <input
              type="number"
              className="text-input text-black placeholder-gray-400"
              placeholder="Identify Number"
              name="IdentifyNumber"
              onChange={(e) => handleChangeSelect(e.target)}
            />
          </div>
          <DatePicker
            handleChange={(e) => handleChangeSelect(e.target)}
            name="DateOfBirth"
            value={input.DateOfBirth}
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
              isDisabled={!input.region}
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
              isDisabled={!input.region && !input.municipality}
              selectedTopic={input?.city}
            />
            <InputDropdown
              label={"Town"}
              topic={town}
              handleChange={(e) => handleChangeSelect(e)}
              name="town"
              isDisabled={!input.region && !input.municipality && !input.city}
              selectedTopic={input?.town}
            />
          </div>
        </div>
      </div>
      <button
        className="bg-[#1C25E7] py-4 px-32 text-[#F3F3F3] flex m-auto rounded-[8px]"
        onClick={onClick}
      >
        {isEditProfile ? "Update Profile" : "Continue"}
      </button>
    </div>
  );
}

export default FormIdentify;
