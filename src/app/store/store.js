"use client";

import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./reducers/userReducer";
import regionReducer from "./reducers/regionReducer";
import serviceReducer from "./reducers/serviceReducer";
import applicationReducer from "./reducers/applicationReducer";
const store = configureStore({
  reducer: {
    userReducer,
    regionReducer,
    serviceReducer,
    applicationReducer,
  },
});

export default store;
