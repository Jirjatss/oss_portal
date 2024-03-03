"use client";

import React from "react";
import { Provider } from "react-redux";
import store from "./store/store";
import Navbar from "../app/components/layout/Header";
import Footer from "./components/layout/Footer";

const App = ({ children }) => {
  return (
    <Provider store={store}>
      <Navbar />
      {children}
      <Footer />
    </Provider>
  );
};

export default App;
