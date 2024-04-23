"use client";

import React, { useState } from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import CheckIcon from "@mui/icons-material/Check";

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

  const listTopic = (topic || []).map((e) => ({
    name: isSeparate
      ? e.name
          ?.split("-")
          .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
          .join(" ")
      : e.name,
    id: e.id,
    value: e.code,
  }));

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
                label === "Office Representative" ||
                label === "Office Location" ||
                label === "Town"
              ) {
                return item.id === selectedTopic;
              } else return item.value === selectedTopic;
            })
              ? listTopic
                  .filter((item) => {
                    if (
                      label === "Office Location" ||
                      label === "Office Representative" ||
                      label === "Town"
                    ) {
                      return item.id === selectedTopic;
                    } else return item.value === selectedTopic;
                  })
                  .map((filteredItem, index) => (
                    <p key={index + filteredItem.name}>{filteredItem.name}</p>
                  ))
              : `Please Select ${label}`}
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
                  label === "Office Location" ||
                  label === "Office Representative" ||
                  label === "Town"
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
                label === "Office Location" || label === "Office Representative"
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
