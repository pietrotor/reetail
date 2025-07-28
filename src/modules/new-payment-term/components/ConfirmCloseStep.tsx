import {
  useNewPaymentTermStore,
  useNewPaymentTermStoreActions,
} from "../NewPaymentTermForm.store";

import { SuccessSentIcon } from "@/components/icons";
import { Button } from "@/components/ui";

export const ConfirmCloseStep = () => {
  const { onOpenChange, setStep } = useNewPaymentTermStoreActions();
  const stepBeforeClose = useNewPaymentTermStore(
    (state) => state.stepBeforeClose
  );
  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <div className="flex items-center justify-center rounded-full success-bg p-4 w-full ">
        <SuccessSentIcon />
      </div>
      <div className="flex flex-col items-center justify-center gap-2 w-2/3">
        <h1 className="text-2xl font-bold text-center">
          Are you sure you want to close the dialog?
        </h1>
        <p className="text-sm text-center">
          You will lose all the information you have entered.
        </p>
      </div>
      <div className="flex flex-row items-center justify-center gap-2 w-2/3">
        <Button
          variant="outline"
          className=""
          onClick={() => setStep(stepBeforeClose ?? "upload-contract")}
        >
          No, stay
        </Button>
        <Button
          variant="destructive"
          className=""
          onClick={() => onOpenChange(false)}
        >
          Yes, close
        </Button>
      </div>
    </div>
  );
};
