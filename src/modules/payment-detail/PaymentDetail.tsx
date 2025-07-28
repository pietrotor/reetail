import { ComponentProps, useMemo, useState } from "react";

import DashboardHeader from "../dashboard/components/dashboard-header";
import {
  AllInvoicesTable,
  BankAccountDetail,
  CustomerDetail,
  NavigationBar,
  PaymentStatus,
  PaymentTerms,
  RecientPayments,
  StakeHolderDetail,
} from "./components";
import { MOCK_PAYMENT_DETAIL } from "./data";

import AuthLayout from "@/components/layouts/AuthLayout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useLatestNextInvoices } from "@/hooks/invoices/useLatestNextInvoices ";
import { useGetPaymentTerm } from "@/hooks/payments/useGetPaymentTerm";
import { useParams } from "react-router";
import EditInvoice from "./components/Invoices/edit-invoice";
import { useCurrentUserStore } from "@/store/use-current-user";

const PaymentDetail = () => {
  const payment = MOCK_PAYMENT_DETAIL;
  const { paymentId } = useParams();

  const { data } = useGetPaymentTerm(paymentId!);

  const { latestInvoice, nextInvoice, processingInvoice } =
    useLatestNextInvoices(paymentId!);

  const { email: userEmail } = useCurrentUserStore();

  const [tab, setTab] = useState("overview");

  const customerInfo: ComponentProps<typeof CustomerDetail>["data"] = useMemo(
    () => ({
      fullName: data?.client?.full_name || "N/A",
      email: data?.client?.email || "N/A",
      company: data?.client?.company_name || "N/A",
      jobTitle: data?.client?.job_title || "N/A",
    }),
    [data]
  );

  const stakeholderInfo: ComponentProps<typeof StakeHolderDetail>["data"] =
    useMemo(
      () => ({
        fullName: data?.vendor?.full_name || "N/A",
        email: data?.vendor?.email || "N/A",
        company: data?.vendor?.company_name || "N/A",
        jobTitle: data?.vendor?.job_title || "N/A",
      }),
      [data]
    );

  const paymentTermData: ComponentProps<typeof PaymentTerms>["data"] = useMemo(
    () => ({
      amount: data?.payment_amount || 0,
      achDiscount: data?.has_ach_discount?.toString() || "N/A",
      paymentType: data?.payment_type || "N/A",
      firstPayment: data?.first_payment_date
        ? new Date(data.first_payment_date).toLocaleDateString("en-US")
        : "N/A",
      latestPayment: latestInvoice?.issued_at
        ? new Date(latestInvoice.issued_at).toLocaleDateString("en-US")
        : undefined,
      nextPayment: nextInvoice?.issued_at
        ? new Date(nextInvoice.issued_at).toLocaleDateString("en-US")
        : "N/A",
      lastPayment: data?.last_payment_date
        ? new Date(data.last_payment_date).toLocaleDateString("en-US")
        : "N/A",
      frequency: data?.payment_frequency || "N/A",
      duration: `${data?.payment_duration} Months` || "N/A",
      lateFee: data?.late_fee || 0,
    }),
    [data, latestInvoice, nextInvoice]
  );

  const isTermVendor: boolean = useMemo(() => {
    return userEmail === data?.vendor?.email;
  }, [userEmail, data?.vendor?.email]);

  return (
    <AuthLayout>
      <div className="relative flex flex-col w-full h-full items-center">
        <DashboardHeader />
        <div className="relative flex flex-col w-full items-center h-[100vh-100px] overflow-y-auto">
          <NavigationBar />
          <div className="w-full items-start p-5 max-w-[71rem]">
            <Tabs defaultValue="overview" value={tab} onValueChange={setTab}>
              <div className="flex justify-between">
                <TabsList className="font-medium border border-white !py-5">
                  {[
                    {
                      value: "overview",
                      label: "Overview",
                    },
                    {
                      value: "invoices",
                      label: "All Invoices",
                    },
                  ].map(({ value, label }, index) => (
                    <TabsTrigger
                      key={index}
                      value={value}
                      className="py-2 px-8 min-w-[124px] font-medium"
                    >
                      {label}
                    </TabsTrigger>
                  ))}
                </TabsList>
                {isTermVendor && (
                  <TabsContent
                    value="invoices"
                    className="w-fit flex justify-end"
                  >
                    <EditInvoice paymentId={paymentId!} />
                  </TabsContent>
                )}
              </div>
              <TabsContent value="overview">
                <div className="w-full grid grid-cols-3 gap-2.5">
                  <div className="flex flex-col gap-2.5">
                    <CustomerDetail data={customerInfo} />
                    <StakeHolderDetail data={stakeholderInfo} />
                    <BankAccountDetail data={payment.bankAccount} />
                  </div>
                  <div className="flex flex-col gap-2.5 col-span-2">
                    {processingInvoice && (
                      <PaymentStatus
                        data={{
                          amount: processingInvoice.amount,
                          setAllInvoices: () => setTab("invoices"),
                        }}
                      />
                    )}
                    <RecientPayments
                      data={{
                        lastPayment: latestInvoice,
                        nextPayment: nextInvoice,
                        client: {
                          address: data?.client?.address || "",
                          companyName: data?.client?.company_name || "",
                          email: data?.client?.email || "",
                        },
                      }}
                    />
                    <PaymentTerms data={paymentTermData} />
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="invoices">
                <AllInvoicesTable
                  clientData={{
                    address: data?.client?.address || "",
                    companyName: data?.client?.company_name || "",
                    email: data?.client?.email || "",
                  }}
                />
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </AuthLayout>
  );
};

export { PaymentDetail };
