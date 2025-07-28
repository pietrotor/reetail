import { SectionContainer } from "../section-continer";

import { InfoList } from "@/components/common";
import { UserIcon } from "@/components/icons";

type CustomerDeatilProps = {
  data: {
    fullName: string;
    company: string;
    jobTitle: string;
    email: string;
  };
};

export const CustomerDetail = ({ data }: CustomerDeatilProps) => {
  return (
    <SectionContainer>
      <div className="w-full flex gap-2 items-center mb-5">
        <UserIcon />
        <p className="text-[15px] font-medium">Client Details</p>
      </div>
      {/* <p className="text-7xl font-light text-center py-3">STARK</p> */}
      <div className="flex flex-col gap-1">
        {[
          { label: "Full name", value: data.fullName },
          { label: "Email", value: data.email },
          { label: "Company", value: data.company },
          { label: "Job title", value: data.jobTitle },
        ].map((item, i) => (
          <InfoList key={i} label={item.label} value={item.value} />
        ))}
      </div>
    </SectionContainer>
  );
};
