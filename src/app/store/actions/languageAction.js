import { SET_LANG } from "./action_type";

export const setSelectedLangSuccess = (payload) => {
  return {
    type: SET_LANG,
    payload,
  };
};

export const setLang = (lang) => {
  return async (dispatch) => {
    try {
      return dispatch(setSelectedLangSuccess(lang));
    } catch (error) {
      console.log(error);
    }
  };
};
