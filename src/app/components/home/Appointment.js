import React from "react";
import { OSSIcons } from "../../../../public/assets/icons/parent";
import Link from "next/link";
import Image from "next/image";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";
import { Booking } from "../../../../public/assets/emoji/index";

function Appointment() {
  const user = useAuthUser();
  return (
    <Link
      href="/set-appointment"
      className="lg:pt-24 pt-16 flex lg:flex-row flex-col text-black lg:gap-10 gap-3"
      id="set-appointment"
    >
      <h1 className="lg:text-[40px] text-[28px] capitalize w-[240px]">
        <b>Need meeting</b> with Officer?
      </h1>
      <div className="border-[1px] border-[#DCDCDC] rounded-[20px] lg:flex flex-1 p-6 gap-8 items-center hidden">
        <div className="bg-[#D9D7F9] rounded-[12.8px] w-[64px] h-[64px] flex justify-center items-center">
          <Image src={Booking} width={30} height={30} alt={"booking"} />
        </div>
        <div className="flex flex-col flex-1">
          <h1 className="text-[24px] font-bold leading-[48px]">
            Set Appointment Online First
          </h1>
          <p className="text-[16px] text-[#646464]">
            Effortlessly book appointments with government officials <br />{" "}
            online for a seamless service experience
          </p>
        </div>
        <button className="">
          <OSSIcons
            name="RightArrow"
            style={{ width: "40px", height: "40px" }}
          />
        </button>
      </div>
      <div className="lg:hidden">
        <Link href="/set-appointment">
          <div
            className={`w-full border-[1px] border-[#DCDCDC] rounded-[20px] ${
              user ? "px-[15px] py-[20px]" : "p-[20px]"
            } flex flex-col lg:gap-[24px] gap-2 col-span-1 cursor-pointer`}
          >
            <div className="flex justify-between">
              <div
                className={`lg:w-[64px] lg:h-[64px] w-[54px] h-[54px] bg-[#F0EFFD] rounded-[12.8px] flex justify-center items-center`}
              >
                <Image src={Booking} width={30} height={30} alt={"Booking"} />
              </div>
              <button className="lg:hidden block">
                <OSSIcons name="RightArrow" styleDiv={{ width: "25px" }} />
              </button>
            </div>
            <div>
              <h1
                className={`${
                  user
                    ? "lg:text-[18px] text-[16px]"
                    : "lg:text-[24px] text-[16px]"
                } font-semibold text-[#2E2D2D] mb-1`}
              >
                Set Appointment Online First
              </h1>
              <p
                className="text-[#646464] lg:text-[16px] text-[12px]"
                style={{ fontWeight: 400 }}
              >
                Effortlessly book appointments with government officials online
                for a seamless service experience
              </p>
            </div>
          </div>
        </Link>
      </div>
    </Link>
  );
}

export default Appointment;
