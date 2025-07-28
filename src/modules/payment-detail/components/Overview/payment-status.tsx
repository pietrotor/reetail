import { Clock } from "lucide-react";

import { CashDisplay } from "@/components/common";
import { Button } from "@/components/ui";

type PaymentStatusProps = {
  data: {
    amount: number;
    setAllInvoices: () => void;
  };
};

export const PaymentStatus = ({ data }: PaymentStatusProps) => {
  return (
    <div className="w-full bg-[#E3EDF7] text-[#3296FF] flex justify-between border-white border-2 rounded-lg pl-4 pr-0.5 py-0.5">
      <p className="flex items-center gap-2 font-medium ">
        <Clock size={16} />
        Payment processing
      </p>
      <div className="flex gap-4 items-center">
        <CashDisplay
          amount={data.amount}
          className="text-base"
          decimalClassName="text-xs"
        />
        <Button
          variant={"secondary"}
          size={"lg"}
          className="bg-white h-auto py-3.5 cursor-pointer"
          onClick={() => data.setAllInvoices()}
        >
          View all Invoices
        </Button>
      </div>
    </div>
  );
};
