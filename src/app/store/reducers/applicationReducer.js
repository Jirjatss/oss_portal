import { GET_MY_APPLICATIONS } from "../actions/action_type";

const initialState = {
  myApplications: null,
};

const applicationReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_MY_APPLICATIONS:
      return {
        ...state,
        myApplications: action.payload,
      };
    default:
      return state;
  }
};

export default applicationReducer;
