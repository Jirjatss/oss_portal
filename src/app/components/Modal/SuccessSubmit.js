import React from "react";
import { OSSIcons } from "../../../../public/assets/icons/parent";
import { useRouter } from "next/navigation";

function SubmitSuccess() {
  const router = useRouter();

  return (
    <dialog id="submit_success" className="modal">
      <div className=" bg-white flex flex-col px-10 py-7 rounded-[20px]  relative">
        <form method="dialog">
          <button className="absolute top-7 right-5" formMethod="dialog">
            <OSSIcons name={"Cancel"} fill="#2E2D2D" />
          </button>
        </form>

        <div className="mt-7 text-center flex flex-col gap-3 items-center">
          <h1 className="text-[26px] font-bold text-[#2E2D2D]">
            Your Data Have Submitted
          </h1>
          <p className="text-[16px] font-thin text-[#646464] w-3/4 items-center">
            Your submitted data is being reviewed by our team. Verification may
            take some time. Thank you for your patience!
          </p>
          <form method="dialog" className="w-full mt-4">
            <button
              className="bg-[#8B0000] px-16 text-[16px] py-2 text-[#F3F3F3] rounded-[8px] mt-2"
              formMethod="dialog"
              onClick={() => {
                router.push("/");
              }}
            >
              Understand
            </button>
          </form>
        </div>
      </div>
    </dialog>
  );
}

export default SubmitSuccess;
