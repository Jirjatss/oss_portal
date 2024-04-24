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
  const isEmptyApplications = myApplications?.length === 0 || !myApplications;

  useEffect(() => {
    const fetchData = () => {
      if (user && user.status === "active") {
        dispatch(getMyApplications(user?.accessToken));
      }
    };

    fetchData();
  }, [user, dispatch]);

  return (
    <div className="border-[#DCDCDC] rounded-[20px] border-[1px] p-[24px]">
      <div className="flex flex-col lg:gap-10 gap-5">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="lg:hidden">
              <Image
                src={isEmptyApplications ? EmptyApplicant : MyApplicants}
                width={20}
                height={20}
                alt={"Empty"}
              />
            </div>
            <p className="text-[14px] text-[#363131] font-semibold">
              Ha’u-nia aplikasaun sira
            </p>
          </div>
          <Link
            href="/my-applications"
            className="text-[#1C25E7] lg:text-[14px] text-[14px] font-semibold cursor-pointer"
          >
            Haree hotu
          </Link>
        </div>

        <div className="bg-[#DCDCDC] rounded-xl justify-center items-center lg:flex p-5 m-auto  hidden">
          <Image
            src={isEmptyApplications ? EmptyApplicant : MyApplicants}
            width={50}
            height={50}
            alt={"Empty"}
          />
        </div>

        <div className="flex justify-center items-center flex-col text-center gap-4">
          {myApplications?.length !== 0 && myApplications !== null ? (
            <p className="text-[14px] text-[#363131] font-semibold">
              {myApplications?.length} Aplikasaun{" "}
              <span className="text-[14px] text-[#646464] font-thin">
                {" "}
                La’o hela, bainhira ita submete tiha ona ita-nia aplikasaun,
                favor haree nia estatutu iha ne’e.
              </span>
            </p>
          ) : (
            <>
              <p className="text-[14px] text-[#363131] font-semibold">
                Seidauk iha aplikasaun ruma
              </p>
              <p className="text-[12px] text-[#646464] font-thin">
                Bainhira ita submete tiha ona ita-nia aplikasaun, favor haree
                nia estatutu iha ne’e.
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default MyApplicant;
