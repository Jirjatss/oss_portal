import axios from "axios";
import {
  GET_MY_APPOINTMENT,
  LOADING_FALSE,
  SAVE_APPOINTMENT_DATA,
  SET_APPOINTMENT_SUCCESS,
} from "./action_type";
import { loading } from "./regionAction";
import { url } from "@/app/constant/url";

export const setAppointmentData = (payload) => {
  return { type: SAVE_APPOINTMENT_DATA, payload };
};

export const getMyAppointmentsSuccess = (payload) => {
  return { type: GET_MY_APPOINTMENT, payload };
};

export const getMyAppointments = (access_token) => {
  return async (dispatch) => {
    dispatch(loading());
    try {
      const { data } = await axios({
        url: `${url}/me/appointments`,
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      });
      dispatch(getMyAppointmentsSuccess(data.data));
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

export const setAppointmentSuccess = () => {
  return { type: SET_APPOINTMENT_SUCCESS };
};

export const setAppointment = (val, access_token) => {
  return async (dispatch) => {
    dispatch(loading());
    try {
      if (access_token) {
        const { data } = await axios({
          method: "POST",
          url: `${url}/appointments`,
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
          data: val,
        });
        dispatch(setAppointmentSuccess());
      } else {
        const { data } = await axios({
          method: "POST",
          url: `${url}/appointments`,
          data: val,
        });
      }

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

export const rescheduleAppointment = (id, val, access_token) => {
  return async (dispatch) => {
    dispatch(loading());
    try {
      // console.log(id, val, access_token);
      const { data } = await axios({
        method: "PUT",
        url: `${url}/appointments/${id}`,
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
        data: val,
      });
      dispatch(getMyAppointments(access_token));
      dispatch({
        type: LOADING_FALSE,
      });
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
};
