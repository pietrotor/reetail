import { DownloadIcon } from "lucide-react";
import { ComponentProps, useMemo, useState } from "react";
import { Link } from "react-router";

import { CashDisplay } from "@/components/common";
import { DocumentIcon, EditIcon } from "@/components/icons";
import AuthLayout from "@/components/layouts/AuthLayout";
import StatusBadge from "@/components/status-badge";
import Table from "@/components/table";
import { Card, CardFooter } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { usePaymentsTableData } from "@/hooks/payments/usePaymentsTableData";
import DashboardHeader from "@/modules/dashboard/components/dashboard-header";
import { useCurrentUserStore } from "@/store/use-current-user";
import { formatCurrency, formatDateToString } from "@/utils/formatters";

const INITIAL_TAB = "pending";

export const PaymentTerms = () => {
  const [currentTab, setCurrentTab] = useState<"signed" | "pending">(
    INITIAL_TAB
  );
  const { isClient } = useCurrentUserStore();
  const { data, isLoading, isFetching, updateFilters } = usePaymentsTableData({
    status: "Pending",
  });

  const columns = useMemo<ComponentProps<typeof Table>["columns"]>(
    () => [
      {
        value: !isClient ? "Client" : "Vendor",
      },
      {
        value: "Document PDF",
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
            <div className="flex flex-row gap-1">
              <DocumentIcon />
              <p>{item.contract_file?.split("/")?.pop() || "Unnamed.pdf"}</p>
            </div>
          ),
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
            <div className="flex gap-2 items-center">
              <button
                type="button"
                className="appearance-none p-2 rounded bg-white text-black cursor-pointer"
                onClick={() => {
                  window.open(
                    `${import.meta.env.VITE_BACKEND_URL}/static/${
                      item.contract_file
                    }`,
                    "_blank"
                  );
                }}
              >
                <DownloadIcon className="w-4 h-4" />
              </button>
              <Link
                to={`/payment/${item.id}`}
                className="p-2 rounded bg-white text-black cursor-pointer"
              >
                <EditIcon
                  className="w-4 h-4 !fill-black"
                  color="currentColor"
                />
              </Link>
            </div>
          ),
        },
      ]) || []
    );
  }, [data, isClient]);

  return (
    <AuthLayout>
      <div className="relative flex flex-col w-full h-full">
        <DashboardHeader />
        <div className="p-6 flex flex-col gap-6">
          <h1 className="text-[21px] text-left">Payment Terms</h1>
          {currentTab === "pending" && (
            <div className="grid lg:grid-cols-2 grid-cols-1 gap-4">
              <Card className="min-w-[310px] gap-10 p-4 shadow-xl">
                <CardFooter className="justify-between">
                  <p>Pending contracts</p>
                  <p className="text-2xl">{data?.length || 0}</p>
                </CardFooter>
              </Card>
              <Card className="min-w-[310px] gap-10 p-4 shadow-xl">
                <CardFooter className="justify-between">
                  <StatusBadge variant="pendingOrange" />
                  <p className="text-2xl">
                    <CashDisplay
                      amount={data?.reduce(
                        (acc, item) => acc + item.payment_amount,
                        0
                      )}
                      decimalClassName="text-sm"
                    />
                  </p>
                </CardFooter>
              </Card>
            </div>
          )}
          <Tabs defaultValue="pending" className="">
            <TabsList className="font-medium border border-white !py-5">
              {[
                {
                  value: "approved",
                  label: "Approved",
                  onClick: () => {
                    updateFilters({ status: "Processing" });
                    setCurrentTab("signed");
                  },
                },
                {
                  value: "pending",
                  label: "Pending",
                  onClick: () => {
                    updateFilters({ status: "Pending" });
                    setCurrentTab("pending");
                  },
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
      </div>
    </AuthLayout>
  );
};
