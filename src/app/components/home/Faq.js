"use client";
import ReactHtmlParser from "react-html-parser";
import { useState } from "react";
import { OSSIcons } from "../../../../public/assets/icons/parent";
import FormFaq from "../Form/FormFaq";

function Faq() {
  const [selectedIndex, setSelectedIndex] = useState(-1);

  const [message, setMessage] = useState("");

  const topic = [
    {
      topic: "Applicant",
    },
    {
      topic: "Officer",
    },
  ];
  const questions = [
    {
      question:
        "What is the usual processing time for government applications?",
      answer:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
    },
    {
      question: "Which documents are mandatory for a government applicant?",
      answer:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
    },
    {
      question: "How can applicants track the status of their submissions?",
      answer:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
    },
    {
      question:
        "What is the usual processing time for government applications?",
      answer:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
    },
    {
      question:
        "What is the usual processing time for government applications?",
      answer:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
    },
  ];

  const handleChangeMessage = (e) => {
    const value = e.target.value;
    if (value.length <= 240) {
      setMessage(value);
    }
  };

  return (
    <div
      className=" px-28 grid grid-cols-2 justify-between gap-10 py-24"
      id="contact-us"
    >
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
      <FormFaq
        topic={topic}
        message={message}
        handleChangeMessage={handleChangeMessage}
      />
    </div>
  );
}

export default Faq;
