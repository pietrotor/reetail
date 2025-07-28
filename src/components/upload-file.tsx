import uploadFileImage from "@/assets/images/uploadFile.svg";

export default function UploadFile() {
  return (
    <div className="flex flex-col rounded-[12px] border-2 border-dashed border-[#39393991] bg-[#F3F0ED4D] py-[39px] items-center justify-center gap-2 cursor-pointer">
      <img src={uploadFileImage} alt="upload file" className="mx-auto" width={58.6} height={58.6} />
      <p className="text-sm">
        Drag and Drop file here or{" "}
        <span className="underline underline-offset-[3px]">Choose file</span>
      </p>
    </div>
  );
}
