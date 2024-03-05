"use client";

import Image from "next/image";
import React, { useState } from "react";
import FormLogin from "../components/Form/FormLogin";
import FormForgotPassword from "../components/Form/FormForgotPassword";
import ModalSendLinkPassword from "../components/Modal/ModalSendLinkPassword";
import FormResetPassword from "../components/Form/FormResetPassword";
import ModalSuccessResetPassword from "../components/Modal/ModalSuccessResetPassword";
import { useRouter } from "next/navigation";

function Login() {
  const [formForgotPassword, setFormForgotPassword] = useState(false);
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
            setFormForgotPassword(true);
            setFormResetPassword(false);
          }}
          onSubmit={() => {
            showModalSuccessResetPassword();
          }}
        />
      ) : (
        <FormLogin forgotPassword={() => setFormForgotPassword(true)} />
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
