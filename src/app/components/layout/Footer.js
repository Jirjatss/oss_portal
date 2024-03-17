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
    <div className="bg-[#2E2D2D] flex justify-between px-28 py-5">
      <div>
        <p className="text-[12px] text-[#F3F3F3]">
          © 2022 Goverment. All right reserved.
        </p>
      </div>
      <div className="flex gap-5">
        {footerContent.map((e, idx) => (
          <div className="flex gap-1" key={idx}>
            <OSSIcons name={e.icon} />
            <p className="text-[12px] text-[#F3F3F3]">{e.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Footer;
