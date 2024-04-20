"use client";
import ReactHtmlParser from "react-html-parser";
import { useState } from "react";
import { OSSIcons } from "../../../../public/assets/icons/parent";
import FormFaq from "../Form/FormFaq";

function Faq() {
  const [selectedIndex, setSelectedIndex] = useState(-1);

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

  return (
    <div
      className="grid lg:grid-cols-2 grid-cols-1 justify-between gap-10 lg:py-24  pt-16"
      id="contact-us"
    >
      <div>
        <h1 className="lg:text-[40px] text-[28px] font-bold capitalize text-[#363131] mb-5">
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
                  selectedIndex === idx ? "" : "lg:h-[64px] h-[55px]"
                } border-b border-[#DCDCDC]`}
              >
                <div
                  className={`flex items-center justify-between gap-[15px] `}
                >
                  <p className="lg:text-[18px] text-[14px] text-[#646464] font-semibold">
                    {e.question}
                  </p>
                  <div className="cursor-pointer lg:hidden">
                    <OSSIcons name="Plus" styleDiv={{ width: "20px" }} />
                  </div>
                  <div className="cursor-pointer lg:block hidden">
                    <OSSIcons name="Plus" />
                  </div>
                </div>
                <div
                  className={` rounded-md bg-white shadow-xs transition-all ease-in-out duration-500 lg:w-[500px] w-4/5 ${
                    selectedIndex === idx ? "max-h-[500px]" : "max-h-0"
                  } overflow-hidden`}
                >
                  <p className="text-[#646464] lg:text-[16px] text-[12px] mb-5 mt-2 text-justify">
                    {ReactHtmlParser(e.answer)}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <FormFaq />
    </div>
  );
}

export default Faq;
