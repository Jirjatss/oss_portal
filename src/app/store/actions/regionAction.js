import axios from "axios";
import {
  GET_REGION_COUNTRY_SUCCESS,
  GET_REGION_MUNICIPALITY_SUCCESS,
  GET_REGION_POST_ADMINISTRATIVE_SUCCESS,
  GET_REGION_SUCOS,
  LOADING,
  LOADING_FALSE,
  LOGOUT,
} from "./action_type";

export const loading = () => {
  return { type: LOADING };
};

export const getRegionCountrySuccess = (payload) => {
  return { type: GET_REGION_COUNTRY_SUCCESS, payload };
};

export const getRegionCountry = (access_token) => {
  return async (dispatch) => {
    // dispatch(loading());
    try {
      const { data } = await axios({
        url: "https://api.ardhiansyah.com/regions/country",
        headers: {
          "ngrok-skip-browser-warning": true,
          accept: "application/json",
          Authorization: `Bearer ${access_token}`,
        },
      });
      dispatch(getRegionCountrySuccess(data.data));
    } catch (error) {
      dispatch({
        type: LOADING_FALSE,
      });
      console.log(error);
      throw error;
    }
  };
};

export const getRegionMunicipalitySuccess = (payload) => {
  return { type: GET_REGION_MUNICIPALITY_SUCCESS, payload };
};

export const getRegionMunicipality = (access_token) => {
  return async (dispatch) => {
    // dispatch(loading());
    try {
      const { data } = await axios({
        url: "https://api.ardhiansyah.com/regions/state",
        headers: {
          "ngrok-skip-browser-warning": true,
          accept: "application/json",
          // Authorization: `Bearer ${access_token}`,
        },
      });
      dispatch(getRegionMunicipalitySuccess(data.data));
    } catch (error) {
      dispatch({
        type: LOADING_FALSE,
      });
      throw error;
    }
  };
};

export const getRegionPostAdministrativeSuccess = (payload) => {
  return { type: GET_REGION_POST_ADMINISTRATIVE_SUCCESS, payload };
};

export const getRegionPostAdministrative = (access_token, query) => {
  return async (dispatch) => {
    // dispatch(loading());
    try {
      const { data } = await axios({
        url: `https://api.ardhiansyah.com/regions/district?${query}`,
        headers: {
          "ngrok-skip-browser-warning": true,
          accept: "application/json",
          Authorization: `Bearer ${access_token}`,
        },
      });
      dispatch(getRegionPostAdministrativeSuccess(data.data));
    } catch (error) {
      dispatch({
        type: LOADING_FALSE,
      });
      throw error;
    }
  };
};

export const getRegionSucosSuccess = (payload) => {
  return { type: GET_REGION_SUCOS, payload };
};

export const getRegionSucos = (access_token, query) => {
  return async (dispatch) => {
    // dispatch(loading());
    try {
      const { data } = await axios({
        url: `https://api.ardhiansyah.com/regions/sub-district?${query}`,
        headers: {
          "ngrok-skip-browser-warning": true,
          accept: "application/json",
          Authorization: `Bearer ${access_token}`,
        },
      });
      dispatch(getRegionSucosSuccess(data.data));
    } catch (error) {
      dispatch({
        type: LOADING_FALSE,
      });
      throw error;
    }
  };
};
