import { ComponentProps } from "react";

import DashboardCard from "./components/dashboard-card";
import DashboardChart from "./components/dashboard-chart";
import DashboardHeader from "./components/dashboard-header";
import DashboardTable from "./components/dashboard-table";

import { TransactionStatus } from "@/api";
import AuthLayout from "@/components/layouts/AuthLayout";
import { useInvoicesKPIs } from "@/hooks/invoices/useInvoicesKPIs";
import { useCurrentUserStore } from "@/store/use-current-user";

export function Dashboard() {
  const { isClient } = useCurrentUserStore();
  const { sumData, countData, monthlyMrrData } = useInvoicesKPIs();

  return (
    //Move layout to higher level if needed
    <AuthLayout>
      <div className="relative flex flex-col w-full h-full items-center">
        <DashboardHeader />
        <div className="flex flex-col w-full items-start p-5 gap-10 h-[100vh-100px] overflow-y-auto">
          <div className="flex gap-3 w-full">
            <div className="grid grid-cols-2 gap-3 min-w-fit w-full">
              {[
                {
                  status: "pending",
                  value: sumData[TransactionStatus.Upcoming] || 0,
                  invoicesNumber: countData[TransactionStatus.Upcoming] || 0,
                },
                {
                  status: "processing",
                  value: sumData[TransactionStatus.Processing] || 0,
                  invoicesNumber: countData[TransactionStatus.Processing] || 0,
                },
                {
                  status: "overdue",
                  value: sumData[TransactionStatus.Overdue] || 0,
                  invoicesNumber: countData[TransactionStatus.Overdue] || 0,
                },
                {
                  status: "completed",
                  value: sumData[TransactionStatus.Completed] || 0,
                  invoicesNumber: countData[TransactionStatus.Completed] || 0,
                },
              ].map(({ status, value, invoicesNumber }, i) => (
                <DashboardCard
                  key={i}
                  value={value}
                  status={
                    status as ComponentProps<typeof DashboardCard>["status"]
                  }
                  invoicesNumber={invoicesNumber}
                />
              ))}
            </div>
            {!isClient && monthlyMrrData && (
              <DashboardChart data={monthlyMrrData} />
            )}
          </div>

          <DashboardTable />
        </div>
      </div>
    </AuthLayout>
  );
}
