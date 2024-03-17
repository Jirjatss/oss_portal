import React from "react";
import InputDropdown from "../TagComponents/InputDropdown";

function FormFaq({ handleChangeMessage, message, topic }) {
  return (
    <div className="border-[1px] border-[#DCDCDC] rounded-[20px] px-10 py-8 flex flex-col gap-8">
      <div className="">
        <h1
          className="text-[32px] text-[#363131] capitalize"
          style={{ fontWeight: 700 }}
        >
          Have a Question?
        </h1>
        <p className="text-[16px] font-thin text-[#646464] mt-2">
          Please leave any questions you have here
        </p>
      </div>
      <div className="flex flex-col gap-6">
        <div className="grid grid-cols-2">
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
        <InputDropdown topic={topic} label={"Topic"} />
        <div className="flex flex-col">
          <label className="text-label">Feedback</label>
          <textarea
            className="border-b-[1px] border-[#F0F0F0] focus:outline-none text-[18px] text-black bg-transparent h-[80px] placeholder-gray-400"
            rows="3"
            value={message}
            onChange={handleChangeMessage}
            placeholder="Describe your feedback here"
            maxLength={240}
          />
          <div className="text-[12px] text-[#646464] placeholder-gray-400 mt-2 text-end">
            <b>{message.length}</b>/ 240
          </div>
        </div>
      </div>
      <div>
        <div className="grid grid-cols-2 gap-5">
          <button className="bg-[#1C25E7] px-3 py-3 text-white flex-1 rounded-[8px]">
            <p className="text-[16px]">Submit</p>
          </button>
        </div>
      </div>
    </div>
  );
}

export default FormFaq;
