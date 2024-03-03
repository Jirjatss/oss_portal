import Image from "next/image";
import React, { useState } from "react";
import { OSSIcons } from "../../../../public/assets/icons/parent";

function FormUploadPhoto({ onClick }) {
  const [image, setImage] = useState({
    citizenPhoto: null,
    identityDocument: null,
  });

  const handleImageChange = (event, type) => {
    const selectedImage = event.target.files[0];
    const reader = new FileReader();

    reader.onload = () => {
      setImage((prevState) => ({
        ...prevState,
        [type]: reader.result,
      }));
    };

    reader.readAsDataURL(selectedImage);
  };

  return (
    <>
      <div>
        <h1 className="text-[28px] font-semibold text-[#2E2D2D] mb-2">
          Upload Photo
        </h1>
        <p className="text-[#646464] text-[16px] mb-10">
          Please upload clear and legible copies of your photos and documents.
          Ensure all <br />
          details are visible for accurate processing.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-10 mb-16">
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
                    } // Ubah penanganan klik
                  >
                    <OSSIcons name={"Cancel"} />
                  </div>
                  <div style={{ width: "600px", height: "300px" }}>
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
                  <div style={{ width: "600px", height: "300px" }}>
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
                  } // Ubah pemanggilan ID
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
              } // Ubah pemanggilan ID
            >
              {image.identityDocument ? "Change Photo" : "Upload"}
            </p>
          </div>
        </div>
      </div>

      <button
        className="bg-[#1C25E7] py-4 px-32 text-[#F3F3F3] flex m-auto rounded-[8px]"
        onClick={onClick}
      >
        Submit
      </button>
    </>
  );
}

export default FormUploadPhoto;
