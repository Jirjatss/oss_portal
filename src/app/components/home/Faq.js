"use client";
import ReactHtmlParser from "react-html-parser";
import { useState } from "react";
import { OSSIcons } from "../../../../public/assets/icons/parent";
import FormFaq from "../Form/FormFaq";

function Faq() {
  const questions = [
    {
      question:
        "What is the usual processing time for government applications?",
      answer:
        "The normal processing time for your applications will not exceed a week, however it depends on the type of services you applied for. Your application will be followed up by an officer and any feedback will be provided to you to accordingly for the successful of your application processing.",
    },
    {
      question: "Which documents are mandatory for a government applicant?",
      answer:
        "Any legal documents issued by a government entity will be mandatory for an applicant, for example: Citizen Card, Birth Certificate, Village’s Declaration, Police Declaration, Election Card, etc. However, the documents required will be based on the type of services you will select. ",
    },
    {
      question: "How can applicants track the status of their submissions?",
      answer:
        "Applicant can track the status of their submission by login into the system and check their submission or request status. ",
    },
    {
      question: "Can the application submission be refused?",
      answer: ReactHtmlParser(`
        <div>
          <p>Yes, the application submission can be refused:</p>
          <ul class="list-disc pl-4 mt-1">
            <li>If your supporting documents are incomplete.</li>
            <li>If you never follow up confirmation from the officer.</li>
            <li>If there are technical problems that make it impossible to complete the order.</li>
          </ul>
          <p>In these cases, you will be informed by email about the recommendations and the next steps to take this to ensure that your next request can be successfully considered.</p>
        </div>
      `),
    },
    {
      question: "If I have questions, who can I speak to?",
      answer: ReactHtmlParser(
        `
        Please send an email to <span class="text-blue-700">portalmunicipal.mae@gmail.com</span> or contact  <span class="text-blue-700">(+670) 333 9077 </span> between 8am and 5pm, Monday to Friday except public holidays or declared point of tolerance day by Government.
        `
      ),
    },
  ];

  const [selectedIndexes, setSelectedIndexes] = useState(
    Array(questions.length).fill(false)
  );

  const toggleFaq = (index) => {
    setSelectedIndexes((prevIndexes) => {
      const newIndexes = [...prevIndexes];
      newIndexes[index] = !newIndexes[index];
      return newIndexes;
    });
  };

  return (
    <div
      className="grid lg:grid-cols-2 grid-cols-1 justify-between gap-10 lg:py-24  pt-16"
      id="contact-us"
    >
      <div>
        <h1 className="lg:text-[40px] text-[28px] font-bold capitalize text-[#363131] mb-5">
          Frequently Asked Questions
        </h1>
        <div className="flex flex-col gap-7">
          {questions.map((e, idx) => (
            <div
              className="flex w-full"
              key={idx}
              onClick={() => toggleFaq(idx)}
            >
              <div
                className={`flex flex-col w-full ${
                  selectedIndexes[idx] ? "" : "lg:h-[64px] h-[55px]"
                } border-b border-[#DCDCDC]`}
              >
                <div
                  className={`flex items-center justify-between gap-[15px] `}
                >
                  <p className="lg:text-[18px] text-[14px] text-[#646464] font-semibold">
                    {e.question}
                  </p>
                  {selectedIndexes[idx] ? (
                    <div className="flex lg:mr-2 mr-1">
                      <img
                        src="/assets/icons/dash.png"
                        className="lg:w-4 lg:h-4 w-3 h-3 cursor-pointer "
                      />
                    </div>
                  ) : (
                    <>
                      <div className="cursor-pointer lg:hidden">
                        <OSSIcons name="Plus" styleDiv={{ width: "20px" }} />
                      </div>
                      <div className="cursor-pointer lg:block hidden">
                        <OSSIcons name="Plus" />
                      </div>
                    </>
                  )}
                </div>
                <div
                  className={`rounded-md bg-white shadow-xs transition-all ease-in-out duration-500 lg:min-w-[550px] w-5/6 ${
                    selectedIndexes[idx] ? "max-h-[500px]" : "max-h-0"
                  } overflow-hidden`}
                >
                  <div className="text-[#646464] lg:text-[16px] text-[12px] mb-5 mt-2 text-justify">
                    {typeof e.answer === "string" ? (
                      <p>{e.answer}</p>
                    ) : (
                      e.answer
                    )}
                  </div>
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
