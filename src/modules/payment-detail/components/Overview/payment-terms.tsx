import { CircleCheck } from "lucide-react";

import { SectionContainer } from "../section-continer";
import { PaymentTimeLine } from "./payment-time-line";

import { CashDisplay, InfoList } from "@/components/common";
import { PaymentTermIcon } from "@/components/icons";

type PaymentTermsProps = {
  data: {
    amount: number;
    achDiscount: string;
    paymentType: string;
    firstPayment: string;
    latestPayment?: string;
    nextPayment: string;
    lastPayment: string;
    frequency: string;
    duration: string;
    lateFee: number;
  };
};

export const PaymentTerms = ({ data }: PaymentTermsProps) => {
  return (
    <SectionContainer>
      <div className="w-full flex gap-2 items-center justify-between">
        <div className="flex items-center gap-2 pb-5">
          <PaymentTermIcon />
          <p className="text-[15px] font-medium">Payment Terms</p>
        </div>
      </div>
      <PaymentTimeLine
        data={{
          firstPayment: data.firstPayment,
          latestPayment: data.latestPayment,
          nextPayment: data.nextPayment,
          lastPayment: data.lastPayment,
        }}
      />
      <div className="mt-3">
        {[
          {
            label: "Amount",
            value: (
              <CashDisplay amount={data.amount} decimalClassName="text-xs" />
            ),
          },
          {
            label: "ACH discount",
            value: data.achDiscount,
          },
          {
            label: (
              <div>
                <label className="text-xs">Payment type</label>
                <p className="text-gray-500 text-xs flex gap-1 items-center">
                  <CircleCheck size={12} /> Allow payment amount to be adjusted
                  up to 5 days after the payment date.
                </p>
              </div>
            ),
            value: data.paymentType,
          },
          {
            label: "First payment",
            value: data.firstPayment,
          },
          {
            label: "Frequency",
            value: data.frequency,
          },
          {
            label: "Duration",
            value: data.duration,
          },
          {
            label: "Late fee",
            value: (
              <CashDisplay amount={data.lateFee} decimalClassName="text-xs" />
            ),
          },
        ].map(({ label, value }, idx) => (
          <InfoList label={label} value={value} key={idx} />
        ))}
      </div>
    </SectionContainer>
  );
};
