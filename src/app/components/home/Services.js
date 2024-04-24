"use client";

import React, { useEffect, useState } from "react";
import { OSSIcons } from "../../../../public/assets/icons/parent";
import {
  Passport,
  Driving,
  Family,
  CitizenCard,
  Akta,
  Booking,
  Mariage,
  Criminal,
  Cr,
} from "../../../../public/assets/emoji/index";
import Image from "next/image";
import Link from "next/link";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { getServicesTypeHandler } from "@/app/store/actions/serviceAction";
import { toast } from "sonner";

export const ServicesCard = ({ title, icon, desc, url }) => {
  const user = useAuthUser();
  return (
    <Link href={url}>
      <div
        className={`w-full lg:min-h-[300px] min-h-[170px] border-[1px] border-[#DCDCDC] rounded-[20px] ${
          user ? "lg:px-[15px] p-4" : "lg:p-[20px] p-4"
        } flex flex-col lg:gap-[24px] gap-2 col-span-1 cursor-pointer`}
      >
        <div className="flex justify-between">
          <div
            className={`lg:w-[64px] lg:h-[64px] items-start flex justify-start ${
              title === "Set Appointment" ? "bg-[#F0EFFD]" : "bg-[#E7953E]"
            }  rounded-[12.8px] flex justify-center items-center`}
          >
            <Image src={icon} width={40} height={40} alt={title} />
          </div>
          <button className="lg:hidden block">
            <OSSIcons name="RightArrow" styleDiv={{ width: "25px" }} />
          </button>
          <button className="lg:block hidden">
            <OSSIcons name="RightArrow" />
          </button>
        </div>
        <div>
          <h1
            className={`${
              user ? "lg:text-[18px] text-[14px]" : "lg:text-[24px] text-[14px]"
            } font-semibold text-[#2E2D2D] mb-1 leading-tight lg:mt-0 mt-2`}
          >
            {title}
          </h1>
          <p
            className="text-[#646464] lg:text-[16px] text-[12px]"
            style={{ fontWeight: 400 }}
          >
            {desc}
          </p>
        </div>
      </div>
    </Link>
  );
};

const Services = () => {
  const user = useAuthUser();
  // const router = useRouter();
  const { servicesType } = useSelector((state) => state.serviceReducer);
  const [service, setService] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getServicesTypeHandler()).catch((err) =>
      toast.error("Failed to fetch")
    );
  }, []);

  useEffect(() => {
    if (servicesType && servicesType.length > 0) {
      const updatedService = servicesType.map((e) => {
        let icon;
        let description;
        let title;
        switch (e.name) {
          case "family-card":
            icon = Family;
            title = "Ficha Família";
            description =
              "Formuláriu rejistu familiár ne'ebé halibur informasaun hanesan ema ne'ebé responsavel nia naran no númeru ema iha uma no membru família nia idade.";
            break;
          case "general-passport":
            icon = Passport;
            title = "Pasaporte Komum";
            description =
              "Pasaporte Eletroniku Timor-Leste (PETL) mak dokumentu viajen individuál ida-idak nian, ne'ebé permite nia na'in sira tama no sai husi territóriu Timor-Leste nian.";
            break;
          case "driving-license":
            icon = Driving;
            title = "Karta-Kondusaun";
            description =
              "Karta-Kondusaun mak dokumentu ne'ebé sertifika, iha Timor-Leste, sidadaun ida-ne'ebé iha kapasidade atu lori karreta iha estrada publika.";
            break;
          case "citizen-id":
            icon = CitizenCard;
            title = "Billete-Identidade";
            description =
              "Billete-Identidade ne'e hanesan dokumentu ida-ne'ebé prova Timor-Leste nia identidade no identidade sivíl, iha autoridade no entidade ruma nia oin.";
            break;
          case "birth-certificate":
            icon = Akta;
            title = "Sertidaun Moris RDTL";
            description =
              "Sertidaun Moris RDTLSertidaun Moris RDTL bele define hanesan dokumentu primeiru no importante tebes hanesan sidadaun, tanba ne'e reprezenta ita-nia ezisténsia ofisiál iha Estadu nia oin.";
            break;
          case "marriage-certificate":
            icon = Mariage;
            title = "Sertidaun Kazamentu";
            description =
              "Sertidaun Kazamentu ne'e hanesan dokumentu ida-ne'ebé prova faktus sira iha rejistu kazamentu, iha autoridade no entidade ruma nia oin.";
            break;
          case "criminal-record-certificate":
            icon = Criminal;
            title = "Sertifikadu Rejistu Kriminál";
            description =
              "Identifikasaun kriminál mai ho objetivu atu halibur no prezerva sumáriu desizaun kriminál sira ne'ebé tribunál Timor-Leste hatun hasoru ema hotu.";
            break;
          case "commercial-registration":
            icon = Cr;
            title =
              "Rejistu Komersiál no Lisensiamentu ba Atividade Ekonómika Sira.";
            description =
              "Rejistu Komersial hakarak atu publika estatutu legál na'in mesak, kompañia komersiál sira, sosiedade sivíl sira iha forma komersiál.";
            break;
          default:
            icon = Family;
            description =
              "Asegura ita-nia identidade. Hetan kartaun familia agora";
        }
        return {
          icon: icon,
          url: `/${e.name}`,
          description: description,
          title: title,
          // .split("-")
          // .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
          // .join(" "),
        };
      });
      if (
        user &&
        !updatedService.some((item) => item.title === "Set Appointment")
      ) {
        updatedService.unshift({
          icon: Booking,
          title: "Reserva ajendamentu ho ofisiál governu sira",
          description: "Reserva ajendamentu ho ofisiál governu sira",
          url: "/set-appointment",
        });
      }
      setService(updatedService);
    }
  }, [servicesType, user]);

  return (
    <div className={`${!user && "lg:pt-24 pt-16"}`} id="services">
      {user ? (
        <>
          <h1 className="lg:text-[28px] text-[24px] lg:leading-[57.6px] text-[#363131] text-start capitalize font-semibold mt-5 lg:mt-0">
            Saida mak Ita presiza ohin loron?
          </h1>
          <p className="lg:mb-10 mb-5 text-[#646464] text-[16px]">
            Fasil atu halo upload, prosesa, no jere dokumentu sira ba
            administrasaun nebe efisiente.
          </p>
        </>
      ) : (
        <h1 className="lg:text-[40px] text-[28px] lg:px-3 lg:leading-[57.6px] text-[#363131] text-start capitalize mb-10">
          Hili Servisu Oioin Ne’ebé Ita Boot Presiza Iha Ne’e.
        </h1>
      )}

      {user ? (
        <div className="grid lg:grid-cols-3 grid-cols-2 gap-3 gap-y-5">
          {service?.map((e, index) => (
            <ServicesCard
              key={index}
              title={e.title}
              desc={e.description}
              icon={e.icon}
              url={e.url}
            />
          ))}
        </div>
      ) : (
        <div className="grid lg:grid-cols-4 grid-cols-2 gap-5">
          {service?.map((e, index) => (
            <ServicesCard
              key={index}
              title={e.title}
              desc={e.description}
              icon={e.icon}
              url={e.url}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Services;
