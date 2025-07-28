import { ComponentProps, useMemo } from "react";

import { InvoiceLinkDetail } from "./invoice-link-detail";

import { CashDisplay } from "@/components/common";
import StatusBadge from "@/components/status-badge";
import Table from "@/components/table";
import { useGetInvoices } from "@/hooks/invoices/useGetInvoices";
import { TransactionStatusBadge } from "@/utils/enums";
import { formatDateToString } from "@/utils/formatters";
import { useParams } from "react-router";

const columns = [
  {
    value: "Invoice",
  },
  {
    value: "Due",
  },
  {
    value: "Status",
  },
  {
    value: "Amount",
  },
  {
    value: "",
  },
];

type TAllInvoicesTableProps = {
  clientData: ComponentProps<typeof InvoiceLinkDetail>["client"];
};

export function AllInvoicesTable({ clientData }: TAllInvoicesTableProps) {
  const { paymentId } = useParams();

  const { data, isLoading, isFetching } = useGetInvoices({
    paymentTermId: paymentId!,
    initialPaginationValues: {
      skip: 0,
      limit: 100,
      order_by: "issued_at",
      order_direction: "asc",
    },
  });

  const rows = useMemo(
    () =>
      data.map((item) => [
        {
          value: item.id,
        },
        {
          value: (() => {
            const [shortDate, year] = formatDateToString(item.issued_at!).split(
              ","
            );

            return (
              <span className="">
                {shortDate},{" "}
                <span className="text-xs text-gray-400">{year}</span>
              </span>
            );
          })(),
        },
        {
          value: (
            <StatusBadge
              variant={TransactionStatusBadge[item.status]}
              size="md"
            />
          ),
        },
        {
          value: (
            <CashDisplay amount={item.amount} decimalClassName="text-xs" />
          ),
        },
        {
          value: (
            <InvoiceLinkDetail
              client={clientData}
              invoice={item}
            />
          ),
        },
      ]),
    [data]
  );

  return (
    <div className="flex flex-col w-full gap-6">
      <Table
        isLoading={isLoading || isFetching}
        columns={columns}
        rows={rows}
        className="text-sm w-full"
        columnClassName="text-left text-[#5D6C87] font-normal py-5"
        rowClassName="border-t pt-8 pb-3"
      />
    </div>
  );
}
