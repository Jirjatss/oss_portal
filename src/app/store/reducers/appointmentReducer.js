import {
  GET_MY_APPOINTMENT,
  SAVE_APPOINTMENT_DATA,
  SET_APPOINTMENT_SUCCESS,
} from "../actions/action_type";

const initialState = {
  myAppointments: null,
  appointmentData: null,
};

const appointmentReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_MY_APPOINTMENT:
      return {
        ...state,
        myAppointments: action.payload,
      };

    case SAVE_APPOINTMENT_DATA:
      return {
        ...state,
        appointmentData: action.payload,
      };

    case SET_APPOINTMENT_SUCCESS:
      return {
        ...state,
        appointmentData: null,
      };

    default:
      return state;
  }
};

export default appointmentReducer;
