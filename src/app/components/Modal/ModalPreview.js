import React from "react";
import { OSSIcons } from "../../../../public/assets/icons/parent";

function ModalPreview({ image }) {
  return (
    <dialog id="modalPreview" className="modal">
      <div className=" bg-white flex flex-col px-10 py-7 rounded-[20px]  relative">
        <form method="dialog">
          <button className="absolute top-7 right-7" formMethod="dialog">
            <OSSIcons name={"Cancel"} fill="#2E2D2D" />
          </button>
        </form>

        <img src={image?.url} className="max-w-[514px] mt-5 rounded-xl" />
      </div>
    </dialog>
  );
}

export default ModalPreview;
