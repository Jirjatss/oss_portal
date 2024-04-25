import { GET_LANG, SET_LANG } from "../actions/action_type";

const initialState = {
  lang: "tl",
};

const languageReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_LANG:
      return {
        ...state,
        lang: action.payload,
      };

    default:
      return state;
  }
};

export default languageReducer;
