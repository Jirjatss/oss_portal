import { GET_USER, GET_USER_INFORMATION, LOGIN, LOGOUT } from "../actions";

const initialState = {
  loading: false,
  profile: null,
  user: null,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_USER:
      return {
        ...state,
        user: action.payload,
      };

    case GET_USER_INFORMATION:
      return {
        ...state,
        profile: action.payload,
      };

    case LOGOUT:
      return {
        loading: false,
        user: null,
        profile: null,
      };

    case LOGIN:
      return {
        loading: false,
      };
    default:
      return state;
  }
};

export default userReducer;
