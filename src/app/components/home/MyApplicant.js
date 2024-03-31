import Image from "next/image";
import React, { useEffect } from "react";
import {
  EmptyApplicant,
  MyApplicants,
} from "../../../../public/assets/emoji/index";
import { useDispatch, useSelector } from "react-redux";
import { getMyApplications } from "@/app/store/actions/applicationAction";
import { useRouter } from "next/navigation";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";
import Link from "next/link";

function MyApplicant() {
  const user = useAuthUser();
  const { myApplications } = useSelector((state) => state.applicationReducer);
  const dispatch = useDispatch();
  const router = useRouter();
  const isEmptyApplications = myApplications?.length === 0;

  useEffect(() => {
    const fetchData = () => {
      if (user) {
        dispatch(getMyApplications(user?.accessToken));
      }
    };

    fetchData();
  }, [user, dispatch]);

  return (
    <div className="border-[#DCDCDC] rounded-[20px] border-[1px] p-[24px]">
      <div className="flex flex-col gap-10">
        <div className="flex justify-between items-center">
          <p className="text-[18px] text-[#363131] font-semibold">
            My Applications
          </p>
          {!isEmptyApplications && (
            <Link
              href="/my-applications"
              className="text-[#1C25E7] text-[18px] font-semibold cursor-pointer"
            >
              See All
            </Link>
          )}
        </div>

        <div className="bg-[#DCDCDC] rounded-xl justify-center items-center flex p-5 m-auto">
          <Image
            src={isEmptyApplications ? EmptyApplicant : MyApplicants}
            width={50}
            height={50}
            alt={"Empty"}
          />
        </div>

        <div className="flex justify-center items-center flex-col text-center gap-4">
          {myApplications?.length !== 0 ? (
            <p className="text-[18px] text-[#363131] font-semibold">
              {myApplications?.length} Applications{" "}
              <span className="text-[18px] text-[#646464] font-thin">
                {" "}
                on going, Please check further for detailed status information.
              </span>
            </p>
          ) : (
            <>
              <p className="text-[18px] text-[#363131] font-semibold">
                No Applications Yet
              </p>
              <p className="text-[16px] text-[#646464] font-thin">
                Once you submitted applicants, you can track the status here
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default MyApplicant;
