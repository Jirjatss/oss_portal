"use client";

import { useSelector } from "react-redux";
import * as HomeComponent from "./components/home/Index";
import Loader from "./components/Loader";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";

export default function Home() {
  const auth = useAuthUser();
  const { loading } = useSelector((state) => state.userReducer);

  return (
    <>
      {loading && <Loader />}
      <div className="bg-white min-h-screen">
        {auth ? (
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
            {/* <HomeComponent.Appointment /> */}
            <HomeComponent.Application />
            <HomeComponent.Faq />
          </>
        )}
      </div>
    </>
  );
}
