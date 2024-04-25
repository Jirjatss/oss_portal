"use client";

import React, { useEffect, useState } from "react";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";
import InputDropdown from "../TagComponents/InputDropdown";
import { useDispatch, useSelector } from "react-redux";
import { getRegionMunicipality } from "@/app/store/actions/regionAction";
import { setAppointmentData } from "@/app/store/actions/appointmentAction";
import {
  getServicesHandler,
  getServicesTypeHandler,
} from "@/app/store/actions/serviceAction";
import { useSearchParams } from "next/navigation";
import axios from "axios";
import { getUserInformation } from "@/app/store/actions/userAction";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import useLanguage from "@/app/useLanguage";

function FormAppointment({ onContinue }) {
  const user = useAuthUser();
  const dispatch = useDispatch();
  const searchParams = useSearchParams();
  const { profile } = useSelector((state) => state.userReducer);
  const { status } = profile || {};
  const { residenceDetail } = profile || {};
  const router = useRouter();
  const { t } = useLanguage();

  const { stateId } = residenceDetail || {};
  const serviceTypeParams = searchParams.get("serviceType");
  const serviceParams = searchParams.get("service");

  const [input, setInput] = useState({});

  const { municipality } = useSelector((state) => state.regionReducer);

  const { services, servicesType } = useSelector(
    (state) => state.serviceReducer
  );

  const [officeLocation, setOfficeLocation] = useState(null);

  const isDisabled =
    !input.officeLocationCode || !input.serviceType || !input.serviceId;

  const getOfficeLocation = async () => {
    try {
      const { data } = await axios({
        url: `https://api.ardhiansyah.com/office-locations?stateId=${input.officeLocationCode}`,
        headers: {
          "ngrok-skip-browser-warning": true,
          accept: "application/json",
        },
      });
      const newData = data.data.map((e) => {
        return {
          id: e.id,
          code: e.code,
          name: e.organizationName,
        };
      });
      setOfficeLocation(newData);
    } catch (error) {
      console.log(error);
    }
  };

  const handleChangeSelect = (e) => {
    const { name, value } = e;
    setInput({
      ...input,
      [name]: value,
    });
  };

  useEffect(() => {
    dispatch(getRegionMunicipality(user?.accessToken));
    dispatch(getServicesTypeHandler());
    if (input.serviceType) {
      dispatch(getServicesHandler(input.serviceType, user?.accessToken));
    }
    if (input.officeLocationCode) {
      getOfficeLocation();
    }

    console.log(input.officeLocationCode);
  }, [dispatch, input]);

  useEffect(() => {
    if (user) dispatch(getUserInformation(user?.accessToken));
  }, []);

  useEffect(() => {
    if (user && status === "inactive") {
      toast.error("Verification your email first");
      router.push("/");
    }
    if (user && status === "needToFillPersonalInformation") {
      toast.error("Verification your account first");
      router.push("/personal-informations");
    }
  }, [user, status]);

  useEffect(() => {
    if (
      serviceTypeParams &&
      serviceParams &&
      !input.serviceType &&
      !input.serviceId
    )
      setInput({
        serviceType: serviceTypeParams,
        serviceId: +serviceParams,
      });
    else if (
      !serviceTypeParams &&
      !serviceParams &&
      input.serviceType &&
      input.serviceId
    ) {
      setInput({});
    }
  }, [serviceTypeParams, serviceParams]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 my-10 gap-x-10">
      <div>
        <h1 className="lg:text-[28px] text-[24px] text-[#2E2D2D] font-semibold mb-2">
          {t("choose_location")}
        </h1>
        <p className="text-[16px] text-[#646464] lg:mb-0 mb-10">
          {t("set_appointment_location_desc")}
        </p>
      </div>
      <div className="flex flex-col gap-7">
        <InputDropdown
          label={t("office_location")}
          // isDisabled={stateId}
          topic={municipality}
          name="officeLocationCode"
          handleChange={(e) => {
            handleChangeSelect(e);
          }}
          selectedTopic={input.officeLocationCode}
        />
        <InputDropdown
          label={t("office_representative")}
          isDisabled={!input.officeLocationCode}
          topic={officeLocation}
          name="officeRepresentativeId"
          handleChange={(e) => {
            handleChangeSelect(e);
          }}
          selectedTopic={input.officeRepresentativeId}
        />
        <InputDropdown
          label={t("applications")}
          isDisabled={serviceTypeParams}
          topic={servicesType}
          name="serviceType"
          handleChange={(e) => {
            handleChangeSelect(e);
          }}
          selectedTopic={input.serviceType}
        />

        <InputDropdown
          isDisabled={!input.serviceType || serviceParams}
          label={t("purpose")}
          topic={services}
          name="serviceId"
          handleChange={(e) => {
            handleChangeSelect(e);
          }}
          selectedTopic={input.serviceId}
        />

        <button
          //   disabled={isDisabled}
          className={`${
            isDisabled ? "bg-[#DCDCDC] cursor-not-allowed" : "bg-[#1C25E7]"
          }  px-3 py-4 text-[#F3F3F3] rounded-lg max-w-full mt-5 font-semibold`}
          onClick={() => {
            dispatch(
              setAppointmentData({
                officeLocationId: input.officeRepresentativeId,
                serviceId: +input.serviceId,
              })
            );
            onContinue();
          }}
        >
          {t("txt_continue")}
        </button>
      </div>
    </div>
  );
}

export default FormAppointment;
