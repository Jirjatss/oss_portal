"use client";

import Image from "next/image";
import React, { useState } from "react";
import FormLogin from "../components/Form/FormLogin";
import FormForgotPassword from "../components/Form/FormForgotPassword";
import ModalSendLinkPassword from "../components/Modal/ModalSendLinkPassword";
import FormResetPassword from "../components/Form/FormResetPassword";
import ModalSuccessResetPassword from "../components/Modal/ModalSuccessResetPassword";
import { useSelector } from "react-redux";
import Loader from "../components/Loader";
import ModalSuccess from "../components/Modal/ModalSuccess";

function Login() {
  const { loading } = useSelector((state) => state.userReducer);
  const [formForgotPassword, setFormForgotPassword] = useState(false);
  const [formResetPassword, setFormResetPassword] = useState(false);

  const showModalSentLink = () => {
    modalLink.showModal();
  };

  const showModalSuccessResetPassword = () => {
    successResetPassword.showModal();
  };

  return (
    <>
      {loading && <Loader message="Please wait, your login in progress..." />}

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
        <div className="lg:mx-0 mx-5">
          <ModalSendLinkPassword onClick={() => setFormResetPassword(true)} />
          <ModalSuccess
            id={"successResetPassword"}
            title={"Password successfully reset"}
            description={"Please log in again with the new password"}
            onClick={() => {
              setFormForgotPassword(false);
              setFormResetPassword(false);
            }}
          />
        </div>
      </div>
    </>
  );
}

export default Login;
