import { useState } from "react";
import { useDropzone } from "react-dropzone";

import { PdfIcon, TrashIcon } from "../icons";

import ImageIcon from "@/assets/icons/image-icon";
import uploadFileImage from "@/assets/images/uploadFile.svg";
import { cn } from "@/lib/utils";

export type DropZoneProps = {
  setFileUploaded?: (file: File | undefined) => void;
  fileUploaded?: File | undefined;
  className?: string;
  accept?: {
    [key: string]: string[];
  };
};
export const DropZone = ({
  setFileUploaded: parentSetFileUploaded,
  fileUploaded: parentFileUploaded,
  className,
  accept,
}: DropZoneProps) => {
  const [fileUploaded, setFileUploaded] = useState<File | undefined>(
    parentFileUploaded
  );
  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      ...{ ...(accept || { "application/pdf": [] }) },
    },
    onDrop: (acceptedFiles, _fileRejections) => {
      if (acceptedFiles.length > 0) {
        setFileUploaded(acceptedFiles[0]);
        parentSetFileUploaded?.(acceptedFiles[0]);
      }
    },
  });
  const deleteUploadedFile = () => {
    setFileUploaded(undefined);
    parentSetFileUploaded?.(undefined);
  };

  if (fileUploaded) {
    return (
      <div className="flex justify-between items-center flex-row w-full h-16 mt-2 px-4 border-solid border-2 border-gray-200 rounded-lg shadow-sm">
        <div className="flex items-center flex-row gap-4 h-full">
          {fileUploaded.type.startsWith("image") ? (
            <ImageIcon className="text-rose-700 w-6 h-6" />
          ) : (
            <PdfIcon className="text-rose-700 w-6 h-6" />
          )}
          <div className="flex flex-col gap-0">
            <div className="text-[0.85rem] font-medium leading-snug">
              {fileUploaded.name}
            </div>
            <div className="text-[0.7rem] text-gray-500 leading-tight">
              .{fileUploaded.name.split(".").pop()} •{" "}
              {(fileUploaded.size / (1024 * 1024)).toFixed(2)} MB
            </div>
          </div>
        </div>
        <div
          className="p-2 rounded-full border-solid border-2 border-gray-100 shadow-sm hover:bg-accent transition-all select-none cursor-pointer"
          onClick={() => deleteUploadedFile()}
        >
          <TrashIcon className="w-4 h-4" />
        </div>
      </div>
    );
  }
  return (
    <div
      className={cn(
        "flex flex-col rounded-[12px] border-2 border-dashed border-[#39393991] bg-[#F3F0ED4D] w-[551px] h-[364px] items-center justify-center gap-2 cursor-pointer",
        className
      )}
    >
      <section className="h-full flex items-center justify-center">
        <div
          {...getRootProps({ className: "dropzone" })}
          className="flex flex-col items-center justify-center gap-2"
        >
          <input {...getInputProps()} />
          <img src={uploadFileImage} alt="upload file" className="mx-auto" />
          <p className="text-sm">
            Drag and Drop file here or{" "}
            <span className="underline underline-offset-[3px] cursor-pointer">
              Choose file
            </span>
          </p>
        </div>
      </section>
    </div>
  );
};
