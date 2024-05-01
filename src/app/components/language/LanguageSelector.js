import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import CheckIcon from "@mui/icons-material/Check";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setLang } from "@/app/store/actions/languageAction";

// import { useTranslation } from "react-i18next";

const LanguageSelector = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  // const { i18n } = useTranslation();
  // const { setLanguage } = useLanguage();
  const dispatch = useDispatch();
  const { lang } = useSelector((state) => state.languageReducer);
  const [selectedLanguage, setSelectedLanguage] = useState(lang);

  const languages = [
    // {
    //   lang: "en",
    //   label: "EN",
    // },
    {
      lang: "tl",
      label: "TL",
    },
  ];

  const handleClick = (e) => {
    setAnchorEl(e.currentTarget);
    setMenuOpen(!menuOpen);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setMenuOpen(false);
  };

  const handleChangeLanguage = (lng) => {
    // console.log(lng.lang);
    dispatch(setLang(lng.lang));
    // setLanguage(lng.lang);
    setSelectedLanguage(lng.lang);
    handleClose();
  };

  return (
    <div>
      <Button
        id="demo-positioned-button"
        variant="text"
        aria-controls={menuOpen ? "demo-positioned-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={menuOpen ? "true" : undefined}
        onClick={handleClick}
        className="text-gray-900 text-[16px] font-semibold"
        endIcon={menuOpen ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
      >
        {selectedLanguage}
      </Button>
      <Menu
        id="demo-positioned-menu"
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
      >
        {languages.map((lng) => (
          <MenuItem
            key={lng.lang}
            onClick={() => handleChangeLanguage(lng)}
            sx={{
              backgroundColor:
                selectedLanguage === lng.lang
                  ? "transparent !important"
                  : "inherit",
              fontWeight: selectedLanguage === lng.lang ? "bold" : "normal",
            }}
            selected={selectedLanguage === lng.lang}
          >
            <div className="flex gap-3">
              {lng.label}
              {selectedLanguage === lng.lang && <CheckIcon fontSize="small" />}
            </div>
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
};

export default LanguageSelector;
