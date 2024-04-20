import React from "react";
import { OSSIcons } from "../../../../public/assets/icons/parent";
import { dateFormatter } from "@/app/universalFunction";

function ModalDetailApplications({ data }) {
  function statusFormatted(status) {
    return status
      .replace(/([A-Z])/g, " $1")
      .replace(/^./, (str) => str.toUpperCase());
  }
  return (
    <dialog id="detailModal" className="modal">
      <div className=" bg-white flex flex-col px-10 py-7 lg:rounded-[20px] lg:w-[594px] w-full lg:h-fit h-screen relative">
        <div className="flex lg:flex-row flex-row-reverse lg:justify-between justify-end gap-6 lg:mb-0 mb-5">
          <h1 className="-mt-1 lg:text-[25px] text-[18px] font-semibold text-[#2E2D2D] mb-5">
            Detail Status
          </h1>
          <form method="dialog" className="border-none lg:-mt-.5">
            <button formMethod="dialog">
              <OSSIcons name={"Cancel"} fill="#2E2D2D" />
            </button>
          </form>
        </div>
        {data && (
          <ol className="relative ms-3">
            {data.map((e, i) => {
              const { status, notes, createdAt } = e;
              return (
                <div key={i}>
                  <li
                    class={`${
                      i !== data.length - 1 &&
                      "border-l-[2px] border-[#DCDCDC] border-dashed pb-7"
                    } `}
                  >
                    <span
                      class={`${
                        i === data.length - 1 ? "bg-[#1C25E7]" : "bg-[#D9D7F9]"
                      } absolute flex items-center justify-center w-3 h-3  rounded-full -start-1 ring-4 ring-[#D9D7F9]`}
                    ></span>
                    <div className="ms-6">
                      <h1 className="text-transparent">data</h1>
                      <p class="text-[#646464] text-[12px] -mt-7">
                        {dateFormatter(createdAt)}
                      </p>
                      <p class="text-[#2E2D2D] text-[14px] font-semibold">
                        {statusFormatted(status)}
                      </p>
                      <p class="text-[#646464] text-[14px]">{notes}</p>
                    </div>
                  </li>
                </div>
              );
            })}
          </ol>
        )}
      </div>
    </dialog>
  );
}

export default ModalDetailApplications;
