import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";

type Props = {
  onContinue: () => void;
  continueDisabled?: boolean;
  onBack: () => void;
};

export default function FlowButtons({
  onBack,
  onContinue,
  continueDisabled,
}: Props) {
  return (
    <div className="flex justify-between">
      {[
        {
          label: (
            <>
              <ChevronLeft /> Go back
            </>
          ),
          className: "bg-[#F7F5F4] text-black flex center gap-[5px]",
          onClick: onBack,
        },
        {
          label: "Continue",
          onClick: onContinue,
        },
      ].map(({ label, className, onClick }, i) => (
        <Button
          key={i}
          className={`w-[174px] h-[45px] px-[17px] py-[8px] cursor-pointer text-base ${className}`}
          onClick={onClick}
          disabled={i === 1 && continueDisabled}
        >
          {label}
        </Button>
      ))}
    </div>
  );
}
