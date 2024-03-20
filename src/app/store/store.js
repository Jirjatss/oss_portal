"use client";

import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./reducers/userReducer";
import regionReducer from "./reducers/regionReducer";
import serviceReducer from "./reducers/serviceReducer";
const store = configureStore({
  reducer: {
    userReducer,
    regionReducer,
    serviceReducer,
  },
});

export default store;
