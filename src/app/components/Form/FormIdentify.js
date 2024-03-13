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

  const { region, municipality, city, town, loading } = useSelector(
    (state) => state.regionReducer
  );

  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = () => {
      if (user) {
        dispatch(getRegionCountry(user?.accessToken));
        dispatch(getRegionMunicipality(user?.accessToken));
        dispatch(getRegionPostAdministrative(user?.accessToken));
        dispatch(getRegionSucos(user?.accessToken));
      }
    };

    fetchData();
  }, [user, dispatch]);

  const gender = [
    {
      topic: "Male",
    },
    {
      topic: "Female",
    },
  ];
  const identifyType = [{ topic: "Citizen Card" }, { topic: "Passport" }];
  const country = (region || []).map((e) => ({
    topic: e.name.replace("-", " "),
  }));
  const state = (municipality || []).map((e) => ({
    topic: e.name.replace("-", " "),
  }));

  const cityList = (city || []).map((e) => ({
    topic: e.name.replace("-", " "),
  }));

  const townList = (town || []).map((e) => ({
    topic: e.name.replace("-", " "),
  }));

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
              className="text-input text-black placeholder-[#646464]"
              placeholder="First Name"
            />
          </div>
          <div className="flex flex-col">
            <label className="text-label">Last Name</label>
            <input
              type="text"
              className="text-input text-black placeholder-[#646464]"
              placeholder="Last Name"
            />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-10">
          <InputDropdown label={"Gender"} topic={gender} />
          <InputDropdown label={"Identify Type"} topic={identifyType} />
        </div>
        <div className="grid grid-cols-2 gap-10">
          <div className="flex flex-col">
            <label className="text-label">Identity Number</label>
            <input
              type="number"
              className="text-input text-black placeholder-[#646464]"
              placeholder="Identify Number"
            />
          </div>
          <DatePicker />
        </div>
      </div>
      <div>
        <h1 className="text-[18px] font-semibold text-[#2E2D2D] mb-8">
          Place of birth
        </h1>
        <div className="flex flex-col gap-6 mb-16">
          <div className="grid grid-cols-2 gap-10">
            <InputDropdown label={"Country"} topic={country} />
            <InputDropdown label={"State"} topic={state} />
          </div>
          <div className="grid grid-cols-2 gap-10">
            <InputDropdown label={"City"} topic={cityList} />
            <InputDropdown label={"Town"} topic={townList} />
          </div>
          <div className="grid grid-cols-2 gap-10">
            <InputDropdown label={"Village"} topic={country} />
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
