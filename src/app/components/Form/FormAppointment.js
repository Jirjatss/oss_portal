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
import Loader from "../Loader";

function FormAppointment({ onContinue }) {
  const user = useAuthUser();
  const dispatch = useDispatch();
  const searchParams = useSearchParams();
  const { profile } = useSelector((state) => state.userReducer);
  const { status } = profile || {};

  const router = useRouter();
  const { t } = useLanguage();

  const serviceTypeParams = searchParams.get("serviceType");
  const serviceParams = searchParams.get("service");

  const [input, setInput] = useState({});
  const [ministryType, setMinistryType] = useState(null);
  const { municipality } = useSelector((state) => state.regionReducer);

  const { services, servicesType } = useSelector(
    (state) => state.serviceReducer
  );

  const isDisabled =
    !input.officeLocationCode ||
    !input.serviceType ||
    !input.serviceId ||
    !input.officeRepresentativeId;

  const getOfficeLocation = async () => {
    try {
      const { data } = await axios({
        url: `https://api.ardhiansyah.com/office-locations?stateId=${input.officeLocationCode}&serviceTypeId=${input.serviceType}`,
        headers: {
          "ngrok-skip-browser-warning": true,
          accept: "application/json",
        },
      });
      const newData = data.data.map((e) => {
        input.officeRepresentativeId = e.id;
        return {
          id: e.id,
          code: e.code,
          name: e.organizationName,
        };
      });
      setMinistryType(newData);
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

  const MinistryCard = ({ data, location }) => {
    const officeLocation = location?.filter(
      (e) => e.id === input.officeLocationCode
    );
    if (isDisabled || !input.serviceId) return null;
    if (!data) {
      return (
        <div className="w-full flex items-center justify-center mt-2">
          <img
            src="/assets/images/loading.gif"
            alt="Loading..."
            className="w-10"
          />
        </div>
      );
    }

    if (data && location)
      return (
        <div className="w-full border-[2px] border-[#D9D7F9] rounded-[16px] p-[16px] mt-2">
          <p className="text-[#646464] text-[16px]">
            {t("visit_ministry_office")}
          </p>
          <p className="text-[#2E2D2D] text-[18px]">
            {t(data[0].name.split("-").join("_"))}, {officeLocation[0].name}
          </p>
        </div>
      );
  };

  useEffect(() => {
    dispatch(getRegionMunicipality(user?.accessToken));
    dispatch(getServicesTypeHandler());
    if (input.serviceType) {
      dispatch(getServicesHandler(input.serviceType, user?.accessToken));
    }
    if (input.officeLocationCode && input.serviceId) {
      getOfficeLocation();
    }
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
    ) {
      setInput({
        serviceType: serviceTypeParams,
        serviceId: serviceParams,
      });
      console.log(input.serviceId, serviceParams);
    } else if (
      !serviceTypeParams &&
      !serviceParams &&
      input.serviceType &&
      input.serviceId
    ) {
      setInput({});
    }
  }, [serviceTypeParams, serviceParams]);

  useEffect(() => {
    if (!serviceParams) input.serviceId = null;
  }, [input.serviceType]);

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
          label={t("service")}
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

        <MinistryCard data={ministryType} location={municipality} />

        <button
          disabled={isDisabled}
          className={`${
            isDisabled ? "bg-[#DCDCDC] cursor-not-allowed" : "bg-[#8B0000]"
          }  px-3 py-4 text-[#F3F3F3] rounded-lg max-w-full mt-2 font-semibold`}
          onClick={() => {
            dispatch(
              setAppointmentData({
                officeLocationId: +input.officeRepresentativeId,
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
