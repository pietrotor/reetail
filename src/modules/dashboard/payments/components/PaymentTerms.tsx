import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import PaymentTermsTimeline from "./PaymentTermsTimeline";
import { formatCurrency } from "@/utils/formatters";
import { Clock } from "lucide-react";
import { ReceiptIcon } from "@/components/icons";

const paymentTerms = {
  amount: 10000.56,
  achDiscount: 5,
  paymentType: "Variable",
  firstPayment: "03/03/2024",
  frequency: "Monthly",
  duration: "12 Months",
  lateFee: 500.00,
}

export default function PaymentTerms() {
  return (
    <Card
      className="border shadow-[38px_54px_26px_rgba(153,153,153,0.01),21px_30px_22px_rgba(153,153,153,0.05),9px_13px_16px_rgba(153,153,153,0.09),2px_3px_9px_rgba(153,153,153,0.1)] rounded-[11px] border-solid border-white">
      <CardHeader>
        <div className="flex items-center gap-2">
          <ReceiptIcon />
          <CardTitle className="font-medium">
            Payment Terms
          </CardTitle>
        </div>
      </CardHeader>
      <CardContent className="text-sm">
        <div className="w-full">
          <PaymentTermsTimeline />
        </div>
        <div className="flex justify-between my-3">
          <span className="text-xs">
            Amount
          </span>
          <div className="font-medium">
            {formatCurrency({
              value: paymentTerms.amount | 0,
              currency: "USD",
              fractionDigits: 0,
            })}
            <span className="text-xs text-[#7a7a7a] align-text-bottom">
              .{((paymentTerms.amount % 1) * 100).toLocaleString('en-US', { minimumIntegerDigits: 2, useGrouping: false })}
            </span>
          </div>
        </div>
        <div className="flex justify-between my-3">
          <span className="text-xs">
            ACH Discount
          </span>
          <div className="font-medium">
            {paymentTerms.achDiscount}%
          </div>
        </div>
        <div className="flex justify-between my-3 flex-wrap">
          <span className="text-xs">
            Payment type
          </span>
          <div className="font-medium">
            {paymentTerms.paymentType}
          </div>
          <div className="basis-full flex items-center gap-1 text-xs text-[#666666]">
            <Clock size={12} />
            <span>Allow payment amount to be adjusted up to 5 days after the payment date.</span>
          </div>
        </div>
        <div className="flex justify-between my-3">
          <span className="text-xs">
            First payment
          </span>
          <div className="font-medium">
            {paymentTerms.firstPayment}
          </div>
        </div>
        <div className="flex justify-between my-3">
          <span className="text-xs">
            Frequency
          </span>
          <div className="font-medium">
            {paymentTerms.frequency}
          </div>
        </div>
        <div className="flex justify-between my-3">
          <span className="text-xs">
            Duration
          </span>
          <div className="font-medium">
            {paymentTerms.duration}
          </div>
        </div>
        <div className="flex justify-between my-3">
          <span className="text-xs">
            Late Fee
          </span>
          <div className="font-medium">
            {formatCurrency({
              value: paymentTerms.lateFee | 0,
              currency: "USD",
              fractionDigits: 0,
            })}
            <span className="text-xs text-[#7a7a7a] align-text-bottom">
              .{((paymentTerms.lateFee % 1) * 100).toLocaleString('en-US', { minimumIntegerDigits: 2, useGrouping: false })}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}