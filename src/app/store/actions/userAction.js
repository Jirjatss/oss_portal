import axios from "axios";
import {
  GET_USER,
  GET_USER_INFORMATION,
  LOADING_FALSE,
  LOGIN_FAILED,
  LOGOUT,
  REGISTER_SUCCESS,
  REQUEST_OTP,
  VERIFY_OTP,
} from "./action_type";
import {
  getRegionCountry,
  getRegionMunicipality,
  loading,
} from "./regionAction";

const baseUrl = "https://relative-painfully-quagga.ngrok-free.app/auth/";

export const getUserSuccess = (payload) => {
  return { type: GET_USER, payload };
};

export const logoutSuccess = () => {
  return { type: LOGOUT };
};

export const getUserInformationSuccess = (payload) => {
  return { type: GET_USER_INFORMATION, payload };
};

export const getUser = () => {
  return (dispatch) => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      if (!user) {
        throw new Error("userNotFound");
      }

      dispatch(getUserSuccess(user));
    } catch (error) {
      console.log(error, "disini");
    }
  };
};

export const logout = () => {
  return async (dispatch) => {
    dispatch(loading());
    try {
      localStorage.removeItem("user");
      dispatch(logoutSuccess());
    } catch (error) {
      console.log(error);
    }
  };
};

export const login = (val) => {
  return async (dispatch) => {
    dispatch(loading());
    try {
      const { data } = await axios({
        method: "post",
        url: baseUrl + "login",
        data: val,
      });
      localStorage.setItem("user", JSON.stringify(data.data));
      dispatch(getUserInformation(data.data.accessToken));
      dispatch(getUser());
    } catch (error) {
      dispatch({
        type: LOGIN_FAILED,
      });
      throw error;
    }
  };
};

export const getUserInformation = (access_token) => {
  return async (dispatch) => {
    try {
      const { data } = await axios({
        url: "https://relative-painfully-quagga.ngrok-free.app/me",
        headers: {
          "ngrok-skip-browser-warning": true,
          accept: "application/json",
          Authorization: `Bearer ${access_token}`,
        },
      });
      dispatch(getUserInformationSuccess(data.data));
    } catch (error) {
      throw error;
    }
  };
};

export const requestOtpSuccess = (payload) => {
  return { type: REQUEST_OTP, payload };
};

export const requestOtp = (phone_number) => {
  return async (dispatch) => {
    dispatch(loading());
    try {
      const { data } = await axios({
        method: "POST",
        url: "https://relative-painfully-quagga.ngrok-free.app/auth/otp/request",
        data: {
          phoneNumber: phone_number,
        },
      });
      dispatch(requestOtpSuccess(data.data));
    } catch (error) {
      throw error;
    }
  };
};

export const verifyOtp = (val) => {
  return async (dispatch) => {
    dispatch(loading());
    try {
      const { data } = await axios({
        method: "POST",
        url: "https://relative-painfully-quagga.ngrok-free.app/auth/otp/verify",
        data: val,
      });
      dispatch({
        type: LOADING_FALSE,
      });
    } catch (error) {
      dispatch({
        type: LOADING_FALSE,
      });
      throw error;
    }
  };
};

export const registerHandler = (val) => {
  return async (dispatch) => {
    dispatch(loading());
    try {
      const { data } = await axios({
        method: "POST",
        url: "https://relative-painfully-quagga.ngrok-free.app/auth/register",
        data: val,
      });
      const loginVal = {
        email: val.email,
        password: val.password,
      };
      dispatch({
        type: LOADING_FALSE,
      });
      dispatch(login(loginVal));
    } catch (error) {
      dispatch({
        type: LOADING_FALSE,
      });
      throw error;
    }
  };
};

export const activateUser = (token, accessToken) => {
  return async (dispatch) => {
    dispatch(loading());
    try {
      console.log(token);
      const { data } = await axios({
        method: "POST",
        url: "https://relative-painfully-quagga.ngrok-free.app/auth/activate",
        headers: {
          "ngrok-skip-browser-warning": true,
          accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        data: {
          token: token,
        },
      });
      dispatch({
        type: LOADING_FALSE,
      });
    } catch (error) {
      dispatch({
        type: LOADING_FALSE,
      });
      console.log(error, "disini");
      throw error;
    }
  };
};
