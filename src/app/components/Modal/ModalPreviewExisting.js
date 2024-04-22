import { OSSIcons } from "../../../../public/assets/icons/parent";

function ModalPreviewExisting({ image }) {
  //   console.log("image:", image);
  return (
    <dialog id="modalPreviewExisting" className="modal">
      <div className=" bg-white flex flex-col px-10 py-7 rounded-[20px]  relative lg:mx-0 mx-5">
        <form method="dialog">
          <button className="absolute top-7 right-7" formMethod="dialog">
            <OSSIcons name={"Cancel"} fill="#2E2D2D" />
          </button>
        </form>

        <img
          src={image?.url}
          className="lg:max-w-[514px] w-full mt-5 rounded-xl"
        />
      </div>
    </dialog>
  );
}

export default ModalPreviewExisting;
