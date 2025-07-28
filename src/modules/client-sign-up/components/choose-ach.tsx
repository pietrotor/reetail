import { UseFormReturn } from "react-hook-form";

import { useClientSignUpStore } from "../ClientSignUp.store";
import { ClientSignUpForm } from "../types";

import { PaymentMethod } from "@/api";

type ChooseAchProps = {
  form: UseFormReturn<ClientSignUpForm>;
  isUserLoggedIn: boolean;
};

export default function ChooseAch({ form, isUserLoggedIn }: ChooseAchProps) {
  const setStep = useClientSignUpStore((state) => state.actions.setStep);
  const handleSelect = (method: PaymentMethod) => {
    form.setValue("paymentMethod", method);
    if (isUserLoggedIn) {
      setStep("consent");
    } else setStep("profile");
  };

  return (
    <div className="flex gap-[25px]">
      {[
        {
          title: "Automatic ACH",
          discount: "5",
          amount: "$10,760 + 9.5% of sales ",
          frequency: "Monthly",
          type: "Automatic",
          discountClassName: "bg-[#291D23] text-white",
          buttonClassName: "button-gradient text-white",
          value: PaymentMethod.ACH,
        },
        {
          title: "Credit Card /Manual ACH",
          discount: "0",
          amount: "$10,800 + 10% of sales ",
          frequency: "Monthly",
          type: "Manual",
          discountClassName: "bg-[#EBEBEB] text-[#00000080]",
          buttonClassName: "button-light-gradient",
          value: PaymentMethod.Credit_Card,
        },
      ].map(
        (
          {
            title,
            discount,
            amount,
            frequency,
            type,
            discountClassName,
            buttonClassName,
            value,
          },
          i
        ) => (
          <div
            key={i}
            className="flex flex-col w-[380px] h-[300px] p-[25px] justify-between bg-white rounded-2xl"
          >
            <div className="flex justify-between items-center font-medium">
              <h1>{title}</h1>
              <span
                className={`py-[5px] px-[10px] w-[120px] rounded-full text-center text-sm ${discountClassName}`}
                style={{ lineHeight: "26px" }}
              >
                {discount}% Discount
              </span>
            </div>

            <div className="flex flex-col gap-[15px]">
              <div className="flex justify-between">
                {[
                  {
                    label: "Amount",
                    text: amount,
                  },
                  {
                    label: "Frequency",
                    text: frequency,
                  },
                ].map(({ label, text }, i) => (
                  <div key={i} className="flex flex-col">
                    <label className="text-sm opacity-50">{label}</label>
                    <span className="text-xl font-medium">{text}</span>
                  </div>
                ))}
              </div>
              <button
                onClick={() => handleSelect(value)}
                className={`py-[10px] rounded-[6px] ${buttonClassName}`}
              >
                Select {type}
              </button>
            </div>
          </div>
        )
      )}
    </div>
  );
}
