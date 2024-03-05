"use client";

import { useEffect } from "react";
import Navbar from "../app/components/layout/Header";
import Footer from "./components/layout/Footer";
import { Provider } from "react-redux";
import store from "./store/store";

const App = ({ children }) => {
  useEffect(() => {
    const scrollToTop = () => {
      const scrollStep = -window.scrollY / (500 / 15);
      const scrollInterval = setInterval(() => {
        if (window.scrollY !== 0) {
          window.scrollBy(0, scrollStep);
        } else {
          clearInterval(scrollInterval);
        }
      }, 15);
    };
    scrollToTop();
    return () => {};
  }, []);

  return (
    <Provider store={store}>
      <Navbar />
      {children}
      <Footer />
    </Provider>
  );
};

export default App;
