"use client";

import { useEffect } from "react";
import * as HomeComponent from "./components/home/Index";
import { useDispatch, useSelector } from "react-redux";
import { getUser, getUserInformation } from "./store/actions/userAction";

export default function Home() {
  const dispatch = useDispatch();
  const { user, profile } = useSelector((state) => state.userReducer);

  useEffect(() => {
    dispatch(getUser());
  }, []);

  return (
    <div className="bg-white min-h-screen">
      {user ? (
        <div className="w-full  px-28 py-10 ">
          <p className="text-[18px] font-semibold text-[#2E2D2D] mb-5">
            Welcome,{" "}
          </p>
          <div className="flex gap-5">
            <div className="w-3/4 flex flex-col gap-7">
              <HomeComponent.Verif />
              <HomeComponent.Services />
            </div>
            <div className="w-1/4">
              <HomeComponent.MyApplicant />
            </div>
          </div>
        </div>
      ) : (
        <>
          <div className="w-full lg:-mt-[87px]">
            <HomeComponent.Hero />
          </div>
          <HomeComponent.Steps />
          <HomeComponent.Services />
          <HomeComponent.Appointment />
          <HomeComponent.Application />
          <HomeComponent.Faq />
        </>
      )}
    </div>
  );
}
