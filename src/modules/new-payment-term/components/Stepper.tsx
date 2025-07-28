import { steps } from "../NewPaymentTermForm.store";

import { cn } from "@/lib/utils";

const STEPST_WITH_PROGRESS = [
  "upload-contract",
  "customer-details",
  "pyment-type",
  "payment-details",
];

export const Stepper = ({ currentStep }: { currentStep: steps }) => {
  if (!STEPST_WITH_PROGRESS.includes(currentStep)) {
    return null;
  }
  return (
    <div className="flex gap-[3px] self-center">
      {STEPST_WITH_PROGRESS.map((step, i) => (
        <div
          key={i}
          className={cn(
            "h-[4px] w-[90px] rounded-full",
            currentStep === step ? "bg-[#D6B2BF]" : "bg-[#F7F5F4]"
          )}
        />
      ))}
    </div>
  );
};
