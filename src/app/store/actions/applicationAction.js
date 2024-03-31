import axios from "axios";
import {
  GET_APPLICATION_DETAIL,
  GET_APPLICATION_DETAIL_STATUS,
  GET_MY_APPLICATIONS,
  LOADING_FALSE,
} from "./action_type";
import { loading } from "./regionAction";

export const submitApplication = (val, access_token) => {
  return async (dispatch) => {
    dispatch(loading());
    try {
      if (val) {
        const formData = new FormData();

        Object.keys(val).forEach((key) => {
          if (key !== "Files") {
            formData.append(key, val[key]);
          }
        });

        val.Files.forEach((file) => {
          formData.append(`Files`, file);
        });

        const { data } = await axios.post(
          "https://api.ardhiansyah.com/applications",
          formData,
          {
            headers: {
              Authorization: `Bearer ${access_token}`,
            },
          }
        );
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

export const editMyApplication = (id, val, access_token) => {
  return async (dispatch) => {
    dispatch(loading());
    try {
      const formData = new FormData();

      val.forEach((file) => {
        console.log(file, "ini");
        formData.append(`Files`, file);
      });

      const { data } = await axios.put(
        `https://api.ardhiansyah.com/applications/${id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        }
      );
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

export const getMyApplications = (access_token) => {
  return async (dispatch) => {
    dispatch(loading());
    try {
      const { data } = await axios({
        url: "https://api.ardhiansyah.com/me/applications",
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      });
      dispatch({
        type: GET_MY_APPLICATIONS,
        payload: data.data,
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

export const getDetailApplicationStatusSuccess = (payload) => {
  return { type: GET_APPLICATION_DETAIL_STATUS, payload };
};

export const getDetailApplicationStatus = (id, access_token) => {
  return async (dispatch) => {
    dispatch(loading());
    try {
      const { data } = await axios({
        url: `https://api.ardhiansyah.com/me/applications/${id}/log`,
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      });
      dispatch(getDetailApplicationStatusSuccess(data.data));
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

export const getDetailApplicationSuccess = (payload) => {
  return { type: GET_APPLICATION_DETAIL, payload };
};

export const getDetailApplication = (id, access_token) => {
  return async (dispatch) => {
    try {
      const { data } = await axios({
        url: `https://api.ardhiansyah.com/applications/${id}`,
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      });
      dispatch(getDetailApplicationSuccess(data.data));
    } catch (error) {
      dispatch({
        type: LOADING_FALSE,
      });
      throw error;
    }
  };
};
