import {
  GET_APPLICATION_DETAIL,
  GET_APPLICATION_DETAIL_STATUS,
  GET_MY_APPLICATIONS,
} from "../actions/action_type";

const initialState = {
  myApplications: null,
  detailApplication: null,
  detailById: null,
};

const applicationReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_MY_APPLICATIONS:
      return {
        ...state,
        myApplications: action.payload,
        detailById: null,
      };

    case GET_APPLICATION_DETAIL_STATUS:
      return {
        ...state,
        detailApplication: action.payload,
      };

    case GET_APPLICATION_DETAIL:
      return {
        ...state,
        detailById: action.payload,
      };

    default:
      return state;
  }
};

export default applicationReducer;
