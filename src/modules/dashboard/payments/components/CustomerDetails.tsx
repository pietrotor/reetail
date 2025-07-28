import { PersonIcon } from "@/components/icons";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const customerDetails = {
  fullName: "Jonathan Smith",
  companyName: "SmithIndustries",
  jobTitle: "Director",
  email: "jonathan@smith.com"
}

const CustomerDetails = () => {
  return (
    <Card
      className="border shadow-[38px_54px_26px_rgba(153,153,153,0.01),21px_30px_22px_rgba(153,153,153,0.05),9px_13px_16px_rgba(153,153,153,0.09),2px_3px_9px_rgba(153,153,153,0.1)] rounded-[11px] border-solid border-white">
      <CardHeader>
        <div className="flex items-center gap-2">
          <PersonIcon />
          <CardTitle className="font-medium">
            Customer Details
          </CardTitle>
        </div>
      </CardHeader>
      <CardContent className="text-sm">
        <div className="flex justify-between my-2">
          <span className="text-xs">
            Full name
          </span>
          <div className="font-medium">
            {customerDetails.fullName}
          </div>
        </div>
        <div className="flex justify-between my-2">
          <span className="text-xs">
            Company name
          </span>
          <div className="font-medium">
            {customerDetails.companyName}
          </div>
        </div>
        <div className="flex justify-between my-2">
          <span className="text-xs">
            Job title
          </span>
          <div className="font-medium">
            {customerDetails.jobTitle}
          </div>
        </div>
        <div className="flex justify-between my-2">
          <span className="text-xs">
            Email
          </span>
          <div className="font-medium">
            {customerDetails.email}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default CustomerDetails;