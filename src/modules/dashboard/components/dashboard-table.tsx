import { ChevronRight } from "lucide-react";
import { ComponentProps, useMemo } from "react";
import { Link } from "react-router";

import StatusBadge from "@/components/status-badge";
import Table from "@/components/table";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { usePaymentsTableData } from "@/hooks/payments/usePaymentsTableData";
import { formatCurrency, formatDateToString } from "@/utils/formatters";
import { PaymentTermStatusBadge } from "@/utils/enums";
import { useCurrentUserStore } from "@/store/use-current-user";

export default function DashboardTable() {
  const { isClient } = useCurrentUserStore();

  const {
    data,
    isLoading,
    isFetching,
    // error,
    // filters,
    updateFilters,
    // clearFilters,
    // refreshData,
  } = usePaymentsTableData({ status: "Processing" });

  // const handleStatusChange = (status: PaymentTermStatus) => {
  //   updateFilters({ status: status || undefined });
  // };

  // const handleClearFilters = () => {
  //   clearFilters();
  // };

  const columns = useMemo<ComponentProps<typeof Table>["columns"]>(
    () => [
      {
        value: !isClient ? "Client" : "Vendor",
      },
      {
        value: "Status",
      },
      {
        value: "Item/Invoice",
      },
      {
        value: "Contract Duration",
      },
      {
        value: "Amount",
      },
      {
        value: "",
      },
    ],
    [isClient]
  );

  const rows = useMemo<ComponentProps<typeof Table>["rows"]>(() => {
    return (
      data?.map((item) => [
        {
          value: (
            <div className="flex flex-col">
              <span>{!isClient ? item.name : item.vendor?.full_name}</span>
              <span className="text-xs text-[#767676]">
                {!isClient ? item.email : item.vendor?.email}
              </span>
            </div>
          ),
        },
        {
          value: (
            <StatusBadge
              variant={PaymentTermStatusBadge[item.status!]}
              size="md"
            />
          ),
        },
        {
          value: "N/A",
        },
        {
          value: (
            <div className="flex flex-col">
              <span>{item.payment_duration} mo. remaining</span>
              <span className="text-xs text-[#767676]">{`${formatDateToString(
                item.first_payment_date
              )}${
                item.last_payment_date
                  ? ` - ${formatDateToString(item.last_payment_date)}`
                  : ""
              }`}</span>
            </div>
          ),
        },
        {
          value: (() => {
            const formattedValue = formatCurrency({
              value: item.payment_amount,
            }).split(".");
            return (
              <p className="font-semibold">
                {formattedValue[0]}
                <span className="text-xs text-[#29292980]">
                  .{formattedValue[1]}
                </span>
              </p>
            );
          })(),
        },
        {
          value: (
            <Link to={`/payment/${item.id}`}>
              <ChevronRight className="text-[#5D6C87] cursor-pointer" />
            </Link>
          ),
        },
      ]) || []
    );
  }, [data]);

  return (
    <div className="flex flex-col w-full gap-6">
      <h1 className="text-[21px]">Payments</h1>
      <Tabs defaultValue="live" className="">
        <TabsList className="font-medium border border-white !py-5">
          {[
            {
              value: "live",
              label: "Live",
              onClick: () => updateFilters({ status: "Processing" }),
            },
            {
              value: "Expired",
              label: "Expired",
              onClick: () => updateFilters({ status: "Expired" }),
            },
          ].map(({ value, label, onClick }, index) => (
            <TabsTrigger
              key={index}
              value={value}
              className="py-2 px-8 min-w-[124px] font-medium"
              onClick={onClick}
            >
              {label}
            </TabsTrigger>
          ))}
        </TabsList>
        <Table
          columns={columns}
          rows={rows}
          isLoading={isLoading || isFetching}
          className="text-sm w-full"
          columnClassName="text-left text-[#5D6C87] font-normal py-5"
          rowClassName="border-t pt-8 pb-3"
        />
      </Tabs>
    </div>
  );
}
