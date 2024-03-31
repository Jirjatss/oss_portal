"use client";
import React, { useEffect, useState } from "react";
import InputDropdown from "../TagComponents/InputDropdown";
import { useDispatch, useSelector } from "react-redux";
import {
  getRegionCountry,
  getRegionMunicipality,
  getRegionPostAdministrative,
  getRegionSucos,
} from "@/app/store/actions/regionAction";
import {
  getUserInformation,
  savePersonalInformation,
} from "@/app/store/actions/userAction";
import { LOADING_FALSE } from "@/app/store/actions/action_type";
import Loader from "../Loader";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";

function FormContact({ onClick }) {
  const user = useAuthUser();
  const dispatch = useDispatch();
  const [input, setInput] = useState({});

  const { personalInformation, profile } = useSelector(
    (state) => state.userReducer
  );
  const { region, municipality, city, town, loading } = useSelector(
    (state) => state.regionReducer
  );

  const isDisabled = !input.address || !input.town;
  const { personalDetail } = profile || {};
  const { email, phoneNumber } = personalDetail || {};

  const handleChangeSelect = (e) => {
    const { name, value } = e;
    setInput({
      ...input,
      [name]: value,
    });
  };

  useEffect(() => {
    const scrollToTop = () => {
      const scrollStep = -window.scrollY / (500 / 15);
      const scrollInterval = setInterval(() => {
        if (window.scrollY !== 0) {
          window.scrollBy(0, scrollStep);
        } else {
          clearInterval(scrollInterval);
        }
      }, 15);
    };
    scrollToTop();
    return () => {};
  }, []);

  useEffect(() => {
    setTimeout(() => {
      dispatch({
        type: LOADING_FALSE,
      });
      dispatch(getUserInformation(user?.accessToken));
    }, 500);
  }, []);

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

  return (
    <>
      {loading && <Loader />}
      <div>
        <h1 className="text-[28px] font-semibold text-[#2E2D2D] mb-2">
          Contact and Residance
        </h1>
        <p className="text-[#646464] text-[16px] mb-10">
          please to complete your personal data for account completion.
        </p>
      </div>
      <div className="grid grid-cols-2 gap-10 mb-10">
        <div className="flex flex-col">
          <label className="text-label">Email</label>
          <input
            disabled
            type="email"
            className="text-input text-black placeholder-gray-400 cursor-not-allowed"
            placeholder="Email"
            value={email}
            name="email"
          />
        </div>
        <div className="flex flex-col">
          <label className="text-label">Phone Number</label>
          <input
            disabled
            type="text"
            className="text-input text-black placeholder-gray-400 cursor-not-allowed"
            placeholder="Phone Number"
            value={phoneNumber}
            name="phoneNumber"
          />
        </div>
      </div>
      <div>
        <h1 className="text-[18px] font-semibold text-[#2E2D2D] mb-8">
          Local Residence
        </h1>
        <div className="flex flex-col gap-6 mb-16">
          <div className="grid grid-cols-2 gap-10">
            <div className="flex flex-col">
              <label className="text-label">Address</label>
              <input
                type="text"
                className="text-input text-black placeholder-gray-400"
                placeholder="Address"
                name="address"
                onChange={(e) => handleChangeSelect(e.target)}
              />
            </div>
          </div>
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
        disabled={isDisabled}
        className={`${
          isDisabled ? "bg-[#DCDCDC] cursor-not-allowed" : "bg-[#1C25E7] "
        } py-4 px-32 text-[#F3F3F3] flex m-auto rounded-[8px]`}
        onClick={() => {
          dispatch(
            savePersonalInformation({
              ...personalInformation,
              Address: input.address,
              ResidenceCode: input.town,
            })
          );
          onClick();
        }}
      >
        Continue
      </button>
    </>
  );
}

export default FormContact;
