"use client";

import React, { useState } from "react";
import Image from "next/image";
import FormOtp from "../components/Form/FormOtp";
import FormStartRegister from "../components/Form/FormStartRegister";
import FormRegister from "../components/Form/FormRegister";
import ModalVerifiedOtp from "../components/Modal/ModalVerifiedOtp";
import ModalSuccess from "../components/Modal/ModalSuccess";
import { useSelector } from "react-redux";

function Register() {
  const [password, setPassword] = useState("");
  const [reenterPassword, setReenterPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showReenterPassword, setShowReenterPassword] = useState(false);
  const [formOtp, setFormOtp] = useState(false);
  const [formRegister, setFormRegister] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleReenterPasswordVisibility = () => {
    setShowReenterPassword(!showReenterPassword);
  };

  const showModalOtp = () => {
    sent_otp.showModal();
  };

  const showModalVerifiedOtp = () => {
    verified_otp.showModal();
  };

  return (
    <div className="min-h-screen bg-white grid lg:grid-cols-2 grid-cols-1">
      <div className="relative lg:flex hidden h-screen">
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
            showModalVerifiedOtp();
          }}
          onResendOtp={() => {
            showModalOtp();
            setFormOtp(true);
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
      <div className="lg:mx-0 mx-5">
        <ModalSuccess
          id="verified_otp"
          title="Your Phone Verified"
          description=" One more step to unlock full access. Create your account to register
        in this website!"
          onClick={() => setFormRegister(true)}
        />
        <ModalSuccess
          id="sent_otp"
          title="We sent an OTP to your Phone Number"
          description="Please check your short message and input the OTP Number to continue register"
          onClick={() => setFormOtp(true)}
        />
      </div>
    </div>
  );
}

export default Register;
