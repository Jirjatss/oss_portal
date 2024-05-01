import React from "react";
import { OSSIcons } from "../../../../public/assets/icons/parent";
import { dateFormatter } from "@/app/universalFunction";
import useLanguage from "@/app/useLanguage";

function ModalDetailApplications({ data }) {
  const { t } = useLanguage();
  function statusFormatted(status) {
    if (status === "submitted") return `${t("submitted")}`;
    if (status === "resubmitted") return `${t("resubmitted")}`;
    if (status === "waitingApprovalFromFrontOffice")
      return `${t("waiting_from_fo")}`;
    if (status === "rejectedFromFrontOffice") return `${t("rejected_from_fo")}`;
    if (status === "approvedFromFrontOffice") return `${t("approved_from_fo")}`;
    if (status === "waitingApprovalFromBackOffice")
      return `${t("waiting_from_bo")}`;
    if (status === "rejectedFromBackOffice") return `${t("rejected_from_bo")}`;
    if (status === "approvedFromBackOffice") return `${t("approved_from_bo")}`;
    if (status === "completed") return `${t("completed")}`;
  }
  return (
    <dialog id="detailModal" className="modal">
      <div className=" bg-white flex flex-col px-10 py-7 lg:rounded-[20px] lg:w-[594px] relative max-h-[80vh] overflow-y-auto">
        <div className="flex lg:flex-row flex-row-reverse lg:justify-between justify-end gap-6 lg:mb-0 mb-5">
          <h1 className="-mt-1 lg:text-[25px] text-[18px] font-semibold text-[#2E2D2D] mb-5">
            {t("detail_status")}
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
                    className={`${
                      i !== data.length - 1 &&
                      "border-l-[2px] border-[#DCDCDC] border-dashed pb-7"
                    } `}
                  >
                    <span
                      className={`${
                        i === data.length - 1 ? "bg-[#8B0000]" : "bg-[#D9D7F9]"
                      } absolute flex items-center justify-center w-3 h-3  rounded-full -start-1 ring-4 ring-[#D9D7F9]`}
                    ></span>
                    <div className="ms-6">
                      <h1 className="text-transparent">data</h1>
                      <p className="text-[#646464] text-[12px] -mt-7">
                        {dateFormatter(createdAt)}
                      </p>
                      <p className="text-[#2E2D2D] text-[14px] font-semibold">
                        {statusFormatted(status)}
                      </p>
                      <p className="text-[#646464] text-[14px]">{notes}</p>
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
