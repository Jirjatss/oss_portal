"use client";

import Image from "next/image";
import React, { useState } from "react";
import FormLogin from "../components/Form/FormLogin";
import FormForgotPassword from "../components/Form/FormForgotPassword";
import ModalSendLinkPassword from "../components/Modal/ModalSendLinkPassword";
import FormResetPassword from "../components/Form/FormResetPassword";
import ModalSuccessResetPassword from "../components/Modal/ModalSuccessResetPassword";

function Login() {
  const [password, setPassword] = useState("");
  const [reenterPassword, setReenterPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showReenterPassword, setShowReenterPassword] = useState(false);
  const [formForgotPassword, setFormForgotPassword] = useState(false);

  const toggleReenterPasswordVisibility = () => {
    setShowReenterPassword(!showReenterPassword);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const [formResetPassword, setFormResetPassword] = useState(false);

  const showModalSentLink = () => {
    modalLink.showModal();
  };

  const showModalSuccessResetPassword = () => {
    successResetPassword.showModal();
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
      {formForgotPassword && !formResetPassword ? (
        <FormForgotPassword
          onClick={() => setFormForgotPassword(false)}
          onClickSubmit={showModalSentLink}
        />
      ) : formResetPassword ? (
        <FormResetPassword
          back={() => {
            setPassword("");
            setReenterPassword("");
            setFormForgotPassword(true);
            setFormResetPassword(false);
          }}
          password={password}
          showPassword={showPassword}
          onClickShowPassword={togglePasswordVisibility}
          onChangePassword={(e) => setPassword(e.target.value)}
          reenterPassword={reenterPassword}
          showReenterPassword={showReenterPassword}
          onClickReenterPassword={toggleReenterPasswordVisibility}
          onChangeReenterPassword={(e) => setReenterPassword(e.target.value)}
          onSubmit={() => {
            setPassword("");
            setReenterPassword("");
            showModalSuccessResetPassword();
          }}
        />
      ) : (
        <FormLogin
          onClick={togglePasswordVisibility}
          password={password}
          onChange={(e) => setPassword(e.target.value)}
          showPassword={showPassword}
          forgotPassword={() => setFormForgotPassword(true)}
        />
      )}

      <ModalSendLinkPassword onClick={() => setFormResetPassword(true)} />
      <ModalSuccessResetPassword
        onClick={() => {
          setFormForgotPassword(false);
          setFormResetPassword(false);
        }}
      />
    </div>
  );
}

export default Login;
