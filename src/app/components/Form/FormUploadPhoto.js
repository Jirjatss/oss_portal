import Image from "next/image";
import React, { useEffect, useState } from "react";
import { OSSIcons } from "../../../../public/assets/icons/parent";
import { useDispatch, useSelector } from "react-redux";
import {
  showVerif,
  submitPersonalInformations,
} from "@/app/store/actions/userAction";
import { LOADING_FALSE } from "@/app/store/actions/action_type";
import Loader from "../Loader";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import SubmitConfirmation from "../Modal/SubmitConfirmation";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";
import ModalSuccess from "../Modal/ModalSuccess";

function FormUploadPhoto({ onClick }) {
  const user = useAuthUser();
  const dispatch = useDispatch();
  const router = useRouter();

  const { personalInformation, loading } = useSelector(
    (state) => state.userReducer
  );
  const [upload, setUpload] = useState({
    citizenPhoto: null,
    identityDocument: null,
  });
  const [image, setImage] = useState({
    citizenPhoto: null,
    identityDocument: null,
  });

  const onSubmit = () => {
    dispatch(
      submitPersonalInformations(
        {
          ...personalInformation,
          Photo: upload.citizenPhoto,
          Identity: upload.identityDocument,
        },
        user?.accessToken
      )
    )
      .then(() => {
        success_modal.showModal();
      })
      .catch((err) => {
        toast.error;
        console.log(err);
      });
  };

  const handleImageChange = (event, type) => {
    const selectedImage = event.target.files[0];
    const reader = new FileReader();

    reader.onload = () => {
      setImage((prevState) => ({
        ...prevState,
        [type]: reader.result,
      }));

      setUpload((prevState) => ({
        ...prevState,
        [type]: selectedImage,
      }));
    };

    reader.readAsDataURL(selectedImage);
  };
  useEffect(() => {
    setTimeout(() => {
      dispatch({
        type: LOADING_FALSE,
      });
    }, 500);
  }, []);

  useEffect(() => {
    const scrollToTop = () => {
      const scrollStep = -window.scrollY / (500 / 15);
      const scrollInterval = setInterval(() => {
        if (window.scrollY !== 0) {
          window.scrollBy(0, scrollStep);
        } else {
          clearInterval(scrollInterval);
        }
      }, 15);
    };
    scrollToTop();
    return () => {};
  }, []);

  const isDisabled = !upload.citizenPhoto || !upload.identityDocument;
  useEffect(() => {
    if (personalInformation.Photo && personalInformation.Identity) {
      onClick();
    }
  }, [personalInformation.Photo, personalInformation.Identity]);

  return (
    <>
      {loading && <Loader />}
      <div>
        <div>
          <h1 className="lg:text-[28px] text-[14px] font-semibold text-[#2E2D2D] mb-2">
            Upload Photo
          </h1>
          <p className="text-[#646464] text-[16px] mb-10">
            Please upload clear and legible copies of your photos and documents.
            Ensure all <br />
            details are visible for accurate processing.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 grid-cols-1 gap-10 mb-16">
          <div className="flex flex-col gap-5">
            <label className="text-[18px] text-[#2E2D2D] font-semibold">
              Citizen Photo
            </label>
            <div className="border-[1px] border-[#DCDCDC] rounded-[20px] p-[24px] flex flex-col">
              <div
                className={`border-[1px] border-[#DCDCDC] rounded-[20px]  border-dashed flex flex-col relative cursor-pointer ${
                  image.citizenPhoto ? "" : "p-[24px]"
                }`}
              >
                <input
                  type="file"
                  accept="image/*"
                  id="citizenPhotoInput"
                  className="hidden"
                  onChange={(event) => handleImageChange(event, "citizenPhoto")}
                />

                {image.citizenPhoto ? (
                  <>
                    <div
                      className="absolute top-2 right-3 cursor-pointer w-[18px] h-[18px] justify-center items-center flex rounded-full bg-[#00000066] p-3 z-10"
                      onClick={() =>
                        setImage((prevState) => ({
                          ...prevState,
                          citizenPhoto: null,
                        }))
                      }
                    >
                      <OSSIcons name={"Cancel"} />
                    </div>
                    <div className="lg:w-[600px] h-[300px] max-w-screen ">
                      <Image
                        src={image.citizenPhoto}
                        alt="citizen photo"
                        objectFit="cover"
                        layout="fill"
                        className="rounded-[8px]"
                      />
                    </div>
                  </>
                ) : (
                  <div
                    onClick={() =>
                      document.getElementById("citizenPhotoInput").click()
                    }
                    className="cursor-pointer flex flex-col gap-4"
                  >
                    <OSSIcons name="AddImage" />
                    <p className="text-center text-[#646464] text-[16px]">
                      Upload in JPG, JPEG, PDF, PNG <br /> max 10 MB
                    </p>
                  </div>
                )}
              </div>
              <p
                className="text-center mt-2 text-[#1C25E7] font-semibold cursor-pointer"
                onClick={() =>
                  document.getElementById("citizenPhotoInput").click()
                }
              >
                {image.citizenPhoto ? "Change Photo" : "Upload"}
              </p>
            </div>
          </div>
          <div className="flex flex-col gap-5">
            <label className="text-[18px] text-[#2E2D2D] font-semibold">
              Citizen Identity document
            </label>
            <div className="border-[1px] border-[#DCDCDC] rounded-[20px] p-[24px] flex flex-col relative">
              <div
                className={`border-[1px] border-[#DCDCDC] rounded-[20px]  border-dashed flex flex-col relative cursor-pointer ${
                  image.identityDocument ? "" : "p-[24px]"
                }`}
                style={{ width: "auto", height: "auto" }}
              >
                <input
                  type="file"
                  accept="image/*"
                  id="identityDocumentInput"
                  className="hidden"
                  onChange={(event) =>
                    handleImageChange(event, "identityDocument")
                  }
                />

                {image.identityDocument ? (
                  <>
                    <div
                      className="absolute top-2 right-3 cursor-pointer w-[18px] h-[18px] justify-center items-center flex rounded-full bg-[#00000066] p-3 z-10"
                      onClick={() =>
                        setImage((prevState) => ({
                          ...prevState,
                          identityDocument: null,
                        }))
                      }
                    >
                      <OSSIcons name={"Cancel"} />
                    </div>
                    <div className="lg:w-[600px] h-[300px] max-w-screen ">
                      <Image
                        src={image.identityDocument}
                        alt="citizen photo"
                        objectFit="cover"
                        layout="fill"
                        className="rounded-[8px]"
                      />
                    </div>
                  </>
                ) : (
                  <div
                    onClick={() =>
                      document.getElementById("identityDocumentInput").click()
                    }
                    className="cursor-pointer flex flex-col gap-4"
                  >
                    <OSSIcons name="AddImage" />
                    <p className="text-center text-[#646464] text-[16px]">
                      Upload in JPG, JPEG, PDF, PNG <br /> max 10 MB
                    </p>
                  </div>
                )}
              </div>
              <p
                className="text-center mt-2 text-[#1C25E7] font-semibold cursor-pointer"
                onClick={() =>
                  document.getElementById("identityDocumentInput").click()
                }
              >
                {image.identityDocument ? "Change Photo" : "Upload"}
              </p>
            </div>
          </div>
        </div>

        <button
          className={`${
            isDisabled ? "bg-[#DCDCDC] cursor-not-allowed" : "bg-[#1C25E7] "
          } py-4 px-32 text-[#F3F3F3] flex m-auto rounded-[8px] w-full lg:w-fit text-center justify-center`}
          disabled={isDisabled}
          onClick={() => {
            submit_confirmation.showModal();
          }}
        >
          Submit
        </button>
      </div>

      <SubmitConfirmation onSubmit={onSubmit} />

      <ModalSuccess
        id="success_modal"
        title="Your Data Have Submitted"
        description=" Your submitted data is being reviewed by our team. Verification may take some time. Thank you for your patience!"
        onClick={() => {
          dispatch(showVerif());
          router.push("/");
        }}
      />
    </>
  );
}

export default FormUploadPhoto;
