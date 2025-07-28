import { Clock } from "lucide-react";
import { formatCurrency } from "@/utils/formatters";

const paymentsProcessing = [
  {
    amount: 5000
  }
]

export default function ProcessingPayments() {
  const totalAmount = paymentsProcessing.map(x => x.amount).reduce((a, b) => a + b);
  const fractionalCurrency = (totalAmount % 1) * 100

  return (
    <div className="flex items-center gap-2.5 border pl-5 pr-[5px] py-[5px] rounded-xl border-solid border-white bg-[#e3edf7]">
      <div className="flex items-center mr-auto gap-2 text-[#3296FF]">
        <Clock size={14} />
        <span className="text-sm">
          {paymentsProcessing.length} Payment Processing
        </span>
      </div>
      <div>
        {formatCurrency({
          value: totalAmount,
          currency: "USD",
          fractionDigits: 0,
        })}
        <span className="text-xs text-[#72777b] align-text-bottom">
          .{fractionalCurrency.toLocaleString('en-US', { minimumIntegerDigits: 2, useGrouping: false })}
        </span>
      </div>
      <button
        className="flex justify-center items-center text-base bg-[#FFFFFF] py-3 px-8 shadow-[22px_31px_15px_rgba(107,107,107,0.01),12px_17px_13px_rgba(107,107,107,0.05),5px_8px_9px_rgba(107,107,107,0.09),1px_2px_5px_rgba(107,107,107,0.1)] rounded-md"
      >
        View all Invoices
      </button>
    </div>
  )
}