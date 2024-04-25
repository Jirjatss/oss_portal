import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedLang } from "./store/actions/languageAction";

const useLanguage = () => {
  const { lang } = useSelector((state) => state.languageReducer);

  const getLanguage = () => {
    return lang || "tl";
  };

  const t = (key) => {
    const lang = getLanguage();
    const data = require(`./locales/${lang}.json`);
    return data[key] || key;
  };

  return {
    t,
  };
};

export default useLanguage;
