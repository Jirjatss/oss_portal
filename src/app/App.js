"use client";

import { useEffect } from "react";
import Navbar from "../app/components/layout/Header";
import Footer from "./components/layout/Footer";
import { Provider } from "react-redux";
import store from "./store/store";
import { Toaster } from "sonner";
import createStore from "react-auth-kit/createStore";
import AuthProvider from "react-auth-kit/AuthProvider";
import createRefresh from "react-auth-kit/createRefresh";
import axios from "axios";

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

  const refresh = createRefresh({
    interval: 2,
    refreshApiCallback: async (param) => {
      try {
        const object = {
          accessToken: param.authToken,
          refreshToken: param.refreshToken,
        };
        const { data } = await axios.post(
          "https://api.ardhiansyah.com/auth/refresh-token",
          object
        );

        return {
          isSuccess: true,
          newAuthToken: data.data.accessToken,
          newAuthTokenExpireIn: 3,
          newRefreshTokenExpiresIn: 5,
        };
      } catch (error) {
        console.error(error);
        return {
          isSuccess: false,
        };
      }
    },
  });

  const storeKit = createStore({
    authName: "__auth",
    authType: "cookie",
    cookieDomain:
      typeof window !== "undefined"
        ? window.location.hostname
        : "http://localhost:3000",
    refresh: refresh,
    cookieSecure: false,
  });

  return (
    <AuthProvider store={storeKit}>
      <Provider store={store}>
        <Navbar />
        {children}
        <Toaster position="bottom-left" richColors />
        <Footer />
      </Provider>
    </AuthProvider>
  );
};

export default App;
