"use client";
import ReactHtmlParser from "react-html-parser";
import { useState } from "react";
import { OSSIcons } from "../../../../public/assets/icons/parent";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import CheckIcon from "@mui/icons-material/Check";

function Faq() {
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const questions = [
    {
      question:
        "What is the usual processing time for government applications?",
      answer:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    },
    {
      question: "Which documents are mandatory for a government applicant?",
      answer:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    },
    {
      question: "How can applicants track the status of their submissions?",
      answer:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    },
    {
      question:
        "What is the usual processing time for government applications?",
      answer:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    },
    {
      question:
        "What is the usual processing time for government applications?",
      answer:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    },
  ];
  const [selectedTopic, setSelectedTopic] = useState("Applicant");
  const [message, setMessage] = useState("");
  const topic = [
    {
      topic: "Applicant",
    },
    {
      topic: "Officer",
    },
  ];
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
  };

  const handleChange = (e) => {
    const value = e.target.value;
    if (value.length <= 240) {
      setMessage(value);
    }
  };

  return (
    <div className="mt-24 px-48 grid grid-cols-2 justify-between gap-10 pb-24">
      <div>
        <h1 className="text-[40px] font-bold capitalize text-[#363131] mb-5">
          frequently asked questions
        </h1>
        <div className="flex flex-col gap-7">
          {questions.map((e, idx) => (
            <div
              className="flex w-full "
              key={idx}
              onClick={() =>
                setSelectedIndex((prev) => (idx === prev ? -1 : idx))
              }
            >
              <div
                className={`flex flex-col w-full ${
                  selectedIndex === idx ? "" : "h-[64px]"
                } border-b border-[#DCDCDC]`}
              >
                <div
                  className={`flex items-center justify-between gap-[15px] `}
                >
                  <p className="text-[18px] text-[#646464] font-semibold">
                    {e.question}
                  </p>
                  <div className="cursor-pointer">
                    <OSSIcons name="Plus" width={24} height={24} />
                  </div>
                </div>
                <div
                  className={` rounded-md bg-white shadow-xs transition-all ease-in-out duration-500 w-[500px] ${
                    selectedIndex === idx ? "max-h-[500px]" : "max-h-0"
                  } overflow-hidden`}
                >
                  <p className="text-[#646464] mb-5 mt-2 text-justify">
                    {ReactHtmlParser(e.answer)}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="border-[1px] border-[#DCDCDC] rounded-[20px] px-10 py-8 flex flex-col gap-8">
        <div className="">
          <h1
            className="text-[32px] text-[#363131] capitalize"
            style={{ fontWeight: 700 }}
          >
            Have a Question?
          </h1>
          <p className="text-[16px] font-thin text-[#646464] mt-2">
            Please leave any questions you have here
          </p>
        </div>
        <div className="flex flex-col gap-6">
          <div className="grid grid-cols-2">
            <div>
              <label className="text-[16px] font-thin text-[#646464] mb-1">
                First Name
              </label>
              <input
                type="text"
                className="border-b-[1px] border-[#F0F0F0] focus:outline-none pb-1 text-[18px] text-[#2E2D2D] placeholder-[#2E2D2D] bg-transparent"
                placeholder="Maria"
              />
            </div>
            <div>
              <label className="text-[16px] font-thin text-[#646464] mb-1">
                Last Name
              </label>
              <input
                type="text"
                className="border-b-[1px] border-[#F0F0F0] focus:outline-none pb-1 text-[18px] text-[#2E2D2D] placeholder-[#2E2D2D] bg-transparent"
                placeholder="Gustao"
              />
            </div>
          </div>
          <div className="flex flex-col">
            <label className="text-[16px] font-thin text-[#646464] mb-1">
              Email
            </label>
            <input
              type="email"
              className="border-b-[1px] border-[#F0F0F0] focus:outline-none pb-1 text-[18px] text-[#2E2D2D] placeholder-[#2E2D2D] bg-transparent"
              placeholder="M_Gustao@mail.com"
            />
          </div>
          <div className="flex flex-col">
            <label className="text-[16px] font-thin text-[#646464] mb-1">
              Topic
            </label>
            <div>
              <Button
                id="demo-positioned-button"
                variant="text"
                aria-controls={menuOpen ? "demo-positioned-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={menuOpen ? "true" : undefined}
                onClick={handleClick}
                className="text-gray-900 w-full text-start"
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
                  className="capitalize text-start  text-[18px] text-[#2E2D2D]"
                  style={{ textAlign: "left" }}
                >
                  {selectedTopic}
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
                      {selectedTopic === e.topic && (
                        <CheckIcon fontSize="small" />
                      )}
                    </div>
                  </MenuItem>
                ))}
              </Menu>
            </div>
          </div>
          <div className="flex flex-col">
            <label className="text-[16px] font-thin text-[#646464] mb-1">
              Feedback
            </label>
            <textarea
              className="border-b-[1px] border-[#F0F0F0] focus:outline-none  text-[18px] text-[#2E2D2D] placeholder-[#2E2D2D] bg-transparent"
              rows="3"
              value={message}
              onChange={handleChange}
              placeholder="What documents are typically required for government applications, and where can applicants check the status of their submissions online?"
              maxLength={240}
            />
            <div className="text-[12px] text-[#646464] mt-2 text-end">
              <b>{message.length}</b>/ 240
            </div>
          </div>
        </div>
        <div>
          <div className="grid grid-cols-2 gap-5">
            <button className="bg-[#1C25E7] px-3 py-3 text-white flex-1 rounded-[8px]">
              <p className="text-[16px]">Submit</p>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Faq;
