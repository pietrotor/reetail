import { Eye } from "lucide-react";

import { SectionContainer } from "../section-continer";

import { TransactionRead } from "@/api";
import { CashDisplay } from "@/components/common";
import { Button } from "@/components/ui";
import { ComponentProps } from "react";
import { InvoiceLinkDetail } from "../Invoices/invoice-link-detail";

type RecientPaymentsProps = {
  data: {
    lastPayment?: TransactionRead | null;
    nextPayment: TransactionRead | null;
    client: ComponentProps<typeof InvoiceLinkDetail>["client"];
  };
};

export const RecientPayments = ({ data }: RecientPaymentsProps) => {
  return (
    <div className="w-full grid grid-cols-2 gap-1.5">
      <SectionContainer>
        <p className="text-[15px] font-medium mb-4">Last Completed Payment</p>
        <p className="text-xs">
          Completed:{" "}
          <span className="text-sm font-medium">
            {data.lastPayment?.issued_at
              ? new Date(data.lastPayment?.issued_at).toLocaleDateString(
                  "en-US"
                )
              : "No payments yet"}
          </span>
        </p>
        <div className="w-full flex justify-between mt-1">
          <CashDisplay
            amount={data.lastPayment?.amount || 0}
            className="text-2xl"
            decimalClassName="text-lg"
          />
          <InvoiceLinkDetail
            invoice={data.lastPayment}
            client={data.client}
            customTrigger={
              <Button
                variant={"secondary"}
                className="bg-white drop-shadow-2xl !px-6"
                size={"sm"}
                disabled={!data.lastPayment}
              >
                <Eye className="text-white fill-black !w-6 !h-6" />
                View
              </Button>
            }
          />
        </div>
      </SectionContainer>
      <SectionContainer>
        <p className="text-[15px] font-medium mb-4">Next Payment</p>
        <p className="text-xs">
          Due:{" "}
          <span className="text-sm font-medium">
            {data.nextPayment?.issued_at
              ? new Date(data.nextPayment?.issued_at).toLocaleDateString(
                  "en-US"
                )
              : "N/A"}
          </span>
        </p>
        <div className="w-full flex justify-between mt-1">
          <CashDisplay
            amount={data.nextPayment?.amount || 0}
            className="text-2xl"
            decimalClassName="text-lg"
          />
          <InvoiceLinkDetail
            invoice={data.nextPayment}
            client={data.client}
            customTrigger={
              <Button
                variant={"secondary"}
                className="bg-white drop-shadow-2xl cursor-pointer !px-6"
                size={"sm"}
              >
                {/* <EditIcon className="w-3 h-3 !fill-black" />
                Edit */}
                <Eye className="text-white fill-black !w-6 !h-6" />
                View
              </Button>
            }
          />
        </div>
      </SectionContainer>
    </div>
  );
};
