import React from "react";

const InputText = ({ placeholder, label }) => {
  return (
    <div className="flex flex-col">
      <label className="text-label">{label}</label>
      <input
        type="text"
        className="text-input text-black placeholder-[#646464]"
        placeholder={placeholder}
      />
    </div>
  );
};

export default InputText;
