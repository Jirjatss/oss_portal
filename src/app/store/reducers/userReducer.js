import {
  GET_USER,
  GET_USER_INFORMATION,
  LOADING,
  LOADING_FALSE,
  LOGIN_FAILED,
  LOGOUT,
  REQUEST_OTP,
  VERIFY_OTP,
} from "../actions/action_type";

const initialState = {
  loading: false,
  profile: null,
  user: null,
  dataRegister: null,
};

const userReducer = (state = initialState, action) => {
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

    case LOGIN_FAILED:
      return {
        ...state,
        loading: false,
      };

    case GET_USER:
      return {
        ...state,
        user: action.payload,
        loading: false,
      };

    case GET_USER_INFORMATION:
      return {
        ...state,
        profile: action.payload,
        loading: false,
      };

    case LOGOUT:
      return {
        loading: false,
        user: null,
        profile: null,
      };

    case REQUEST_OTP:
      return {
        ...state,
        dataRegister: action.payload,
        loading: false,
      };

    case VERIFY_OTP:
      return {
        ...state,
        loading: false,
      };

    default:
      return state;
  }
};

export default userReducer;
