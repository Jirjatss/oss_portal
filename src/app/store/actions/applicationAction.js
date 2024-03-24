import axios from "axios";
import { GET_MY_APPLICATIONS, LOADING_FALSE } from "./action_type";
import { loading } from "./regionAction";

export const submitApplication = (val, access_token) => {
  return async (dispatch) => {
    dispatch(loading());
    try {
      if (val) {
        const formData = new FormData();

        Object.keys(val).forEach((key) => {
          if (key !== "Files") {
            console.log(key, val[key], "atas");
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
