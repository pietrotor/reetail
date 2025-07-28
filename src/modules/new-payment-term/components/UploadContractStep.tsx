import { Info } from "lucide-react";

import { StepType } from "./steps.types";
import {
  useNewPaymentTermStore,
  useNewPaymentTermStoreActions,
} from "../NewPaymentTermForm.store";

import redGradient from "@/assets/gradients/redGradient.svg";
import { DropZone } from "@/components/common";
import { PdfIcon } from "@/components/icons";
import { Button } from "@/components/ui/button";

export const UploadContractStep = ({ onContinue }: StepType) => {
  const contractFile = useNewPaymentTermStore((state) => state.contractFile);
  const { setFormData } = useNewPaymentTermStoreActions();

  const onFileUpload = (file: File | undefined) => {
    setFormData({ contractFile: file });
  };

  return (
    <>
      <div className="flex flex-col gap-[34px]">
        <h1 className="text-[22px]">Start by uploading your contract</h1>
        <DropZone fileUploaded={contractFile} setFileUploaded={onFileUpload} />
        <div className="flex justify-between w-full text-xs text-[#9F9F9F]">
          <span>Supported formats: XLS, XLSX</span>
          <span>Maximum size: 25MB</span>
        </div>
      </div>

      <div className="relative contract-example-container flex justify-between items-center py-[23px] px-5 h-[104px] rounded-xl overflow-hidden">
        <img
          src={redGradient}
          alt="red gradient"
          className="absolute right-0 -z-10"
        />
        <div className="flex flex-col gap-2">
          <h1 className="flex items-center gap-2">
            <div className="bg-white p-1.5 rounded-[6px] flex items-center justify-center">
              <PdfIcon />
            </div>
            Contract Example
          </h1>
          <p className="text-[#666666] text-xs">
            You may download the attached example as a starting point.
          </p>
        </div>
        <Button className="bg-white text-black rounded-sm text-sm cursor-pointer hover:bg-[#F3F0ED]">
          Download
        </Button>
      </div>

      <div className="flex justify-between">
        <Button
          variant="ghost"
          className="text-xs text-[#FF0000] cursor-pointer"
        >
          <Info /> Need help?
        </Button>
        <Button
          className="w-[174px] !h-[45px] px-[17px] py-[8px] cursor-pointer text-base"
          onClick={onContinue}
        >
          Continue
        </Button>
      </div>
    </>
  );
};
