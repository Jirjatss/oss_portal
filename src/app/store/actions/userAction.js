import axios from "axios";
import { GET_USER, GET_USER_INFORMATION, LOGIN, LOGOUT } from ".";

const baseUrl = "https://relative-painfully-quagga.ngrok-free.app/auth/";

export const getUserSuccess = (payload) => {
  return { type: GET_USER, payload };
};

export const logoutSuccess = () => {
  return { type: LOGOUT };
};

export const loginSuccess = (payload) => {
  return { type: LOGIN, payload };
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
      console.log(error);
    }
  };
};

export const logout = () => {
  return async (dispatch) => {
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
      throw error;
    }
  };
};

export const getUserInformation = (access_token) => {
  return async (dispatch) => {
    try {
      console.log(access_token);
      const { data } = await axios({
        url: "https://relative-painfully-quagga.ngrok-free.app/me",
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${access_token}`,
        },
        // headers: {

        //   Authorization: `Bearer ${access_token}`,
        // },
      });

      console.log(data, "ini");
      // dispatch(getUserInformationSuccess(data.data));
    } catch (error) {
      console.log(error, "ini error");
      throw error;
    }
  };
};
