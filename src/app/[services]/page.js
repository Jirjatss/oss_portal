"use client";

import { usePathname, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { OSSIcons } from "../../../public/assets/icons/parent";
import { useDispatch, useSelector } from "react-redux";
import FormSubmisson from "../components/Form/FormSubmisson";
import { getUser } from "../store/actions/userAction";

function Service() {
  const { user } = useSelector((state) => state.userReducer);
  const dispatch = useDispatch();
  const pathname = usePathname();
  const router = useRouter();
  const [isSubmission, setIsSubmission] = useState(false);
  const [isCheckingUser, setIsCheckingUser] = useState(true);
  const [index, setIndex] = useState(1);
  const title = pathname
    .replace(/^\//, "")
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  const services = [
    {
      title: `New \n ${title}`,
    },
    {
      title: `Renew \n ${title}`,
    },
    {
      title: `Loss \n ${title}`,
    },
    {
      title: `Damage \n ${title}`,
    },
  ];

  const ServicesHeader = () => {
    return (
      <>
        <div className="border-b-[1px] border-[#646464] max-w-fit grid grid-cols-4 gap-3">
          {services.map((e, i) => (
            <div
              key={i}
              className={`${
                index === i
                  ? "border-[#1C25E7] border-b-[2px] text-[#1C25E7] font-semibold"
                  : "text-[#646464]"
              } cursor-pointer px-3 lg:w-[150px] text-[16px] `}
              onClick={() => setIndex(i)}
              style={{ whiteSpace: "pre-line" }}
            >
              <p className="mb-1 text-center">{e.title}</p>
            </div>
          ))}
        </div>
      </>
    );
  };

  const Submission = ({ onClick }) => {
    return (
      <div className="bg-white rounded-[20px] p-[20px] border-[1px] border-[#DCDCDC] flex flex-col gap-1 lg:w-[206px] h-fit">
        <h1 className="text-[18px] font-semibold text-[#2E2D2D]">
          Ready to submit?
        </h1>
        <p className="text-[14px] text-[#646464]">
          Make sure you have read and understand the following provisions
        </p>
        <button
          className="bg-[#1C25E7] px-3 py-2 text-[#F3F3F3] rounded-lg max-w-fit mt-2.5 font-semibold"
          onClick={onClick}
        >
          Start Submission
        </button>
      </div>
    );
  };

  const startSubmission = () => {
    setIsSubmission(true);
  };

  useEffect(() => {
    const fetchUser = async () => {
      try {
        await dispatch(getUser());
        setIsCheckingUser(false);
      } catch (error) {
        setIsCheckingUser(false);
        console.error("Error fetching user:", error);
      }
    };

    fetchUser();
  }, []);

  useEffect(() => {
    if (!isCheckingUser && !user) {
      router.replace("/login");
    }
  }, [user, isCheckingUser]);

  return (
    <div className="px-52 bg-white py-10">
      <div
        className="flex gap-2 cursor-pointer"
        onClick={() => {
          if (isSubmission) setIsSubmission(false);
          else router.back();
        }}
      >
        <OSSIcons name="LeftArrow" />
        <p className="text-[18px] font-semibold text-[#2E2D2D]">
          Service {title}
        </p>
      </div>
      {isSubmission ? (
        <FormSubmisson title={title} />
      ) : (
        <div className="flex gap-16 mt-7">
          <div className="flex-1 flex-col">
            <h1 className="lg:text-[28px] font-semibold text-[#2E2D2D] mb-10">
              Category
            </h1>
            <ServicesHeader />
            <div className="flex flex-col gap-10 mt-10">
              <div className="flex flex-col gap-3">
                <h1 className="text-[18px] text-[#2E2D2D] font-semibold">
                  📋 About Applications
                </h1>
                <p className="text-[16px] text-[#646464]">
                  Explore our Applicant Service for {title}! Streamlining the
                  application process, it ensures hassle-free access to
                  essential services. From simplified documentation to efficient
                  processing, we’re here to make managing your family’s needs
                  easier. Apply today for a smoother administrative experience!
                </p>
              </div>
              <div className="flex flex-col gap-3">
                <h1 className="text-[18px] text-[#2E2D2D] font-semibold">
                  🗂 What you need prepare for this?
                </h1>
                <ul className="list-disc ml-5 text-[16px] text-[#646464]">
                  <li>Scan of original valid CNIC/ NICOP/ Smart card.</li>
                  <li>
                    Scan of the data page, two random pages asked by the system
                    and the last ten passport pages of the original exhausted
                    passport. Finger Prints Performa.
                  </li>
                  <li>
                    Original scan of a color picture with white background
                    having specification 350/467 Pixels in JPEG/JPG format and
                    not more than 3MB size.
                  </li>
                  <li>
                    The applicant has to submit a statement/declaration as per
                    the prescribed format. (can be downloaded through the
                    download tab after login to your account) that he/ she holds
                    the original exhausted passport at the time of application
                    and his passport pages have been exhausted due to frequent
                    travel.
                  </li>
                </ul>
              </div>
              <div className="flex flex-col gap-3">
                <h1 className="text-[18px] text-[#2E2D2D] font-semibold">
                  ⏳ How Long It Will Take?
                </h1>
                <ul className="list-disc ml-5 text-[16px] text-[#646464]">
                  <li>Duration submited : 3 Working Day</li>
                  <li>
                    Step following:
                    <ul className="ml-5 list-disc">
                      <li>Waiting for approval</li>
                      <li>
                        Request Approved - In Progress, Registration Completed
                      </li>
                      <li>Passport Delivered</li>
                    </ul>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <Submission onClick={startSubmission} />
        </div>
      )}
    </div>
  );
}

export default Service;
