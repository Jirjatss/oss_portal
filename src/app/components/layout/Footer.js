import { OSSIcons } from "../../../../public/assets/icons/parent";

function Footer() {
  const footerContent = [
    {
      icon: "Building",
      text: "Rua 20 de Maio, n°43, Dili, Timor-Leste",
    },
    {
      icon: "Call",
      text: "(+670)3333 0097",
    },
    {
      icon: "Message",
      text: "info@bu.gov.tl",
    },
  ];

  return (
    <div className="bg-[#2E2D2D] flex lg:flex-row flex-col justify-between lg:px-28 py-5 text-center">
      <div className="flex flex-col gap-1 lg:items-start items-center ">
        <p className="text-[12px] text-[#F3F3F3]">
          Konteúdu hotu-hotu pertense ba © Ministério da Administração Estatal.
          Direitu hotu-hotu reservadu.
        </p>
        <p className="text-[12px] text-[#F3F3F3]">
          Rua 20 de Maio, n°43, Dili, Timor-Leste
        </p>
      </div>
      <div className="flex lg:flex-row flex-col gap-5 lg:mt-0 mt-5 justify-center">
        <p className="text-[12px] text-[#F3F3F3]">Sponsors</p>
        <div className="grid grid-cols-3 items-center justify-center gap-3">
          <div className="flex justify-center items-center">
            <img src="/assets/images/footer_1.png" className="h-16" />
          </div>
          <div className="flex justify-center items-center">
            <img src="/assets/images/footer_2.png" className="h-16" />
          </div>
          <div className="flex justify-start items-center ml-2">
            <img src="/assets/images/footer_3.png" className="h-16" />
          </div>
        </div>
        {/* {footerContent.map((e, idx) => (
          <div className="flex gap-1 justify-center" key={idx}>
            <OSSIcons name={e.icon} />
            <p className="text-[12px] text-[#F3F3F3]">{e.text}</p>
          </div>
        ))} */}
      </div>
    </div>
  );
}

export default Footer;
