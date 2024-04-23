import axios from "axios";
import {
  GET_TOKEN,
  GET_USER,
  GET_USER_INFORMATION,
  HIDE_VERIF,
  LOADING_FALSE,
  LOGIN_FAILED,
  LOGIN_SUCCESS,
  LOGOUT,
  REQUEST_OTP,
  SAVE_PERSONAL_INFORMATIONS,
  SHOW_VERIF,
} from "./action_type";
import { loading } from "./regionAction";

export const getUserSuccess = (payload) => {
  return { type: GET_USER, payload };
};

export const logoutSuccess = () => {
  return { type: LOGOUT };
};

export const getUserInformationSuccess = (payload) => {
  return { type: GET_USER_INFORMATION, payload };
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

export const showVerif = () => {
  return { type: SHOW_VERIF };
};
export const hideVerif = () => {
  return { type: HIDE_VERIF };
};

export const login = (val, signIn) => {
  return async (dispatch) => {
    dispatch(loading());
    try {
      const { data } = await axios({
        method: "post",
        url: "https://api.ardhiansyah.com/auth/login",
        data: val,
      });
      if (
        signIn({
          auth: {
            token: data?.data.accessToken,
            type: "Bearer",
          },
          refresh: data?.data.refreshToken,
          userState: data.data,
        })
      ) {
        dispatch({
          type: LOGIN_SUCCESS,
        });
        dispatch(showVerif());
      } else {
        dispatch({
          type: LOGIN_FAILED,
        });
      }
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
        url: "https://api.ardhiansyah.com/me",
        headers: {
          accept: "application/json",
          Authorization: access_token,
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
        url: "https://api.ardhiansyah.com/auth/otp/request",
        data: {
          phoneNumber: phone_number,
        },
      });
      dispatch({
        type: LOADING_FALSE,
      });
      dispatch(requestOtpSuccess(data.data));
    } catch (error) {
      console.log(error);
      dispatch({
        type: LOADING_FALSE,
      });
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
        url: "https://api.ardhiansyah.com/auth/otp/verify",
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

export const registerHandler = (val, signIn) => {
  return async (dispatch) => {
    dispatch(loading());
    try {
      const { data } = await axios({
        method: "POST",
        url: "https://api.ardhiansyah.com/auth/register",
        data: val,
      });
      const loginVal = {
        email: val.email,
        password: val.password,
      };
      dispatch({
        type: LOADING_FALSE,
      });
      dispatch(login(loginVal, signIn));
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
      const { data } = await axios({
        method: "POST",
        url: "https://api.ardhiansyah.com/auth/activate",
        headers: {
          "ngrok-skip-browser-warning": true,
          accept: "application/json",
          "Content-Type": "application/json",
          Authorization: accessToken,
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
      throw error;
    }
  };
};

export const savePersonalInformation = (payload) => {
  return { type: SAVE_PERSONAL_INFORMATIONS, payload };
};

export const submitPersonalInformations = (val, access_token) => {
  return async (dispatch) => {
    dispatch(loading());
    try {
      if (val) {
        const formData = new FormData();
        Object.entries(val).forEach(([key, value]) => {
          formData.append(key, value);
        });

        const { data } = await axios.put(
          "https://api.ardhiansyah.com/personal-informations",
          formData,
          {
            headers: {
              Authorization: `${access_token}`,
            },
          }
        );
        dispatch(getUserInformation(access_token));
        dispatch({
          type: LOADING_FALSE,
        });
      }
    } catch (error) {
      dispatch({
        type: LOADING_FALSE,
      });
      console.log(error);
    }
  };
};

export const editProfile = (val, access_token) => {
  return async (dispatch) => {
    dispatch(loading());
    try {
      if (val) {
        const formData = new FormData();
        Object.entries(val).forEach(([key, value]) => {
          formData.append(key, value);
        });

        const { data } = await axios.put(
          "https://api.ardhiansyah.com/personal-informations",
          formData,
          {
            headers: {
              Authorization: `${access_token}`,
            },
          }
        );
        dispatch(getUserInformation(access_token));
        dispatch({
          type: LOADING_FALSE,
        });
      }
    } catch (error) {
      dispatch({
        type: LOADING_FALSE,
      });
      throw error;
    }
  };
};

export const getTokenSuccess = (payload) => {
  return {
    type: GET_TOKEN,
    payload,
  };
};

export const getTokenHandler = (access_token) => {
  return async (dispatch) => {
    dispatch(loading());
    try {
      const { data } = await axios({
        url: "https://api.ardhiansyah.com/auth/resend-activation-token",
        headers: {
          Authorization: `${access_token}`,
        },
      });
      // dispatch(getTokenSuccess(data.data));
      dispatch({
        type: LOADING_FALSE,
      });
      return data.data;
    } catch (error) {
      dispatch({
        type: LOADING_FALSE,
      });
      throw error;
    }
  };
};

export const forgotPasswordSuccess = (payload) => {
  return {
    type: GET_TOKEN,
    payload,
  };
};

export const forgotPasswordHandler = (email) => {
  return async (dispatch) => {
    dispatch(loading());
    try {
      const { data } = await axios({
        method: "POST",
        url: "https://api.ardhiansyah.com/auth/forget-password",
        data: { email: email },
      });

      dispatch({
        type: LOADING_FALSE,
      });
      dispatch(forgotPasswordSuccess(data.data));
      return data.data;
    } catch (error) {
      dispatch({
        type: LOADING_FALSE,
      });
      console.log(error);
      throw error;
    }
  };
};

export const resetPasswordHandler = (val) => {
  return async (dispatch) => {
    dispatch(loading());
    try {
      // console.log(val);
      const { data } = await axios({
        method: "POST",
        url: "https://api.ardhiansyah.com/auth/reset-password",
        data: val,
      });
      dispatch({
        type: LOADING_FALSE,
      });
      return data.data;
    } catch (error) {
      dispatch({
        type: LOADING_FALSE,
      });
      console.log(error);
      throw error;
    }
  };
};
