"use client";

import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./reducers/userReducer";
import regionReducer from "./reducers/regionReducer";
const store = configureStore({
  reducer: {
    userReducer,
    regionReducer,
  },
});

export default store;
