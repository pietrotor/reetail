import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { formatCurrency } from "@/utils/formatters";
import { SVGProps } from "react";

export default function LastPayment() {
  return (
    <Card
      className="bg-[#f8f8f8] rounded-[11px] border-white border shadow-[38px_54px_26px_rgba(153,153,153,0.01),21px_30px_22px_rgba(153,153,153,0.05),9px_13px_16px_rgba(153,153,153,0.09),2px_3px_9px_rgba(153,153,153,0.1)] border-solid"
    >
      <CardTitle className="font-medium">
        Last Completed Payment
      </CardTitle>
      <CardContent>
        <div className="flex text-xs gap-1">
          <span>Completed:</span>
          <span className="font-medium">
            12.03.2025
          </span>
        </div>

        <div className="flex justify-between">
          <div className="flex items-end">
            <span className="text-2xl">
              {formatCurrency({
                value: 5250,
                currency: "USD",
                fractionDigits: 0,
              })}
            </span>
            <span className="text-base text-[#7a7a7a]">.00</span>
          </div>

          <button
            className="flex bg-[#FFFFFF] justify-center items-center rounded-[6px] py-2 px-8 gap-2 shadow-[22px_31px_15px_rgba(107,107,107,0.01),12px_17px_13px_rgba(107,107,107,0.05),5px_8px_9px_rgba(107,107,107,0.09),1px_2px_5px_rgba(107,107,107,0.1)]"
          >
            <EyeIcon /> View
          </button>
        </div>
      </CardContent>
    </Card>
  )
}

function EyeIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      width={16}
      height={11}
      viewBox="0 0 16 11"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M3.0248 1.74461C4.23296 0.801415 5.79377 0 7.61458 0C9.43543 0 10.9962 0.801415 12.2044 1.74461C13.4136 2.68866 14.3074 3.80357 14.8074 4.50465L14.8451 4.5572C15.0245 4.80661 15.2292 5.09136 15.2292 5.48958C15.2292 5.88781 15.0245 6.17256 14.8451 6.42196L14.8074 6.47452C14.3074 7.17563 13.4136 8.29048 12.2044 9.23454C10.9962 10.1778 9.43543 10.9792 7.61458 10.9792C5.79377 10.9792 4.23296 10.1778 3.0248 9.23454C1.81555 8.29048 0.921726 7.17563 0.421749 6.47452L0.384051 6.42196C0.204737 6.17256 0 5.88781 0 5.48958C0 5.09136 0.204737 4.80661 0.384051 4.5572L0.421749 4.50465C0.921726 3.80357 1.81555 2.68866 3.0248 1.74461ZM5.13542 5.48958C5.13542 6.85879 6.24538 7.96875 7.61458 7.96875C8.98379 7.96875 10.0938 6.85879 10.0938 5.48958C10.0938 4.12038 8.98379 3.01042 7.61458 3.01042C6.24538 3.01042 5.13542 4.12038 5.13542 5.48958Z"
        fill="#121212"
      />
    </svg>
  )
}