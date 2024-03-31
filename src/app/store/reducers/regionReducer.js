import {
  GET_REGION_COUNTRY_SUCCESS,
  GET_REGION_MUNICIPALITY_SUCCESS,
  GET_REGION_POST_ADMINISTRATIVE_SUCCESS,
  GET_REGION_SUCOS,
  LOADING,
  LOADING_FALSE,
  LOGOUT,
} from "../actions/action_type";

const initialState = {
  gender: null,
  region: null,
  loading: false,
  municipality: null,
  city: null,
  town: null,
};

const formReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOADING:
      return {
        ...state,
        loading: true,
      };

    case LOADING_FALSE:
      return {
        ...state,
        loading: false,
      };

    case GET_REGION_COUNTRY_SUCCESS:
      return {
        ...state,
        loading: false,
        region: action.payload,
      };

    case GET_REGION_MUNICIPALITY_SUCCESS:
      return {
        ...state,
        municipality: action.payload,
        loading: false,
      };

    case GET_REGION_POST_ADMINISTRATIVE_SUCCESS:
      return {
        ...state,
        city: action.payload,
        loading: false,
      };

    case GET_REGION_SUCOS:
      return {
        ...state,
        town: action.payload,
        loading: false,
      };

    default:
      return state;
  }
};

export default formReducer;
