"use client";

import Image from "next/image";
import React, { useState } from "react";
import FormOtp from "../components/Form/FormOtp";
import FormStartRegister from "../components/Form/FormStartRegister";
import FormRegister from "../components/Form/FormRegister";
import ModalOtp from "../components/Modal/ModalOtp";

function Register() {
  const [password, setPassword] = useState("");
  const [reenterPassword, setReenterPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showReenterPassword, setShowReenterPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const toggleReenterPasswordVisibility = () => {
    setShowReenterPassword(!showReenterPassword);
  };

  const [formOtp, setFormOtp] = useState(false);
  const [formRegister, setFormRegister] = useState(false);

  const showModalOtp = () => {
    my_modal_1.showModal();
  };
  return (
    <div className="min-h-screen bg-white grid grid-cols-2">
      <div className="relative">
        <Image
          src="/assets/images/login.png"
          alt="Your Image"
          layout="fill"
          objectFit="cover"
          objectPosition="center"
        />
      </div>
      {formOtp && !formRegister ? (
        <FormOtp
          onClick={() => setFormOtp(false)}
          onClickSubmit={() => {
            setFormOtp(false);
            setFormRegister(true);
          }}
        />
      ) : formRegister ? (
        <FormRegister
          password={password}
          showPassword={showPassword}
          onClickShowPassword={togglePasswordVisibility}
          onChangePassword={(e) => setPassword(e.target.value)}
          reenterPassword={reenterPassword}
          showReenterPassword={showReenterPassword}
          onClickReenterPassword={toggleReenterPasswordVisibility}
          onChangeReenterPassword={(e) => setReenterPassword(e.target.value)}
        />
      ) : (
        <FormStartRegister onClick={showModalOtp} />
      )}

      <ModalOtp onClick={() => setFormOtp(!formOtp)} />
    </div>
  );
}

export default Register;
