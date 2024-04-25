import { useEffect } from "react";
import { useSelector } from "react-redux";

const defaultLanguage = "tl";

const useLanguage = () => {
  const { lang } = useSelector((state) => state.languageReducer);
  const setLanguage = (lang = "tl") => {
    localStorage.setItem("lang", lang);
  };

  const getLanguage = () => {
    return localStorage.getItem("lang") || "tl";
  };

  const t = (key) => {
    const lang = getLanguage();
    const data = require(`../locales/${lang}.json`);
    return data[key] || key;
  };

  useEffect(() => {
    if (!getLanguage()) {
      setLanguage(defaultLanguage);
    }
  }, []);

  return {
    t,
    setLanguage,
    getLanguage,
  };
};

export default useLanguage;
