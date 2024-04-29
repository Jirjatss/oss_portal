"use client";

import React, { useEffect, useState } from "react";
import InputDropdown from "../TagComponents/InputDropdown";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import { getServicesTypeHandler } from "@/app/store/actions/serviceAction";
import useLanguage from "@/app/useLanguage";

function FormFaq() {
  const dispatch = useDispatch();
  const { t } = useLanguage();
  const [input, setInput] = useState({});
  const { servicesType } = useSelector((state) => state.serviceReducer);

  const handleChangeSelect = (e) => {
    const { name, value } = e;
    setInput({
      ...input,
      [name]: value,
    });
  };

  const isDisabled =
    !input.FirstName ||
    !input.LastName ||
    !input.message ||
    !input.topic ||
    !input.email;

  useEffect(() => {
    dispatch(getServicesTypeHandler()).catch((err) =>
      toast.error("Failed to fetch")
    );
  }, []);

  return (
    <div className="lg:border-[1px] lg:border-[#DCDCDC] rounded-[20px] lg:px-10 py-8 flex flex-col lg:gap-8 gap-6">
      <div className="">
        <h1
          className="lg:text-[32px] text-[28px] text-[#363131] capitalize"
          style={{ fontWeight: 700 }}
        >
          {t("have_a_question")}
        </h1>
        <p className="lg:text-[16px] text-[12px] font-thin text-[#646464] lg:mt-2">
          {t("Please_leave_any_questions_you_have_here")}
        </p>
      </div>
      <div className="flex flex-col gap-6">
        <div className="grid lg:grid-cols-2 grid-cols-1 gap-4">
          <div className="flex flex-col">
            <label className="text-label">{t("first_name")}</label>
            <input
              type="text"
              className="text-input text-black placeholder-gray-400"
              placeholder={t("first_name")}
              value={input.FirstName}
              name="FirstName"
              onChange={(e) => handleChangeSelect(e.target)}
            />
          </div>
          <div className="flex flex-col">
            <label className="text-label">{t("last_name")}</label>
            <input
              type="text"
              className="text-input text-[#2E2D2D] placeholder-gray-400"
              placeholder={t("last_name")}
              value={input.LastName}
              name="LastName"
              onChange={(e) => handleChangeSelect(e.target)}
            />
          </div>
        </div>
        <div className="flex flex-col">
          <label className="text-label">{t("email")}</label>
          <input
            type="email"
            className="text-input text-black placeholder-gray-400"
            placeholder={t("email")}
            value={input.email}
            name="email"
            onChange={(e) => handleChangeSelect(e.target)}
          />
        </div>
        <InputDropdown
          label={t("topic")}
          topic={servicesType}
          name="topic"
          handleChange={(e) => handleChangeSelect(e)}
          selectedTopic={input.topic}
        />
        <div className="flex flex-col">
          <label className="text-label">Feedback</label>
          <textarea
            className="border-b-[1px] border-[#B0B0B0] focus:outline-none lg:text-[18px] text-[16px] text-black bg-transparent h-[80px] placeholder-gray-400"
            rows="3"
            value={input.message}
            onChange={(e) => handleChangeSelect(e.target)}
            placeholder={t("feedback")}
            maxLength={240}
            name="message"
          />
          <div className="text-[12px] text-[#646464] placeholder-gray-400 mt-2 text-end">
            <b>{input.message?.length}</b>/ 240
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 grid-col-1 gap-5">
        <button
          disabled={isDisabled}
          className={`${
            isDisabled ? "bg-[#DCDCDC] cursor-not-allowed" : "bg-[#8B0000]"
          } px-3 py-3 text-white flex-1 rounded-[8px]`}
          onClick={() => {
            faq_success.showModal();
            input.FirstName = "";
            input.LastName = "";
            input.message = "";
            input.topic = null;
            input.email = "";
          }}
        >
          <p className="text-[16px]">Submit</p>
        </button>
      </div>
    </div>
  );
}

export default FormFaq;
