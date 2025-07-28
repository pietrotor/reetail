import FlowButtons from "./flow-buttons";
import { StepType } from "./steps.types";
import {
  useNewPaymentTermStore,
  useNewPaymentTermStoreActions,
} from "../NewPaymentTermForm.store";

import { CalendarBlockedIcon, VariableIcon } from "@/components/icons";
import { Button } from "@/components/ui";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

const PAYMENTS_TYPES = [
  {
    type: "Fixed",
    label: "Fixed payment",
    icon: CalendarBlockedIcon,
    description: "Always the same amount – like a subscription or rent.",
  },
  {
    type: "Variable",
    label: "Variable payment",
    icon: VariableIcon,
    description: "Changes over time – like a utility bill or commission.",
  },
];

export const PaymentTypStep = ({ onContinue, onBack }: StepType) => {
  const paymentDetails = useNewPaymentTermStore(
    (state) => state.paymentDetails
  );

  const { setFormData } = useNewPaymentTermStoreActions();

  const onHandleChangePaymentType = (paymentType: "Fixed" | "Variable") => {
    setFormData({
      paymentDetails: {
        ...paymentDetails,
        paymentType,
      },
    });
  };
  return (
    <div className="flex flex-col h-[638px] overflow-y-auto py-[15px] gap-[34px]">
      <h1 className="text-[22px]">Let’s set up payment details </h1>
      <div className="flex flex-col h-full w-full gap-[12px]">
        <Label>Choose payment type</Label>
        {PAYMENTS_TYPES.map(({ type, label, icon: Icon, description }, i) => (
          <Button
            key={i}
            onClick={() =>
              onHandleChangePaymentType(type as "Fixed" | "Variable")
            }
            variant={
              paymentDetails.paymentType === type ? "default" : "secondary"
            }
            className="w-full flex justify-between"
            size={"lg"}
          >
            <span className="flex gap-1 items-center">
              <Icon />
              {label}
            </span>
            <span
              className={cn(
                "text-xs",
                paymentDetails.paymentType === type
                  ? "text-white/50"
                  : "text-black/50"
              )}
            >
              {description}
            </span>
          </Button>
        ))}
      </div>
      <FlowButtons onBack={onBack} onContinue={onContinue} />
    </div>
  );
};
