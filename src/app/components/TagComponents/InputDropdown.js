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
    name: isSeparate ? e.name?.replace("-", " ") : e.name,
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
            borderBottom: "1px solid #F0F0F0",
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
            className={`-ml-2 capitalize text-start  text-[18px] ${
              selectedTopic ? "text-[#2E2D2D]" : "text-gray-400"
            }`}
            style={{ textAlign: "left" }}
          >
            {selectedTopic &&
            listTopic.some((item) => item.value === selectedTopic)
              ? listTopic
                  .filter((item) => item.value === selectedTopic)
                  .map((filteredItem, index) => (
                    <p key={index}>{filteredItem.name}</p>
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
              className="text-gray-900 w-full text-start"
              key={e.name + idx}
              onClick={() => handleChangeTopic({ name: name, value: e.value })}
              sx={{
                backgroundColor:
                  selectedTopic === e.name
                    ? "transparent !important"
                    : "inherit",
                fontWeight: selectedTopic === e.name ? "bold" : "normal",
              }}
              selected={selectedTopic === e.name}
            >
              <div className="flex gap-3">
                {e.name}
                {selectedTopic === e.name && <CheckIcon fontSize="small" />}
              </div>
            </MenuItem>
          ))}
        </Menu>
      </div>
    </div>
  );
}

export default InputDropdown;
