"use client";

import React from "react";
import FormIdentify from "../components/Form/FormIdentify";
import { OSSIcons } from "../../../public/assets/icons/parent";
import { useRouter } from "next/navigation";

function EditProfile() {
  const router = useRouter();
  return (
    <div className="px-52 bg-white py-10 min-h-screen">
      <div className="flex justify-between items-center mb-10">
        <div
          className="flex gap-2 cursor-pointer"
          onClick={() => {
            router.replace("/");
          }}
        >
          <OSSIcons name="LeftArrow" />
          <p className="text-[18px] font-semibold text-[#2E2D2D]">
            Personal Information
          </p>
        </div>
      </div>
      <FormIdentify
        isEditProfile={true}
        onClick={() => {
          alert("hi guys");
        }}
      />
    </div>
  );
}

export default EditProfile;
