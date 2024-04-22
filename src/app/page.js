"use client";

import { useSelector } from "react-redux";
import * as HomeComponent from "./components/home/Index";
import Loader from "./components/Loader";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";

export default function Home() {
  const auth = useAuthUser();

  const { profile, loading } = useSelector((state) => state.userReducer);
  const { personalDetail } = profile || {};

  const { firstName, gender } = personalDetail || {};

  return (
    <>
      {loading && <Loader />}
      <div className="bg-white min-h-screen">
        {auth ? (
          <div className="w-full lg:px-28 px-5 py-10 ">
            <p className="text-[18px] font-semibold text-[#2E2D2D] mb-5">
              Welcome
              {firstName ? (
                <span>
                  {", "}
                  {firstName !== "" || firstName === null
                    ? gender === "male"
                      ? `Mr. ${firstName}`
                      : `Mrs. ${firstName}`
                    : ""}
                </span>
              ) : (
                <>!</>
              )}
            </p>
            <div className="lg:flex gap-5 hidden">
              <div className="w-3/4 flex flex-col gap-7">
                <HomeComponent.Verif />
                <HomeComponent.Services />
              </div>
              <div className="w-1/4 flex flex-col gap-5">
                <HomeComponent.MyApplicant />
              </div>
            </div>
            <div className="flex flex-col gap-5 lg:hidden">
              <HomeComponent.Verif />
              <HomeComponent.MyApplicant />
              <HomeComponent.Services />
            </div>
            <HomeComponent.Faq />
          </div>
        ) : (
          <>
            <div className="w-full lg:-mt-[87px]">
              <HomeComponent.Hero />
            </div>
            <div className="lg:px-28 px-5">
              <HomeComponent.Steps />
              <HomeComponent.Services />
              <HomeComponent.Appointment />
            </div>
            <HomeComponent.Application />
            <div className="lg:px-28 px-5">
              <HomeComponent.Faq />
            </div>
          </>
        )}
      </div>
    </>
  );
}
