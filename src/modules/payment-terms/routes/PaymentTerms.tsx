import { useState } from "react";

import AuthLayout from "@/components/layouts/AuthLayout";
import { Card, CardFooter } from "@/components/ui/card";
import DashboardHeader from "@/modules/dashboard/components/dashboard-header";
import DashboardTable from "@/modules/dashboard/components/dashboard-table";

const INITIAL_TAB = "pending";

export const PaymentTerms = () => {
  const [currentTab] = useState<"signed" | "pending">(INITIAL_TAB);

  return (
    <AuthLayout>
      <div className="relative flex flex-col w-full h-full">
        <DashboardHeader />
        <div className="p-6 flex flex-col gap-6">
          {currentTab === "pending" && (
            <div className="grid lg:grid-cols-2 grid-cols-1 gap-4">
              <Card className="min-w-[310px] gap-10 p-4 shadow-xl">
                <CardFooter className="justify-between">
                  <p>Pedidos Entregados</p>
                  <p className="text-2xl">1</p>
                </CardFooter>
              </Card>
              <Card className="min-w-[310px] gap-10 p-4 shadow-xl">
                <CardFooter className="justify-between">
                  <p>Pedidos sin procesar</p>
                  <p className="text-2xl">2</p>
                </CardFooter>
              </Card>
            </div>
          )}
          <DashboardTable />
        </div>
      </div>
    </AuthLayout>
  );
};
