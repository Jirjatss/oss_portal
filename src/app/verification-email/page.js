"use client";

import axios from "axios";
import { useRouter, useSearchParams } from "next/navigation";
import React from "react";
import { useDispatch } from "react-redux";
import { activateUser, getUserInformation } from "../store/actions/userAction";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";
import { toast } from "sonner";

function VerificationEmail() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const user = useAuthUser();
  const router = useRouter();

  const dispatch = useDispatch();

  return (
    <div className="bg-white min-h-screen flex lg:px-28 px-5 pt-4">
      <div
        onClick={() => {
          dispatch(activateUser(token, user?.access_token))
            .then(() => {
              dispatch(getUserInformation(user?.access_token));
              router.push("/");
            })
            .catch((err) => toast.error("Failed to verification your email"));
        }}
        className="text-blue-700 cursor-pointer"
      >
        Verification your email
      </div>
    </div>
  );
}

export default VerificationEmail;
