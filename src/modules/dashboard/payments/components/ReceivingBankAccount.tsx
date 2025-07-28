import { PencilIcon, TieIcon } from "@/components/icons";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";


export default function ReceivingBankAccount() {
  return (
    <Card
      className="border shadow-[38px_54px_26px_rgba(153,153,153,0.01),21px_30px_22px_rgba(153,153,153,0.05),9px_13px_16px_rgba(153,153,153,0.09),2px_3px_9px_rgba(153,153,153,0.1)] rounded-[11px] border-solid border-white">
      <CardHeader>
        <div className="flex items-center gap-2">
          <TieIcon />
          <CardTitle className="font-medium">
            Receiving Bank Account
          </CardTitle>
          <PencilIcon
            className="ml-auto"
            fillOpacity={.5}
          />
        </div>
      </CardHeader>
      <CardContent className="text-sm">
        <div className="flex flex-col gap-1">
          <span>PNC Checking</span>
          <div className="text-xs">
            Manual checking &bull; 4415
          </div>
        </div>
      </CardContent>
    </Card>
  )
}