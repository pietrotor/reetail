import { PencilIcon, TieIcon } from "@/components/icons";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";


const stakeholderDetails = {
  fullName: "Jonathan Smith",
  email: "jonathan@smith.com",
  phone: "(555)555-5555"
}

export default function StakeholderDetails() {
  return (
    <Card 
      className="border shadow-[38px_54px_26px_rgba(153,153,153,0.01),21px_30px_22px_rgba(153,153,153,0.05),9px_13px_16px_rgba(153,153,153,0.09),2px_3px_9px_rgba(153,153,153,0.1)] rounded-[11px] border-solid border-white">
      <CardHeader>
        <div className="flex items-center gap-2">
          <TieIcon />
          <CardTitle className="font-medium">
            Stakeholder Details
          </CardTitle>
          <PencilIcon 
            className="ml-auto" 
            fillOpacity={.5}
          />
        </div>
      </CardHeader>
      <CardContent className="text-sm">
        <div className="flex justify-between my-2">
          <span className="text-xs">
            Full name
          </span>
          <div className="font-medium">
            {stakeholderDetails.fullName}
          </div>
        </div>
        <div className="flex justify-between my-2">
          <span className="text-xs">
            Email
          </span>
          <div className="font-medium">
            {stakeholderDetails.email}
          </div>
        </div>
        <div className="flex justify-between my-2">
          <span className="text-xs">
            Phone
          </span>
          <div className="font-medium">
            {stakeholderDetails.phone}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}