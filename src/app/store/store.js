"use client";

import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./reducers/userReducer";
import regionReducer from "./reducers/regionReducer";
import serviceReducer from "./reducers/serviceReducer";
import applicationReducer from "./reducers/applicationReducer";
import appointmentReducer from "./reducers/appointmentReducer";
import languageReducer from "./reducers/languageReducer";
const store = configureStore({
  reducer: {
    userReducer,
    regionReducer,
    serviceReducer,
    applicationReducer,
    appointmentReducer,
    languageReducer,
  },
});

export default store;
