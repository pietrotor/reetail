import { toast } from "sonner";

import { CopyTextIcon, SuccessSentIcon } from "@/components/icons";
import { InputWithIcon } from "@/components/ui";

type SuccessStepProps = {
  paymentTermId: string;
};

export const SuccessStep = ({ paymentTermId }: SuccessStepProps) => {
  const onCopyIconClick = () => {
    navigator.clipboard.writeText(
      import.meta.env.VITE_FRONTEND_URL +
        "/signup/client-form?payment_term_id=" +
        paymentTermId
    );
    toast.success("Copied to clipboard");
  };
  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <div className="flex items-center justify-center rounded-full success-bg p-4 w-full ">
        <SuccessSentIcon />
      </div>
      <div className="flex flex-col items-center justify-center gap-2 w-2/3">
        <h1 className="text-2xl font-bold">All done!</h1>
        <p className="text-sm text-gray-500 text-center">
          Make it easy for your customer to join. Share your unique referral
          link below to invite them now.
        </p>
      </div>
      <div className="flex flex-col items-center justify-center gap-2 w-2/3">
        <InputWithIcon
          icon={
            <CopyTextIcon
              className="cursor-pointer"
              onClick={onCopyIconClick}
            />
          }
          iconPosition="right"
          placeholder="https://www.google.com"
          className="w-full bg-gray-bg border-gray-bg"
          value={
            import.meta.env.VITE_FRONTEND_URL +
            "/signup/client-form?payment_term_id=" +
            paymentTermId
          }
          disabled
        />
      </div>
    </div>
  );
};
