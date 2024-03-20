import { GET_SERVICES } from "../actions/action_type";

const initialState = {
  services: null,
};

const serviceReducer = (state = initialState, action) => {
  switch (action.type) {
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
