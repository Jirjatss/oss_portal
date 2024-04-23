import React from "react";
import {
  FlowStep1,
  FlowStep2,
  FlowStep3,
} from "../../../../public/assets/emoji";
import Image from "next/image";

const Steps = () => {
  const steps = [
    {
      icon: FlowStep1,
      title: "Pasu 1",
      desc: "Halo Kompletu Formuláriu No Aneksa Dokumentu Ne'ebé Presiza.",
    },
    {
      icon: FlowStep2,
      title: "Pasu 2",
      desc: "Submete ba Rejistu Online no Hein ba Aprovasaun.",
    },
    {
      icon: FlowStep3,
      title: "Pasu 3",
      desc: "Hetan Aprovasaun No Hein To'o Prosesu Ne'e Remata.",
    },
  ];
  return (
    <div
      className="border-[#DCDCDC] border shadow-lg rounded-xl m-auto lg:-mt-12 mt-10  bg-white lg:p-12 justify-center relative py-24 p-4"
      id="step"
    >
      <h1 className="lg:text-[40px] text-[28px] px-3 lg:leading-[57.6px] text-[#363131] text-center">
        Aplikasaun Fasil Iha Pasu Tolu De’it!
      </h1>
      <div className="lg:flex lg:flex-row flex-col mt-7 m-auto justify-between hidden">
        <div className="w-[220px] h-[214px] flex justify-center items-center flex-col gap-2">
          <div className=" bg-[#D9D7F9] flex justify-center items-center rounded-[8px] p-4">
            <Image src={FlowStep1} width={55} height={50} alt={"Empty"} />
          </div>
          <div className="">
            <h1 className="text-[28px] text-[#363131] text-center font-bold">
              Pasu 1
            </h1>
            <p className="text-[18px] text-[#646464] text-center capitalize">
              Halo Kompletu Formuláriu <br />
              No Aneksa Dokumentu Ne’ebé Presiza.
            </p>
          </div>
        </div>
        <div className="w-[87.3px] text-black m-auto flex justify-center items-center border-[4px] border-dashed border-[#DCDCDC]"></div>
        <div className="w-[220px] h-[214px] flex justify-center items-center flex-col gap-2 ">
          <div className=" bg-[#D9D7F9] flex justify-center items-center rounded-[8px] p-4">
            <Image src={FlowStep2} width={55} height={50} alt={"Empty"} />
          </div>
          <div className="">
            <h1 className="text-[28px] text-[#363131] text-center font-bold">
              Pasu 2
            </h1>
            <p className="text-[18px] text-[#646464] text-center capitalize">
              Submete ba Rejistu Online no Hein ba Aprovasaun.
            </p>
          </div>
        </div>
        <div className="w-[87.3px] text-black m-auto flex justify-center items-center border-[4px] border-dashed border-[#DCDCDC]"></div>
        <div className="w-[220px] h-[214px] flex justify-center items-center flex-col gap-2 ">
          <div className=" bg-[#D9D7F9] flex justify-center items-center rounded-[8px] p-4">
            <Image src={FlowStep3} width={55} height={50} alt={"Empty"} />
          </div>
          <div className="">
            <h1 className="text-[28px] text-[#363131] text-center font-bold">
              Pasu 3
            </h1>
            <p className="text-[18px] text-[#646464] text-center capitalize">
              Hetan Aprovasaun No Hein To’o Prosesu Ne’e Remata.
            </p>
          </div>
        </div>
      </div>
      {/* Mobile */}
      <div className="lg:hidden">
        <ol className="relative ms-10 py-10">
          {steps.map((e, i) => {
            const { icon, title, desc } = e;
            return (
              <div key={i}>
                <li
                  className={`${
                    i !== steps.length - 1 &&
                    "border-l-[2px] border-[#DCDCDC] border-dashed pb-10"
                  } `}
                >
                  <span
                    className={`absolute flex items-center justify-center -start-6`}
                  >
                    <div className=" bg-[#D9D7F9] flex justify-center items-center rounded-[8px] p-3 relative">
                      <Image src={icon} width={30} height={30} alt={"Empty"} />
                    </div>
                  </span>
                  <div className="ms-12">
                    <h1 className="text-transparent">data</h1>
                    <p className="text-[#2E2D2D]  text-[24px] -mt-7 font-semibold">
                      {title}
                    </p>
                    <p className="text-[#646464] text-[14px] mt-3">{desc}</p>
                  </div>
                </li>
              </div>
            );
          })}
        </ol>
      </div>
    </div>
  );
};

export default Steps;
