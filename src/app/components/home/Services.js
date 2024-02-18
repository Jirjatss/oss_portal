import React from "react";
import { OSSIcons } from "../../../../public/assets/icons/parent";

function Services() {
  const service = [
    {
      icon: "✈️",
      title: "Passport Card",
      desc: "Secure your identity. Obtain your birth certificate now!",
    },
    {
      icon: "🚗",
      title: "Driving License",
      desc: "Secure your identity. Obtain your birth certificate now!",
    },
    {
      icon: "🏛",
      title: "NIC",
      desc: "Secure your identity. Obtain your birth certificate now!",
    },
    {
      icon: "👨‍👩‍👧",
      title: "Family Card",
      desc: "Secure your identity. Obtain your birth certificate now!",
    },
    {
      icon: "📁",
      title: "Business Card",
      desc: "Secure your identity. Obtain your birth certificate now!",
    },
    {
      icon: "👥",
      title: "Ficha Familia",
      desc: "Secure your identity. Obtain your birth certificate now!",
    },
    {
      icon: "🆔",
      title: "Citizen Card",
      desc: "Secure your identity. Obtain your birth certificate now!",
    },
    {
      icon: "👶🏻",
      title: "Birth of Certificate",
      desc: "Secure your identity. Obtain your birth certificate now!",
    },
  ];

  const ServicesCard = ({ title, icon, desc }) => {
    return (
      <div className="w-full h-[229px] border-[1px] border-[#DCDCDC] rounded-[20px] p-[20px] flex flex-col gap-[24px] col-span-1">
        <div className="flex justify-between">
          <div className="w-[64px] h-[64px] bg-[#E7953E] rounded-[12.8px] flex justify-center items-center">
            <OSSIcons name={icon} />
            {/* <p className="text-[38px] text-center">{icon}</p> */}
          </div>
          <button>
            <OSSIcons name="RightArrow" />
          </button>
        </div>
        <div>
          <h1 className="text-[24px] font-semibold text-[#2E2D2D] mb-1">
            {title}
          </h1>
          <p className="text-[#646464] text-[16px]" style={{ fontWeight: 400 }}>
            {desc}
          </p>
        </div>
      </div>
    );
  };

  return (
    <div className="px-52 mt-24">
      <h1 className="text-[40px] px-3 leading-[57.6px] text-[#363131] text-start capitalize mb-10">
        Choose the <b>various services</b> you need here
      </h1>
      <div className="grid grid-cols-4 gap-5">
        {service.map((e, index) => (
          <ServicesCard
            key={index}
            title={e.title}
            desc={e.desc}
            icon={e.icon}
          />
        ))}
      </div>
    </div>
  );
}

export default Services;
