import axios from "axios";
import { LOADING_FALSE } from "./action_type";
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
          console.log(`Files`, file);
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
      throw error;
    }
  };
};
