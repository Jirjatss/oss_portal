"use client";

import React, { useState } from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import CheckIcon from "@mui/icons-material/Check";

function InputDropdown({ label, topic, onChange }) {
  const [selectedTopic, setSelectedTopic] = useState("");
  const [anchorEl, setAnchorEl] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);

  const handleClick = (e) => {
    setAnchorEl(e.currentTarget);
    setMenuOpen(!menuOpen);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setMenuOpen(false);
  };

  const handleChangeTopic = (e) => {
    setSelectedTopic(e.topic);
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
          id="demo-positioned-button"
          variant="text"
          aria-controls={menuOpen ? "demo-positioned-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={menuOpen ? "true" : undefined}
          onClick={handleClick}
          className="text-black w-full text-start"
          sx={{
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
              selectedTopic ? "text-[#2E2D2D]" : "text-[#646464]"
            }`}
            style={{ textAlign: "left" }}
          >
            {selectedTopic ? selectedTopic : `Select ${label}`}
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
          {topic.map((e) => (
            <MenuItem
              className="text-gray-900 w-full text-start"
              key={e.topic}
              onClick={() => handleChangeTopic(e)}
              sx={{
                backgroundColor:
                  selectedTopic === e.topic
                    ? "transparent !important"
                    : "inherit",
                fontWeight: selectedTopic === e.topic ? "bold" : "normal",
              }}
              selected={selectedTopic === e.topic}
            >
              <div className="flex gap-3">
                {e.topic}
                {selectedTopic === e.topic && <CheckIcon fontSize="small" />}
              </div>
            </MenuItem>
          ))}
        </Menu>
      </div>
    </div>
  );
}

export default InputDropdown;
