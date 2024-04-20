"use client";

import React, { useEffect, useState } from "react";
import InputDropdown from "../TagComponents/InputDropdown";

function FormFaq() {
  const [input, setInput] = useState({});
  const topic = [
    {
      name: "Applicant",
      code: "Applicant",
    },
    {
      name: "Officer",
      code: "Officer",
    },
  ];

  const handleChangeSelect = (e) => {
    const { name, value } = e;
    setInput({
      ...input,
      [name]: value,
    });
  };

  return (
    <div className="lg:border-[1px] lg:border-[#DCDCDC] rounded-[20px] lg:px-10 py-8 flex flex-col lg:gap-8 gap-6">
      <div className="">
        <h1
          className="lg:text-[32px] text-[28px] text-[#363131] capitalize"
          style={{ fontWeight: 700 }}
        >
          Have a Question?
        </h1>
        <p className="lg:text-[16px] text-[12px] font-thin text-[#646464] lg:mt-2">
          Please leave any questions you have here
        </p>
      </div>
      <div className="flex flex-col gap-6">
        <div className="grid lg:grid-cols-2 grid-cols-1 gap-4">
          <div className="flex flex-col">
            <label className="text-label">First Name</label>
            <input
              type="text"
              className="text-input text-black placeholder-gray-400"
              placeholder="Your First Name"
            />
          </div>
          <div className="flex flex-col">
            <label className="text-label">Last Name</label>
            <input
              type="text"
              className="text-input text-[#2E2D2D] placeholder-gray-400"
              placeholder="Your Last Name"
            />
          </div>
        </div>
        <div className="flex flex-col">
          <label className="text-label">Email</label>
          <input
            type="email"
            className="text-input text-black placeholder-gray-400"
            placeholder="Your Email"
          />
        </div>
        <InputDropdown
          label={"Topic"}
          topic={topic}
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
            placeholder="Describe your feedback here"
            maxLength={240}
            name="message"
          />
          <div className="text-[12px] text-[#646464] placeholder-gray-400 mt-2 text-end">
            <b>{input.message?.length}</b>/ 240
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 grid-col-1 gap-5">
        <button className="bg-[#1C25E7] px-3 py-3 text-white flex-1 rounded-[8px]">
          <p className="text-[16px]">Submit</p>
        </button>
      </div>
    </div>
  );
}

export default FormFaq;
