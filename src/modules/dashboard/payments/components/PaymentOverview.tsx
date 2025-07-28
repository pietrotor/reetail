import { ChevronLeft } from "lucide-react";
import { useSearchParams } from "react-router";

import CustomerDetails from "./CustomerDetails";
import LastPayment from "./LastPayment";
import NextPayment from "./NextPayment";
import PaymentTerms from "./PaymentTerms";
import ProcessingPayments from "./ProcessingPayments";
import ReceivingBankAccount from "./ReceivingBankAccount";
import StakeholderDetails from "./StakeholderDetails";
import DashboardHeader from "../../components/dashboard-header";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import Layout from "@/routes/layout";

const PAYMENT_OVERVIEW_TABS = [
  {
    value: "overview",
    label: "Overview",
  },
  {
    value: "invoices",
    label: "All Invoices",
  },
];

export default function PaymentOverview() {
  const [searchParams] = useSearchParams();
  const defaultTab = searchParams.get("tab") || "overview";

  return (
    <>
      <div className="relative flex flex-col w-full h-full items-center">
        <DashboardHeader />
        <div className="flex flex-col w-full items-start max-w-[71rem]">
          <div className="w-full bg-[#EBEBEC] py-3 px-2">
            <div className="flex items-center gap-4">
              <button className="flex bg-[#FFFFFF] justify-center items-center rounded-[6px] py-2 px-[17px] gap-[3px] shadow-[22px_31px_15px_rgba(107,107,107,0.01),12px_17px_13px_rgba(107,107,107,0.05),5px_8px_9px_rgba(107,107,107,0.09),1px_2px_5px_rgba(107,107,107,0.1)]">
                <ChevronLeft strokeWidth={1.2} size={22} /> Go back
              </button>
              <h1>Stark</h1>
              <div className="bg-[#1bd1331a] text-[#097E34] ml-auto py-2 px-6 rounded-full">
                Active term
              </div>
            </div>
          </div>

          <Tabs defaultValue={defaultTab} className="py-5 px-5 w-full">
            <TabsList className="font-medium border border-white !py-5">
              {PAYMENT_OVERVIEW_TABS.map(({ value, label }, index) => (
                <TabsTrigger
                  key={index}
                  value={value}
                  className="py-2 px-8 min-w-[124px] font-medium"
                >
                  {label}
                </TabsTrigger>
              ))}
            </TabsList>
            <TabsContent value="overview">
              <div className="w-full grid grid-cols-[repeat(3,1fr)] grid-rows-[repeat(3,min-content)] grid-flow-col gap-x-2.5 gap-y-2.5 pt-5">
                <CustomerDetails />
                <StakeholderDetails />
                <ReceivingBankAccount />
                <div className="w-full row-span-3 col-span-2 grid grid-cols-[repeat(2,1fr)] grid-rows-[repeat(2,min-content)_1fr] gap-x-2.5 gap-y-2.5">
                  <div className="col-span-2">
                    <ProcessingPayments />
                  </div>
                  <LastPayment />
                  <NextPayment />
                  <div className="col-span-2">
                    <PaymentTerms />
                  </div>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="invoices"></TabsContent>
          </Tabs>
        </div>
      </div>
    </>
  );
}
