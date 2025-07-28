import { useRef } from "react";

import {
  useNewPaymentTermStore,
  useNewPaymentTermStoreActions,
} from "../NewPaymentTermForm.store";
import FlowButtons from "./flow-buttons";
import { PaymentMethodSelector } from "./PaymentMethodSelector";
import { StepType } from "./steps.types";

import burgundyLittleGradient from "@/assets/gradients/burgundyLittleGradient.svg";
import { DatePicker, InfoBanner } from "@/components/common";
import FormInput from "@/components/form-input";
import FormSelect from "@/components/form-select";
import { Button } from "@/components/ui";
import { Input } from "@/components/ui/input";
import { formatNumberToDollars } from "@/utils/formatters";

// const CHECKBOXES = [
//   {
//     label:
//       "Allow payment amount to be adjusted up to 5 days after the payment date.",
//     value: "allowVariablePaymentAdjustment",
//   },
//   {
//     label:
//       "Integrate with another database to pull usage and calculate the payment",
//     value: "allowIntegrateDatabase",
//   },
// ] as const;

const selectedClassList = [
  "bg-primary",
  "text-primary-foreground",
  "shadow-xs",
];

export const PaymentDetailsStep = ({ onContinue, onBack }: StepType) => {
  const paymentDetails = useNewPaymentTermStore(
    (state) => state.paymentDetails
  );

  const { setFormData } = useNewPaymentTermStoreActions();

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      paymentDetails: { ...paymentDetails, [e.target.name]: e.target.value },
    });
  };

  const onDateChange = (date: Date | undefined) => {
    setFormData({
      paymentDetails: { ...paymentDetails, firstPaymentDate: date },
    });
  };

  const onSelectChange = (value: string | number, name: string) => {
    setFormData({
      paymentDetails: { ...paymentDetails, [name]: value },
    });
  };

  // const onSwitchChange = (
  //   checked: boolean,
  //   value: "allowVariablePaymentAdjustment" | "allowIntegrateDatabase"
  // ) => {
  //   setFormData({
  //     paymentDetails: {
  //       ...paymentDetails,
  //       [value]: checked,
  //     },
  //   });
  // };

  const otherDiscountAmountRef = useRef<HTMLInputElement>(null);
  const divRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const handleResizeInput = () => {
    const value = paymentDetails.paymentAmount.toString() || "0";
    const numberOfDigits = value.replace(/[^0-9]/g, "").length;
    if (divRef.current) {
      divRef.current.style.width = `${numberOfDigits + 4}ch`;
    }
  };

  // when clicking the div the input should be focused
  const handleDivClick = () => {
    inputRef.current?.focus();
  };

  const handleOtherDiscountAmountChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = e.target.value;
    if (value) {
      otherDiscountAmountRef.current!.classList.add(...selectedClassList);
      onSelectChange(value, "ACHDiscountAmount");
    } else {
      otherDiscountAmountRef.current!.classList.remove(...selectedClassList);
      onSelectChange(0, "ACHDiscountAmount");
    }
  };

  const handleDiscountChange = (value: number) => {
    if (otherDiscountAmountRef.current!.value !== "") {
      otherDiscountAmountRef.current!.value = "";
      otherDiscountAmountRef.current!.classList.remove(...selectedClassList);
    }
    onSelectChange(value, "ACHDiscountAmount");
  };

  return (
    <>
      <div className="flex flex-col py-[15px] gap-[34px] overflow-auto hide-scroll-bar">
        <h1 className="text-[22px]">Let’s set up payment details </h1>
        <div className="flex flex-col h-full w-full gap-[25px]">
          <div className="flex flex-col w-full gap-[10px]">
            <div className="flex flex-col gap-[15px]">
              <div className="flex justify-between text-sm">
                <label>Payment Amount</label>
              </div>

              {paymentDetails.paymentType === "Fixed" ? (
                <section
                  className="relative w-full h-[121px] bg-[#F7F5F4] flex items-center justify-center text-[32px]/[0] font-medium rounded-[8px]"
                  onClick={handleDivClick}
                >
                  <img
                    src={burgundyLittleGradient}
                    className="absolute bottom-0"
                  />
                  <div
                    className="z-20 flex w-0 flex-row gap-2 items-center"
                    ref={divRef}
                  >
                    <Input
                      placeholder="$0.00"
                      name="paymentAmount"
                      ref={inputRef}
                      value={paymentDetails.paymentAmount}
                      onInput={handleResizeInput}
                      onChange={onInputChange}
                      className=" pr-0 md:text-4xl text-4xl bg-black/10 border-none focus-visible:ring-0  focus-visible:outline-none shadow-none"
                    />
                    <span className="opacity-50 text-[25px]">.00</span>
                  </div>
                </section>
              ) : (
                <InfoBanner>
                  This is a variable payment, we’ll send you a reminder to enter
                  the amount on the scheduled date.
                </InfoBanner>
              )}
            </div>
            {/* {paymentDetails.paymentType === "Variable" &&
              CHECKBOXES.map(({ label, value }, i) => (
                <div key={i} className="flex text-sm gap-[5px] text-[#666666]">
                  <Switch
                    thumbClassName="data-[state=unchecked]:bg-[#12121280]"
                    onCheckedChange={(checked) =>
                      onSwitchChange(checked, value)
                    }
                    checked={paymentDetails[value]}
                  />
                  <span>{label}</span>
                </div>
              ))} */}
          </div>

          <DatePicker
            label="When’s the first payment?"
            value={paymentDetails.firstPaymentDate}
            onChange={onDateChange}
            className="w-full"
            calendarProps={{
              fromDate: new Date(Date.now() + 24 * 60 * 60 * 1000),
            }}
          />
          <div className="flex gap-[10px] w-full">
            {[
              {
                label: "How often?",
                name: "paymentFrequency",
                options: [
                  {
                    label: "Monthly",
                    value: "Monthly",
                  },
                  {
                    label: "Quarterly",
                    value: "Quarterly",
                  },
                  {
                    label: "Yearly",
                    value: "Yearly",
                  },
                ],
              },
              {
                label: "For how long?",
                name: "paymentDuration",
                options: Array.from({ length: 12 }, (_, i) => ({
                  label: `${i + 1} month${i > 0 ? "s" : ""}`,
                  value: (i + 1).toString(),
                })),
              },
            ].map(({ label, options, name }, i) => (
              <FormSelect
                key={i}
                label={label}
                placeholder="Select"
                options={options}
                containerClassName="w-full"
                value={(paymentDetails as any)[name]}
                onValueChange={(value) => onSelectChange(value, name)}
              />
            ))}
          </div>
          <PaymentMethodSelector />
          {paymentDetails.paymentMethod === "ACH" && (
            <div className="flex flex-col gap-[15px]">
              <label className="text-sm">
                Would you like to offer customer a discount for enrolling in
                automatic ACH payments?
              </label>
              <div className="flex gap-[10px]">
                <Button
                  size={"lg"}
                  className={`h-[50px] ${
                    paymentDetails.ACHDiscountAmount === 0
                      ? ""
                      : "bg-[#F7F5F4] text-black hover:bg-[#cacaca] hover:text-black"
                  }`}
                  onClick={() => handleDiscountChange(0)}
                >
                  No Discount
                </Button>
                {[2, 5, 10].map((value, i) => (
                  <div
                    key={i}
                    onClick={() => handleDiscountChange(value)}
                    className={`flex center size-[50px] rounded-[8px] text-sm ${
                      paymentDetails.ACHDiscountAmount === value
                        ? selectedClassList.join(" ")
                        : "bg-[#F7F5F4] hover:bg-[#cacaca]"
                    }`}
                  >
                    {value}%
                  </div>
                ))}
                <FormInput
                  ref={otherDiscountAmountRef}
                  className="w-[122px]"
                  placeholder="Other"
                  onChange={handleOtherDiscountAmountChange}
                />
              </div>
            </div>
          )}

          <div className="flex gap-[10px] w-full">
            <FormInput
              label="Late fee"
              type="number"
              min={0}
              placeholder="0.00"
              containerClassName="w-full"
              value={
                paymentDetails.lateFee
                  ? formatNumberToDollars(paymentDetails.lateFee?.toString())
                  : ""
              }
              onChange={(e) =>
                onSelectChange(e.target.value.replace(/[^1-9]/g, ""), "lateFee")
              }
            />
            <FormInput
              label="Days until late fee"
              type="number"
              min={0}
              placeholder="5"
              containerClassName="w-full"
              value={paymentDetails.daysBeforeLateFee || ""}
              onChange={(e) =>
                onSelectChange(e.target.value, "daysBeforeLateFee")
              }
            />
          </div>
        </div>
      </div>
      <FlowButtons
        onBack={onBack}
        onContinue={onContinue}
        continueDisabled={
          !paymentDetails.paymentAmount ||
          !paymentDetails.firstPaymentDate ||
          !paymentDetails.paymentFrequency ||
          !paymentDetails.paymentDuration
        }
      />
    </>
  );
};
