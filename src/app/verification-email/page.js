"use client";

import axios from "axios";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { activateUser, getUserInformation } from "../store/actions/userAction";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";
import { toast } from "sonner";
import useSignIn from "react-auth-kit/hooks/useSignIn";
import { url } from "../constant/url";

function VerificationEmail() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const user = useAuthUser();
  const [successVerif, setSuccessVerif] = useState(false);
  const dispatch = useDispatch();
  const signIn = useSignIn();

  const refreshToken = async () => {
    try {
      const object = {
        accessToken: user?.accessToken,
        refreshToken: user?.refreshToken,
      };
      const { data } = await axios.post(`${url}/auth/refresh-token`, object);
      signIn({
        auth: {
          token: data?.data.accessToken,
          type: "Bearer",
        },
        refresh: data?.data.refreshToken,
        userState: data.data,
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (successVerif && user) {
      window.location.href = "/";
    }
    if (successVerif && !user) {
      window.location.href = "/login";
    }
  }, [successVerif]);

  useEffect(() => {
    dispatch(activateUser(token))
      .then(() => {
        setSuccessVerif(true);
        refreshToken();
      })
      .catch((err) => toast.error("Failed to verification your email"));
  }, []);

  return <div className="bg-white min-h-screen flex lg:px-28 px-5 pt-4"></div>;
}

export default VerificationEmail;
