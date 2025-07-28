import {
  useNewPaymentTermStore,
  useNewPaymentTermStoreActions,
} from "../NewPaymentTermForm.store";

import { Switch } from "@/components/ui/switch";

export const PaymentAmountToggle = () => {
  const paymentDetails = useNewPaymentTermStore(
    (state) => state.paymentDetails
  );
  const { setFormData } = useNewPaymentTermStoreActions();

  const handleSwitchChange = (checked: boolean) => {
    setFormData({
      paymentDetails: {
        ...paymentDetails,
        paymentType: checked ? "Variable" : "Fixed",
      },
    });
  };

  return (
    <div className="flex gap-[5px] items-center text-xs font-medium text-[#121212]">
      <span
        className={
          paymentDetails.paymentType === "Variable" ? "opacity-50" : ""
        }
      >
        Fixed payment
      </span>
      <Switch
        onCheckedChange={handleSwitchChange}
        checked={paymentDetails.paymentType === "Variable"}
      />
      <span
        className={paymentDetails.paymentType === "Fixed" ? "opacity-50" : ""}
      >
        Variable payment
      </span>
    </div>
  );
};
