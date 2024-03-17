import React from "react";
import InputDropdown from "../TagComponents/InputDropdown";

function FormContact({ onClick }) {
  const country = [{ topic: "Timor Leste" }, { topic: "Papua" }];
  return (
    <>
      <div>
        <h1 className="text-[28px] font-semibold text-[#2E2D2D] mb-2">
          Contact and Residance
        </h1>
        <p className="text-[#646464] text-[16px] mb-10">
          please to complete your personal data for account completion.
        </p>
      </div>
      <div className="grid grid-cols-2 gap-10 mb-10">
        <div className="flex flex-col">
          <label className="text-label">Email</label>
          <input
            type="text"
            className="text-input text-black placeholder-gray-400"
            placeholder="Email"
          />
        </div>
        <div className="flex flex-col">
          <label className="text-label">Phone Number</label>
          <input
            type="number"
            className="text-input text-black placeholder-gray-400"
            placeholder="Phone Number"
          />
        </div>
      </div>
      <div>
        <h1 className="text-[18px] font-semibold text-[#2E2D2D] mb-8">
          Local Residence
        </h1>
        <div className="flex flex-col gap-6 mb-16">
          <div className="grid grid-cols-2 gap-10">
            <div className="flex flex-col">
              <label className="text-label">Address</label>
              <input
                type="text"
                className="text-input text-black placeholder-gray-400"
                placeholder="Address"
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-10">
            <InputDropdown label={"Country"} topic={country} />
            <InputDropdown label={"State"} topic={country} />
          </div>
          <div className="grid grid-cols-2 gap-10">
            <InputDropdown label={"City"} topic={country} />
            <InputDropdown label={"Town"} topic={country} />
          </div>
          <div className="grid grid-cols-2 gap-10">
            <InputDropdown label={"Village"} topic={country} />
          </div>
        </div>
      </div>
      <button
        className="bg-[#1C25E7] py-4 px-32 text-[#F3F3F3] flex m-auto rounded-[8px]"
        onClick={onClick}
      >
        Continue
      </button>
    </>
  );
}

export default FormContact;
