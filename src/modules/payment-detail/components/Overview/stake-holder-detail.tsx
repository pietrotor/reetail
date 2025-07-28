import { SectionContainer } from "../section-continer";

import { InfoList } from "@/components/common";
import { EditIcon, TieIcon } from "@/components/icons";
import { Button } from "@/components/ui";

type StakeHolderDetailProps = {
  data: {
    fullName: string;
    email: string;
  };
};

export const StakeHolderDetail = ({ data }: StakeHolderDetailProps) => {
  return (
    <SectionContainer>
      <div className="w-full flex gap-2 items-center justify-between mb-5">
        <div className="flex items-center gap-2">
          <TieIcon />
          <p className="text-[15px] font-medium">Merchant Details</p>
        </div>
        <Button variant={"ghost"}>
          <EditIcon className="w-3 h-3 !fill-gray-500" />
        </Button>
      </div>
      <div className="flex flex-col gap-1">
        {[
          { label: "Full name", value: data.fullName },
          { label: "Email", value: data.email },
        ].map((item, i) => (
          <InfoList key={i} label={item.label} value={item.value} />
        ))}
      </div>
    </SectionContainer>
  );
};
