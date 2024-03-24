import React, { useEffect, useState } from "react";
import InputDropdown from "../TagComponents/InputDropdown";
import DatePicker from "../TagComponents/DatePicker";
import { OSSIcons } from "../../../../public/assets/icons/parent";
import Link from "next/link";
import ModalPreview from "../Modal/ModalPreview";
import { useDispatch, useSelector } from "react-redux";
import { getUserInformation, requestOtp } from "@/app/store/actions/userAction";
import { getServicesHandler } from "@/app/store/actions/serviceAction";
import { saveSubmissionData } from "@/app/store/actions/applicationAction";
import { useRouter } from "next/navigation";
import Loader from "../Loader";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";
import FormOtpModalSubmisson from "../Modal/FormOtpSubmission";

const UploadContainer = ({
  handleImageChange,
  toggleImageCheck,
  deleteImage,
  checkedImages,
  image,
  onClick,
}) => {
  return (
    <div className="border-[1px] border-[#DCDCDC] p-[20px] rounded-[20px] flex flex-col gap-5">
      <div
        className={`border-[1px] border-[#DCDCDC] rounded-[20px] p-[20px] border-dashed flex flex-col relative cursor-pointer w-full justify-center items-center`}
      >
        <input
          type="file"
          accept="image/*"
          id="image"
          className="hidden"
          onChange={(event) => handleImageChange(event, "image")}
        />
        <div
          onClick={() => document.getElementById("image").click()}
          className="cursor-pointer flex flex-col gap-4"
        >
          <OSSIcons name="AddImage" />
          <p className="text-center text-[#646464] text-[16px]">
            Upload in JPG, JPEG, PDF, PNG <br /> max 10 MB
          </p>
          <button className="text-[#1C25E7] text-[18px] font-semibold">
            Upload
          </button>
        </div>
      </div>
      <p className="text-[14px] text-[#646464] ml-1">
        After uploaded, please check each attachment to indicate the document is
        valid
      </p>

      <div className="flex flex-col gap-3">
        {image.images.map((image, index) => (
          <div key={index} className="flex w-full justify-between ml-1 ">
            <div className="flex gap-4">
              <div
                className="p-[12px] bg-[#D9D7F9] flex justify-center items-center rounded-[8px] cursor-pointer "
                onClick={() => onClick(index)}
              >
                <OSSIcons name="SearchFile" />
              </div>
              <div className="flex flex-col">
                <p>{image.title}</p>
                <p>{image.size} MB</p>
              </div>
            </div>
            <div className="flex gap-4 items-center">
              <OSSIcons
                name="Trash"
                className="cursor-pointer"
                onClick={() => deleteImage(index)}
              />
              <div
                className={`w-[24px] h-[24px] border-[1px] border-[#DCDCDC] rounded-lg cursor-pointer justify-center items-center flex ${
                  checkedImages.includes(index) && "bg-[#1C25E7]"
                }`}
                onClick={() => toggleImageCheck(index, image)}
              >
                {checkedImages.includes(index, image) && (
                  <OSSIcons name={"Approve"} />
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const FormSubmission = ({ code }) => {
  const requester = [
    { name: `Self`, code: "Self" },
    { name: `Child`, code: `Child` },
    { name: `Spouse`, code: `Spouse` },
    { name: `Parent`, code: `Parent` },
  ];
  const [isOther, setIsOther] = useState(false);
  const genderForm = [
    { name: "Male", code: "Male" },
    { name: "Female", code: "Female" },
  ];
  const { profile } = useSelector((state) => state.userReducer);
  const { personalDetail } = profile || {};
  const deliverTime = [{ name: `Normal`, code: `Normal` }];
  const [isChecked, setIsChecked] = useState(false);
  const [image, setImage] = useState({ images: [] });
  const [checkedImages, setCheckedImages] = useState([]);
  const [indexImage, setIndexImage] = useState(null);
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.userReducer);
  const user = useAuthUser();

  const { services } = useSelector((state) => state.serviceReducer);
  const [upload, setUpload] = useState([]);

  const isDisabled =
    !isChecked ||
    checkedImages.length !== image.images.length ||
    image.images.length === 0;

  const handleImageChange = (event) => {
    const selectedImage = event.target.files[0];
    if (!selectedImage) return;

    const allowedTypes = [
      "image/jpeg",
      "image/jpg",
      "image/png",
      "application/pdf",
    ];
    if (!allowedTypes.includes(selectedImage.type)) {
      alert("Hanya file JPG, JPEG, PDF, dan PNG yang diperbolehkan.");
      return;
    }

    const maxSize = 10 * 1024 * 1024;
    if (selectedImage.size > maxSize) {
      alert("Ukuran file terlalu besar. Maksimal 10 MB.");
      return;
    }

    const reader = new FileReader();

    reader.onload = () => {
      const newImage = {
        title: selectedImage.name,
        url: reader.result,
        size: (selectedImage.size / (1024 * 1024)).toFixed(2),
        isChecked: false,
      };

      setUpload((prevUpload) => [...prevUpload, selectedImage]);

      setImage((prevState) => ({
        ...prevState,
        images: [...(prevState.images || []), newImage],
      }));

      setCheckedImages((prevState) => {
        if (prevState.some((index) => prevState.includes(index))) {
          return [
            ...(prevState.images || []).map((_, index) => index),
            (prevState.images || []).length,
          ];
        }
        return prevState;
      });
    };

    reader.readAsDataURL(selectedImage);
  };
  const [input, setInput] = useState({});

  const handleChangeSelect = (e) => {
    const { name, value } = e;
    setInput({
      ...input,
      [name]: value,
    });
  };

  const toggleImageCheck = (index, image) => {
    setImage((prevState) => {
      const updatedImages = prevState.images.map((img, i) => {
        if (i === index) {
          return {
            ...img,
            isChecked: !img.isChecked,
          };
        }
        return img;
      });
      return { images: updatedImages };
    });

    setCheckedImages((prevState) => {
      return prevState.includes(index)
        ? prevState.filter((item) => item !== index)
        : [...prevState, index];
    });
  };

  const deleteImage = (index) => {
    setImage((prevState) => {
      const updatedImages = prevState.images.filter((_, i) => i !== index);
      return { images: updatedImages };
    });
  };

  const inputForm = {
    ServiceId: input.applyingFor,
    RequestFor: input.requester,
    FirstName: input.requester === "Self" ? "" : input.firstName,
    LastName: input.requester === "Self" ? "" : input.lastName,
    Gender: input.requester === "Self" ? "" : input.gender,
    DateOfBirth: input.requester === "Self" ? "" : input.DateOfBirth,
    DeliveryTime: input.deliverTime,
    Files: upload,
  };

  useEffect(() => {
    dispatch(getUserInformation(user?.accessToken));
    dispatch(getServicesHandler(code, user?.accessToken));
  }, []);

  return (
    <>
      {image?.images && <ModalPreview image={image.images[indexImage]} />}
      {loading && <Loader message="Please wait, your data is submitting..." />}
      <div className="grid grid-cols-1 lg:grid-cols-2 my-10 gap-x-10">
        <div>
          <h1 className="text-[28px] text-[#2E2D2D] font-semibold mb-5">
            Submit Document
          </h1>
          <p className="text-[16px] text-[#646464]">
            Please upload clear and legible copies of your photos and documents.
            Ensure all details are visible for accurate processing, and
            following how to apply instructions
          </p>
        </div>
        <div className="flex flex-col gap-5">
          <InputDropdown
            label={"Applying For"}
            topic={services}
            name="applyingFor"
            handleChange={(e) => {
              handleChangeSelect(e);
            }}
            selectedTopic={input.applyingFor}
          />
          <InputDropdown
            label={"Request For"}
            topic={requester}
            name="requester"
            handleChange={(e) => {
              handleChangeSelect(e);
              if (e.value !== "Self") setIsOther(true);
              else setIsOther(false);
            }}
            selectedTopic={input.requester}
          />
          {isOther && (
            <>
              <div className="flex flex-col">
                <label className="text-label">First Name</label>
                <input
                  type="text"
                  className="text-input text-black placeholder-gray-400"
                  placeholder="First Name"
                  value={input.firstName}
                  name="firstName"
                  onChange={(e) => handleChangeSelect(e.target)}
                />
              </div>
              <div className="flex flex-col">
                <label className="text-label">Last Name</label>
                <input
                  type="text"
                  className="text-input text-black placeholder-gray-400"
                  placeholder={"Last Name"}
                  value={input.lastName}
                  name="lastName"
                  onChange={(e) => handleChangeSelect(e.target)}
                />
              </div>
              <DatePicker
                handleChange={(e) => handleChangeSelect(e.target)}
                name="DateOfBirth"
                value={input?.DateOfBirth}
              />
              <InputDropdown
                label={"Gender"}
                topic={genderForm}
                handleChange={(e) => handleChangeSelect(e)}
                name="gender"
                selectedTopic={input?.gender}
              />
            </>
          )}

          <InputDropdown
            label={"Deliver Time"}
            topic={deliverTime}
            name="deliverTime"
            handleChange={(e) => handleChangeSelect(e)}
            selectedTopic={input.deliverTime}
            isSeparate={false}
          />
          <UploadContainer
            handleImageChange={handleImageChange}
            toggleImageCheck={toggleImageCheck}
            deleteImage={deleteImage}
            checkedImages={checkedImages}
            image={image}
            onClick={(idx) => {
              setIndexImage(idx);
              modalPreview.showModal();
            }}
          />
          <div className="flex gap-3 items-center mt-4">
            <div
              className={`w-[24px] h-[24px] border-[1px] border-[#DCDCDC] rounded-lg cursor-pointer justify-center items-center flex ${
                isChecked && "bg-[#1C25E7]"
              }`}
              onClick={() => setIsChecked(!isChecked)}
            >
              {isChecked && <OSSIcons name={"Approve"} />}
            </div>
            <p className="text-[14px] text-[#6C737E]">
              By sending this form I agree to the applicable{" "}
              <Link
                href="/terms-conditions"
                className="text-[#1C25E7] font-semibold cursor-pointer"
              >
                terms and conditions
              </Link>
            </p>
          </div>
          <button
            disabled={isDisabled}
            className={`${
              isDisabled ? "bg-[#DCDCDC] cursor-not-allowed" : "bg-[#1C25E7]"
            }  px-3 py-4 text-[#F3F3F3] rounded-lg max-w-full mt-1 font-semibold`}
            onClick={() => {
              console.log("personalDetail:", personalDetail);
              dispatch(requestOtp(personalDetail?.phoneNumber))
                .then(() => {
                  form_otp_modal_submisson.showModal();
                })
                .catch((err) => console.log(err));
            }}
          >
            Submit
          </button>
        </div>
      </div>
      <FormOtpModalSubmisson data={inputForm} />
    </>
  );
};

export default FormSubmission;
