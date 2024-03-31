import {
  GET_SERVICES,
  GET_SERVICES_TYPE,
  LOGOUT,
} from "../actions/action_type";

const initialState = {
  servicesType: null,
  services: null,
};

const serviceReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_SERVICES_TYPE:
      return {
        ...state,
        servicesType: action.payload,
      };

    case GET_SERVICES:
      return {
        ...state,
        services: action.payload,
      };

    default:
      return state;
  }
};

export default serviceReducer;
