import { ChevronRightIcon } from "lucide-react";
import { ComponentProps } from "react";

import StatusBadge from "@/components/status-badge";
import { Card, CardFooter } from "@/components/ui/card";
import { formatCurrency } from "@/utils/formatters";

type Props = {
  status: ComponentProps<typeof StatusBadge>["variant"];
  value: number;
  invoicesNumber: number;
};

const DashboardCard = ({ status, value, invoicesNumber }: Props) => {
  const formattedValue = formatCurrency({
    value: value,
  }).split(".");

  return (
    <Card className="min-w-[310px] gap-10 p-4 shadow-xl">
      <StatusBadge variant={status} />
      <CardFooter className="justify-between">
        <div className="flex flex-col">
          <span className="text-xs text-[#B4B4B4]">This month</span>
          <p className="text-2xl font-medium">
            {formattedValue[0]}
            <span className="text-base text-[#7A7A7A]">
              .{formattedValue[1]}
            </span>
          </p>
        </div>
        <div className="flex items-center self-end">
          <span className="text-[#A5A5A5]">{invoicesNumber} invoices</span>
          <ChevronRightIcon size={22} className="text-[#C8C8C8]" />
        </div>
      </CardFooter>
    </Card>
  );
};

export default DashboardCard;
