"use client";

import React, { useState } from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import CheckIcon from "@mui/icons-material/Check";
import useLanguage from "@/app/useLanguage";

function InputDropdown({
  label,
  topic,
  onChange,
  handleChange,
  selectedTopic,
  isDisabled,
  name,
  isSeparate = true,
}) {
  const [anchorEl, setAnchorEl] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const { t } = useLanguage();
  const isDisable = [
    t("country"),
    t("state"),
    t("city"),
    t("town"),
    t("office_location"),
    t("office_representative"),
  ].some((value) => label.includes(value));

  const listTopic = (topic || []).map((e) => {
    let name;
    if (isDisable) {
      name = e.name
        ?.split("-")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");
    } else if (
      [t("applying_for"), t("purpose")].some((val) => label.includes(val))
    ) {
      const splitStrings = e.name.split("-");
      let label = splitStrings[0];
      const title = splitStrings.slice(1).join("-");
      if (label === "new") label = "new_text";
      name = `${t(label)} ${t(`home_menu_${title}_title`)}`;
    } else {
      name = t(`home_menu_${e.name}_title`);
    }
    return {
      name: name,
      id: e.id,
      value: e.code,
    };
  });

  const handleClick = (e) => {
    setAnchorEl(e.currentTarget);
    setMenuOpen(!menuOpen);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setMenuOpen(false);
  };

  const handleChangeTopic = (e) => {
    handleChange(e);
    handleClose();
    if (typeof onChange === "function") {
      onChange(e.topic);
    }
  };
  return (
    <div className="flex flex-col">
      <label className="text-label">{label}</label>
      <div className="-mt-2">
        <Button
          disabled={isDisabled}
          id="demo-positioned-button"
          variant="text"
          aria-controls={menuOpen ? "demo-positioned-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={menuOpen ? "true" : undefined}
          onClick={handleClick}
          className={`text-black w-full text-start`}
          sx={{
            cursor: isDisabled && "not-allowed",
            borderBottom: "1px solid #B0B0B0",
            color: "gray.900",
            justifyContent: "space-between",
            "& .MuiButton-endIcon": {
              marginInlineStart: "auto",
            },
            "&:hover": {
              backgroundColor: "transparent",
            },
          }}
          endIcon={
            menuOpen ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />
          }
        >
          <span
            className={`-ml-2 capitalize text-start  lg:text-[18px] text-[16px] ${
              selectedTopic ? "text-[#2E2D2D]" : "text-gray-400"
            }`}
            style={{ textAlign: "left" }}
          >
            {selectedTopic &&
            listTopic.some((item) => {
              if (
                label === t("office_representative") ||
                label === t("office_location") ||
                label === t("town")
              ) {
                return item.id === selectedTopic;
              } else return item.value === selectedTopic;
            })
              ? listTopic
                  .filter((item) => {
                    if (
                      label === t("office_location") ||
                      label === t("office_representative") ||
                      label === t("town")
                    ) {
                      return item.id === selectedTopic;
                    } else return item.value === selectedTopic;
                  })
                  .map((filteredItem, index) => (
                    <p key={index + filteredItem.name}>{filteredItem.name}</p>
                  ))
              : `${t("select")} ${label}`}
          </span>
        </Button>
        <Menu
          id="demo-positioned-menu"
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          className=""
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
          {listTopic.map((e, idx) => (
            <MenuItem
              className="text-gray-900 w-full text-start lg:text-[18px] text-[16px]"
              key={e.name + idx}
              onClick={() => {
                let value = e.value;
                if (
                  label === t("office_location") ||
                  label === t("office_representative") ||
                  label === t("town")
                )
                  value = e.id;
                handleChangeTopic({ name: name, value: value });
              }}
              sx={{
                backgroundColor:
                  selectedTopic === e.name ||
                  selectedTopic === e.value ||
                  selectedTopic === e.id
                    ? "transparent !important"
                    : "inherit",
                fontWeight:
                  selectedTopic === e.name ||
                  selectedTopic === e.value ||
                  selectedTopic === e.id
                    ? "bold"
                    : "normal",
              }}
              selected={
                label === t("office_location") ||
                label === t("office_representative") ||
                label === t("town")
                  ? selectedTopic === e.id
                  : selectedTopic === e.name
              }
            >
              <div className="flex gap-3">
                {e.name}
                {(selectedTopic === e.name ||
                  selectedTopic === e.value ||
                  selectedTopic === e.id) && <CheckIcon fontSize="small" />}
              </div>
            </MenuItem>
          ))}
        </Menu>
      </div>
    </div>
  );
}

export default InputDropdown;
