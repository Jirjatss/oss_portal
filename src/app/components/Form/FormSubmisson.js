import React, { useEffect, useState } from "react";
import InputDropdown from "../TagComponents/InputDropdown";
import DatePicker from "../TagComponents/DatePicker";
import { OSSIcons } from "../../../../public/assets/icons/parent";
import Link from "next/link";
import ModalPreview from "../Modal/ModalPreview";
import { useDispatch, useSelector } from "react-redux";
import { getUserInformation, requestOtp } from "@/app/store/actions/userAction";
import { getServicesHandler } from "@/app/store/actions/serviceAction";
import Loader from "../Loader";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";
import FormOtpModalSubmisson from "../Modal/FormOtpSubmission";
import { useSearchParams } from "next/navigation";
import {
  getDetailApplication,
  getDetailApplicationSuccess,
} from "@/app/store/actions/applicationAction";
import { formattedDate } from "@/app/universalFunction";
import { toast } from "sonner";
import axios from "axios";
import ModalPreviewExisting from "../Modal/ModalPreviewExisting";

const FormSubmission = ({ code }) => {
  const searchParams = useSearchParams();
  const user = useAuthUser();

  const dispatch = useDispatch();
  const id = searchParams.get("id");
  const serviceId = searchParams.get("serviceId");

  const { profile } = useSelector((state) => state.userReducer);
  const { personalDetail } = profile || {};
  const { detailById } = useSelector((state) => state.applicationReducer);
  const [newImage, setNewImage] = useState(null);

  const { familyDetail, deliveryTime, files, residenceDetail } =
    detailById || {};

  const { dateOfBirth, familyType, firstName, gender, lastName } =
    familyDetail || {};
  const { stateId } = residenceDetail || {};

  const [isChecked, setIsChecked] = useState(false);
  const [image, setImage] = useState({ images: [] });

  const [checkedImages, setCheckedImages] = useState([]);
  const [indexImage, setIndexImage] = useState(null);
  const [upload, setUpload] = useState([]);
  const [isShowModal, setIsShowModal] = useState(false);

  const { loading } = useSelector((state) => state.userReducer);
  const { services } = useSelector((state) => state.serviceReducer);
  const { municipality } = useSelector((state) => state.regionReducer);

  const isDisabled =
    !isChecked ||
    checkedImages.length !== image.images.length ||
    image.images.length === 0 ||
    upload.length === 0;

  const deliverTime = [{ name: `normal`, code: `normal`, id: 1 }];
  const requester = [
    { name: `self`, code: "self", id: 1 },
    { name: `child`, code: `child`, id: 2 },
    { name: `spouse`, code: `spouse`, id: 3 },
    { name: `parent`, code: `parent`, id: 4 },
  ];
  const [isOther, setIsOther] = useState(false);
  const genderForm = [
    { name: "male", code: "male", id: 1 },
    { name: "female", code: "female", id: 2 },
  ];

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
      toast.error("Only JPG, JPEG, PDF, and PNG files are allowed.");
      return;
    }

    const maxSize = 10 * 1024 * 1024;
    if (selectedImage.size > maxSize) {
      toast.error("File size is too large. Maximum 10 MB.");
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
    setUpload((prevUpload) => prevUpload.filter((_, i) => i !== index));

    setImage((prevState) => {
      const updatedImages = prevState.images.filter((_, i) => i !== index);
      return { images: updatedImages };
    });

    setCheckedImages((prevState) => {
      return prevState.filter((item) => item !== index);
    });
  };

  const inputForm = {
    ServiceId: input.applyingFor,
    RequestFor: input.requester,
    FirstName: input.requester === "self" ? "" : input.firstName,
    LastName: input.requester === "self" ? "" : input.lastName,
    Gender: input.requester === "self" ? "" : input.gender,
    DateOfBirth: input.requester === "self" ? "" : input.DateOfBirth,
    DeliveryTime: input.deliverTime,
    Files: upload,
  };

  useEffect(() => {
    if (id && user) dispatch(getDetailApplication(id, user.accessToken));
  }, [id]);

  useEffect(() => {
    return () => {
      dispatch(getDetailApplicationSuccess(null));
    };
  }, []);

  useEffect(() => {
    dispatch(getUserInformation(user?.accessToken));
    if (code !== "") dispatch(getServicesHandler(code, user?.accessToken));
  }, [code]);

  useEffect(() => {
    if (detailById) {
      setInput({
        requester: familyType,
        firstName: firstName,
        lastName: lastName,
        DateOfBirth: formattedDate(dateOfBirth),
        gender: gender,
        deliverTime: deliveryTime,
        applyingFor: serviceId,
        officeLocationCode: stateId,
      });
      setImage(() => ({
        checkedImages: true,
        images: files
          .filter((e) => e.status !== "rejected")
          .map((e) => {
            return {
              title: e.fileName,
              id: e.id,
              isExisting: true,
            };
          }),
      }));
      setCheckedImages(
        files.filter((e) => e.status !== "rejected").map(() => true)
      );

      setIsOther(familyType !== "self");
    }
    if (!detailById) {
      setInput({
        ...input,
      });
    }
  }, [detailById]);

  useEffect(() => {
    if (isShowModal) form_otp_modal_submisson.showModal();
  }, [isShowModal]);

  const UploadContainer = ({
    handleImageChange,
    toggleImageCheck,
    deleteImage,
    checkedImages,
    image,
    onClick,
    applicationId,
  }) => {
    const getApplicationFilesDetail = async (filesId) => {
      try {
        const { data } = await axios({
          url: `https://api.ardhiansyah.com/applications/${applicationId}/files/${filesId}`,
        });
        const arrayBufferToBase64 = (buffer) => {
          const binary = Buffer.from(buffer).toString("base64");
          return binary;
        };

        const base64Image = arrayBufferToBase64(data);
        const dataURL = `data:image/png;base64,${base64Image}`;
        setNewImage(dataURL);
      } catch (error) {
        console.log(error);
      }
    };

    // useEffect(() => {
    //   image.images.map((e) => {
    //     getApplicationFilesDetail(e.id);
    //   });
    // }, [image]);
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
          After uploaded, please check each attachment to indicate the document
          is valid
        </p>

        <div className="flex flex-col gap-3">
          {image.images.map((image, index) => (
            <div key={index} className="flex w-full justify-between ml-1 ">
              <div className="flex gap-4">
                <div
                  className="p-[12px] bg-[#D9D7F9] flex justify-center items-center rounded-[8px] cursor-pointer "
                  onClick={() => {
                    onClick();
                  }}
                >
                  <OSSIcons name="SearchFile" />
                </div>
                <div className="flex flex-col">
                  <p>{image.title}</p>
                  {image.size && <p>{image.size} MB</p>}
                </div>
              </div>
              <div className="flex gap-4 items-center">
                {!image.isExisting && (
                  <OSSIcons
                    name="Trash"
                    className="cursor-pointer"
                    onClick={() => deleteImage(index)}
                  />
                )}
                <div
                  className={`w-[24px] h-[24px] border-[1px] border-[#DCDCDC] rounded-lg cursor-pointer justify-center items-center flex ${
                    checkedImages.includes(index) && "bg-[#1C25E7]"
                  } ${image.isExisting && "bg-[#DCDCDC]"}`}
                  disabled={image.isExisting}
                  onClick={() => toggleImageCheck(index, image)}
                >
                  {(checkedImages.includes(index, image) ||
                    image.isExisting) && <OSSIcons name={"Approve"} />}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <>
      {image?.images && <ModalPreview image={image.images[indexImage]} />}
      {newImage && <ModalPreviewExisting image={newImage} />}
      {loading && <Loader message="Please wait, your data is submitting..." />}
      <div className="grid grid-cols-1 lg:grid-cols-2  my-10 gap-x-10">
        <div>
          <h1 className="text-[28px] text-[#2E2D2D] font-semibold mb-5">
            {id ? "Resubmit Document " : "Submit Document"}
          </h1>
          <p className="text-[16px] text-[#646464]">
            {id
              ? "Sorry, your applicant rejected because attachment invalid or lack of documents, please check feedback in your e-mail and reupload the requirement soon."
              : "Please upload clear and legible copies of your photos and documents.Ensure all details are visible for accurate processing, and following how to apply instructions"}
          </p>
        </div>
        <div className="flex flex-col gap-5 lg:mt-0 mt-7">
          <InputDropdown
            isDisabled={detailById}
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
            isDisabled={familyType}
            name="requester"
            handleChange={(e) => {
              handleChangeSelect(e);
              if (e.value !== "self") setIsOther(true);
              else setIsOther(false);
            }}
            selectedTopic={input.requester}
          />
          {/* <InputDropdown
            label={"Office Location"}
            isDisabled={stateId}
            topic={municipality?.filter((item) => [1, 2].includes(item.id))}
            name="officeLocationCode"
            handleChange={(e) => {
              handleChangeSelect(e);
            }}
            selectedTopic={input.officeLocationCode}
          /> */}

          {isOther && (
            <>
              <div className="flex flex-col">
                <label className="text-label">First Name</label>
                <input
                  type="text"
                  disabled={firstName}
                  className={`text-input text-black placeholder-gray-400 ${
                    firstName && "cursor-not-allowed"
                  }`}
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
                  className={`text-input text-black placeholder-gray-400 ${
                    lastName && "cursor-not-allowed"
                  }`}
                  placeholder={"Last Name"}
                  value={input.lastName}
                  name="lastName"
                  onChange={(e) => handleChangeSelect(e.target)}
                />
              </div>
              <DatePicker
                isDisabled={dateOfBirth}
                handleChange={(e) => handleChangeSelect(e.target)}
                name="DateOfBirth"
                value={input?.DateOfBirth}
              />
              <InputDropdown
                label={"Gender"}
                isDisabled={gender}
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
            isDisabled={deliveryTime}
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
            applicationId={id}
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
              setIsShowModal(false);
              dispatch(requestOtp(personalDetail?.phoneNumber))
                .then(() => {
                  setIsShowModal(true);
                })
                .catch((err) => {
                  toast.error(err.errorMessage);
                });
            }}
          >
            Submit
          </button>
        </div>
      </div>
      {isShowModal && (
        <FormOtpModalSubmisson data={id ? inputForm.Files : inputForm} />
      )}
    </>
  );
};

export default FormSubmission;
