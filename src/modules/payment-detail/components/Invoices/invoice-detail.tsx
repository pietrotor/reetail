import { Trash } from "lucide-react";
import { useState } from "react";

import { OneTimeInvoiceForm } from "./one-time-invoice-form";
import { PaymentTimeLine } from "./payment-time-line";

import { PaymentTermType, TransactionRead, TransactionStatus } from "@/api";
import CenterGradient from "@/assets/gradients/centerGradient";
import { CashDisplay, InfoList } from "@/components/common";
import { DownStairArrowIcon, PdfIcon, PencilIcon } from "@/components/icons";
import StatusBadge from "@/components/status-badge";
import { Button } from "@/components/ui";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { TransactionStatusBadge } from "@/utils/enums";
import { formatDateToString } from "@/utils/formatters";
import { useCurrentUserStore } from "@/store/use-current-user";

type TInvoiceDetailClient = {
  companyName: string;
  address: string;
  email: string;
};

type InvoiceDetailProps = {
  client: TInvoiceDetailClient;
  invoice: TransactionRead;
  setIsOpen: (isOpen: boolean) => void;
};

const gradientColors = {
  [TransactionStatus.Upcoming]: "#e8e8e8",
  [TransactionStatus.Processing]: "#3296FF",
  [TransactionStatus.Completed]: "#1BDE63",
  [TransactionStatus.Overdue]: "#8B0F47",
};

export const InvoiceDetail = ({
  client,
  invoice,
  setIsOpen,
}: InvoiceDetailProps) => {
  const [isOpenEdit, setIsOpenEdit] = useState(false);

  const overdue = invoice.status === TransactionStatus.Overdue;

  const isVariablePayment =
    invoice.payment_term.payment_type === PaymentTermType.Variable;

  const { email: userEmail } = useCurrentUserStore();

  const isTermClient: boolean = userEmail === client.email;

  return (
    <>
      <Dialog open={isOpenEdit} onOpenChange={setIsOpenEdit}>
        <DialogTitle hidden />
        <OneTimeInvoiceForm
          onClose={() => setIsOpenEdit(false)}
          onSubmit={() => {
            setIsOpenEdit(false);
          }}
          invoiceToUpdate={{
            id: invoice.id,
            amount: invoice.amount,
            issuedAt: invoice.issued_at
              ? new Date(invoice.issued_at)
              : undefined,
          }}
        />
      </Dialog>
      <DialogContent>
        <h4 className="text-xl">Invoice Details</h4>
        <div className="flex justify-between items-center">
          <div className="flex flex-col gap-0.5 text-sm">
            <p className="font-medium">From</p>
            <p className="font-medium">{client.companyName}</p>
            <p>{client.address}</p>
            <p>{client.email}</p>
          </div>
          <div className="flex items-end flex-col">
            <p className="text-[40px] truncate max-w-[161px]">{invoice.id}</p>
            <StatusBadge variant={TransactionStatusBadge[invoice.status]} />
          </div>
        </div>
        <div className="relative contract-example-container flex justify-between items-center py-[23px] px-5 h-[104px] rounded-xl overflow-hidden">
          <CenterGradient
            color={gradientColors[invoice.status]}
            className="absolute -z-10"
          />
          <div className="flex justify-center w-full">
            <div className="flex flex-col items-center">
              <CashDisplay
                amount={invoice.amount}
                className="text-2xl"
                decimalClassName="text-lg"
              />
              <div className="flex items-center gap-2 text-sm">
                Due {formatDateToString(invoice.issued_at)}
                {overdue && (
                  <>
                    <div className="w-1 h-1 rounded-full bg-black" />
                    <span className="text-red-600">Paid Late</span>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="bg-gray-100 py-3 px-4 rounded-xl w-full flex justify-between items-center">
          <p className="text-[14px] font-medium">Receiving Account</p>
          <div className="flex items-center">
            <div className="flex items-center gap-1 text-xs">
              <span>Manual Checking</span>
              <div className="w-1 h-1 rounded-full bg-black"></div>
              <span>445898949334</span>
            </div>
          </div>
        </div>
        <p className="font-medium text-xs">INVOICE BREAKDOWN</p>
        <div className="bg-gray-100 py-3 px-4 rounded-xl w-full">
          <InfoList
            label={<p className="font-semibold text-sm">Invoice total</p>}
            value={
              <CashDisplay
                hideDecimal
                amount={[
                  invoice.amount,
                  invoice.payment_term.late_fee || 0,
                  ...(invoice?.invoice_items
                    ? invoice?.invoice_items.map((item) => item.value)
                    : []),
                ].reduce((acc, value) => acc + value, 0)}
                className="text-sm font-semibold"
              />
            }
          />
          <InfoList
            label={
              <p className="text-sm flex items-center gap-0.5">
                <DownStairArrowIcon /> <span>Term</span>
              </p>
            }
            value={
              <CashDisplay
                hideDecimal
                amount={invoice.amount}
                className="text-sm font-normal"
              />
            }
          />
          {overdue && (
            <InfoList
              label={
                <p className="text-sm flex items-center gap-0.5">
                  <DownStairArrowIcon /> <span>Late fee</span>
                </p>
              }
              value={
                <CashDisplay
                  hideDecimal
                  amount={invoice.payment_term.late_fee!}
                  className="text-sm font-normal"
                />
              }
            />
          )}
          {!!invoice?.invoice_items?.length &&
            invoice.invoice_items.map((item) => (
              <InfoList
                key={item.id}
                label={
                  <p className="text-sm flex items-center gap-0.5">
                    <DownStairArrowIcon /> <span>{item.name}</span>
                  </p>
                }
                value={
                  <CashDisplay
                    hideDecimal
                    amount={item.value}
                    className="text-sm font-normal"
                  />
                }
              />
            ))}
        </div>
        <p className="font-medium text-xs">PAYMENT TIMELINE</p>
        <PaymentTimeLine
          createdAt={invoice.created_at!}
          updatedAt={invoice.updated_at!}
          status={invoice.status}
        />
        {invoice.status === TransactionStatus.Upcoming && (
          <div className="mt-4 grid grid-cols-2 gap-2.5">
            <Button
              size={"lg"}
              variant={"secondary"}
              className={`flex items-center gap-2 ${
                isVariablePayment || isTermClient ? "col-span-2" : ""
              }`}
            >
              <PdfIcon width={20} height={20} />
              <span>Download PDF</span>
            </Button>
            {isVariablePayment && !isTermClient && (
              <Button
                size={"lg"}
                variant={"secondary"}
                className="flex items-center gap-2"
                onClick={() => {
                  setIsOpen(false);
                  setIsOpenEdit(true);
                }}
              >
                <PencilIcon />
                <span>Edit</span>
              </Button>
            )}
            {!isTermClient && (
              <Button
                size={"lg"}
                variant={"secondary"}
                className="flex items-center gap-2 text-red-600"
                onClick={() => {
                  setIsOpen(false);
                }}
              >
                <Trash className="fill-red-600" />
                <span>Delete</span>
              </Button>
            )}
          </div>
        )}
      </DialogContent>
    </>
  );
};
