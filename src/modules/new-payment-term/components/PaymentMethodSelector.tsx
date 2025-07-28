import {
  PaymentMethod,
  useNewPaymentTermStore,
  useNewPaymentTermStoreActions,
} from "../NewPaymentTermForm.store";

import { BankIcon, CreditCardIcon } from "@/components/icons";
import { Button } from "@/components/ui";
import { cn } from "@/lib/utils";

export const PaymentMethodSelector = () => {
  const paymentDetails = useNewPaymentTermStore(
    (state) => state.paymentDetails
  );
  const { setFormData } = useNewPaymentTermStoreActions();

  const paymentMethod = useNewPaymentTermStore(
    (state) => state.paymentDetails.paymentMethod
  );

  const onChangePaymentMethod = (paymentMethod: PaymentMethod) => {
    setFormData({
      paymentDetails: {
        ...paymentDetails,
        paymentMethod,
      },
    });
  };
  return (
    <div>
      <label className="text-sm">Choose payment method</label>
      <div className="grid grid-cols-2 gap-[10px] w-full max-w-full mt-2">
        <Button
          className="w-full max-w-full flex justify-between"
          size={"lg"}
          variant={paymentMethod === "Credit Card" ? "default" : "secondary"}
          onClick={() => onChangePaymentMethod("Credit Card")}
        >
          <div className="flex justify-between items-center gap-2">
            <CreditCardIcon />
            Credit Card
          </div>
          <div className="flex items-center">
            3%
            <span
              className={cn(
                "text-xs ml-0.5 mt-0.5",
                paymentMethod === "Credit Card"
                  ? "text-white/50"
                  : "text-black/50"
              )}
            >
              Processing Fee
            </span>
          </div>
        </Button>
        <Button
          className="w-full max-w-full flex justify-between"
          size={"lg"}
          variant={paymentMethod === "ACH" ? "default" : "secondary"}
          onClick={() => onChangePaymentMethod("ACH")}
        >
          <div className="flex justify-between items-center gap-2">
            <BankIcon />
            ACH
          </div>
          <div className="flex items-center">
            0.8%
            <span
              className={cn(
                "text-xs ml-0.5 mt-0.5",
                paymentMethod === "ACH" ? "text-white/50" : "text-black/50"
              )}
            >
              Processing Fee
            </span>
          </div>
        </Button>
        <Button
          className="w-full max-w-full flex items-center col-span-2"
          size={"lg"}
          variant={paymentMethod === "Client choose" ? "default" : "secondary"}
          onClick={() => onChangePaymentMethod("Client choose")}
        >
          <BankIcon />
          <CreditCardIcon />
          Let the client pick
        </Button>
      </div>
    </div>
  );
};
