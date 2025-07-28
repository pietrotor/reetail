import { PencilIcon } from "@/components/icons";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { formatCurrency } from "@/utils/formatters";

export default function NextPayment() {
  return (
    <Card
      className="bg-[#f8f8f8] rounded-[11px] border-white border shadow-[38px_54px_26px_rgba(153,153,153,0.01),21px_30px_22px_rgba(153,153,153,0.05),9px_13px_16px_rgba(153,153,153,0.09),2px_3px_9px_rgba(153,153,153,0.1)] border-solid"
    >
      <CardTitle className="font-medium">
        Next Payment
      </CardTitle>
      <CardContent>
        <div className="flex text-xs gap-1">
          <span>Due:</span>
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
            <PencilIcon /> Edit
          </button>
        </div>
      </CardContent>
    </Card>
  )
}
