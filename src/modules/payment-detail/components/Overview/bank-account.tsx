import { SectionContainer } from "../section-continer";

import { EditIcon, TieIcon } from "@/components/icons";
import { Button } from "@/components/ui";

type BankAccountDetailProps = {
  data: {
    name: string;
    accountNumber: string;
  };
};

export const BankAccountDetail = ({ data }: BankAccountDetailProps) => {
  return (
    <SectionContainer className="gap-5">
      <div className="w-full flex gap-2 items-center justify-between mb-5">
        <div className="flex items-center gap-2">
          <TieIcon />
          <p className="text-[15px] font-medium">Receiving Bank Account</p>
        </div>
        <Button variant={"ghost"}>
          <EditIcon className="w-3 h-3 !fill-gray-500" />
        </Button>
      </div>
      <p className="text-sm font-medium">{data.name}</p>
      <div className="flex gap-1 items-center mt-1">
        <p className="text-xs font-normal">Manual checking</p>
        <span className="w-1 h-1 rounded-full bg-black"></span>
        <p className="text-xs font-normal">{data.accountNumber}</p>
      </div>
    </SectionContainer>
  );
};
