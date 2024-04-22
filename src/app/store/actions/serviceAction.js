import axios from "axios";
import { GET_SERVICES_TYPE, LOADING_FALSE, GET_SERVICES } from "./action_type";
import { loading } from "./regionAction";

export const getServiceTypeSuccess = (payload) => {
  return { type: GET_SERVICES_TYPE, payload };
};

export const getServiceSuccess = (payload) => {
  return { type: GET_SERVICES, payload };
};

export const getServicesHandler = (id, access_token) => {
  return async (dispatch) => {
    dispatch(loading());
    try {
      const { data } = await axios({
        url: `https://api.ardhiansyah.com/services?serviceTypeId=${id}`,
        headers: {
          "ngrok-skip-browser-warning": true,
          accept: "application/json",
          Authorization: access_token,
        },
      });
      dispatch(getServiceSuccess(data.data));
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

export const getServicesTypeHandler = () => {
  return async (dispatch) => {
    try {
      const { data } = await axios({
        url: `https://api.ardhiansyah.com/services/type`,
        headers: {
          "ngrok-skip-browser-warning": true,
          accept: "application/json",
        },
      });

      dispatch(getServiceTypeSuccess(data.data));
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
