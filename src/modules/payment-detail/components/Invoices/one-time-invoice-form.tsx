import { Check, PlusIcon, Trash } from "lucide-react";
import React, { useEffect, useMemo, useState } from "react";

import {
  TransactionStatus,
  useCreateTransactionEndpointApiV1TransactionsPost,
  useUpdateTransactionEndpointApiV1TransactionsTransactionIdPut,
} from "@/api";
import CalendarIcon from "@/assets/icons/calendar-icon";
import { CashDisplay, DatePicker, InfoList } from "@/components/common";
import FormInput from "@/components/form-input";
import { DownStairArrowIcon, PencilIcon } from "@/components/icons";
import StatusBadge from "@/components/status-badge";
import { Button } from "@/components/ui";
import { DialogContent } from "@/components/ui/dialog";
import { toast } from "sonner";

type InvoiceToUpdate = {
  id: string;
  amount: number;
  issuedAt: Date | undefined;
};

type OneTimeInvoiceFormProps = {
  onClose: () => void;
  onSubmit?: () => void;
  paymentTermId?: string;
  invoiceToUpdate?: InvoiceToUpdate;
};

type OneTimeInvoiceState = {
  dueDate: Date | undefined;

  invoiceDetail: {
    feeName: string;
    amount: number;
    isConfirmed: boolean;
  }[];
  accountId: string;
};

const initialState: Omit<OneTimeInvoiceState, "isOpen"> = {
  dueDate: undefined,
  invoiceDetail: [
    {
      amount: 0,
      feeName: "",
      isConfirmed: false,
    },
  ],
  accountId: "",
};

export const OneTimeInvoiceForm: React.FC<OneTimeInvoiceFormProps> = ({
  onClose,
  paymentTermId,
  invoiceToUpdate,
}) => {
  const [additionalTime, setAdditionalTime] = React.useState<
    string | undefined
  >(undefined);

  const [contractState, setFormData] = useState(initialState);

  const handleChangeDate = (date: Date | undefined) => {
    setFormData({ ...contractState, dueDate: date });
  };

  const handleConfirmFee = (index: number) => {
    if (
      (!contractState.invoiceDetail[index].feeName ||
        !contractState.invoiceDetail[index].amount) &&
      !contractState.invoiceDetail[index].isConfirmed
    )
      return;
    const newInvoiceDetail = [...contractState.invoiceDetail];
    newInvoiceDetail[index] = {
      ...contractState.invoiceDetail[index],
      isConfirmed: !contractState.invoiceDetail[index].isConfirmed,
    };

    setFormData({ ...contractState, invoiceDetail: newInvoiceDetail });
  };

  const handleRemoveFee = (index: number) => {
    const newInvoiceDetail = [...contractState.invoiceDetail];
    newInvoiceDetail.splice(index, 1);
    setFormData({ ...contractState, invoiceDetail: newInvoiceDetail });
  };

  const handleChangeFeeName = (index: number, feeName: string) => {
    const newInvoiceDetail = [...contractState.invoiceDetail];
    newInvoiceDetail[index] = {
      ...contractState.invoiceDetail[index],
      feeName,
    };
    setFormData({ ...contractState, invoiceDetail: newInvoiceDetail });
  };

  const handleChangeAmount = (index: number, amount: string) => {
    if (isNaN(Number(amount))) return;
    const newInvoiceDetail = [...contractState.invoiceDetail];
    newInvoiceDetail[index] = {
      ...contractState.invoiceDetail[index],
      amount: Number(amount),
    };
    setFormData({ ...contractState, invoiceDetail: newInvoiceDetail });
  };

  const total = useMemo(() => {
    const value = contractState.invoiceDetail.reduce((acc, curr) => {
      if (curr.isConfirmed) return acc + curr.amount;
      return acc;
    }, 0);

    return value;
  }, [contractState.invoiceDetail]);

  const clearForm = () => setFormData(initialState);

  const handleClose = () => {
    onClose();
    clearForm();
  };

  const handleChangeDateAndUpdate = (value: number | string | undefined) => {
    setAdditionalTime(value?.toString());

    if (value === "Custom") return;

    if (value === undefined) {
      setFormData({
        ...contractState,
        dueDate: undefined,
      });
      return;
    }

    const newDate = new Date(invoiceToUpdate?.issuedAt!);
    newDate.setDate(newDate.getDate() + +value);

    setFormData({
      ...contractState,
      dueDate: newDate,
    });
  };

  useEffect(() => {
    if (!invoiceToUpdate) return;
    setFormData({
      ...contractState,
      invoiceDetail: [
        { amount: invoiceToUpdate.amount, feeName: "Term", isConfirmed: true },
      ],
    });
  }, []);

  const updateInvoice =
    useUpdateTransactionEndpointApiV1TransactionsTransactionIdPut({
      mutation: {
        onError: () => {
          toast.error(`Error updating invoice`);
        },
        onSuccess: () => {
          toast.success("Invoice updated successfully");
          handleClose();
        },
      },
    });

  const handleUpdateInvoice = () => {
    const payload = {
      issued_at: contractState.dueDate?.toISOString() || undefined,
      amount: total !== invoiceToUpdate?.amount ? total : undefined,
    };

    updateInvoice.mutate({
      data: Object.fromEntries(
        Object.entries(payload).filter(([_, value]) => value !== undefined)
      ),
      transactionId: invoiceToUpdate?.id!,
    });
  };

  const createInvoice = useCreateTransactionEndpointApiV1TransactionsPost({
    mutation: {
      onError: () => {
        toast.error("Error creating invoice");
      },
      onSuccess: () => {
        toast.success("Invoice created successfully");
        handleClose();
      },
    },
  });

  const handleCreateInvoice = () => {
    createInvoice.mutate({
      data: {
        payment_term_id: paymentTermId!,
        issued_at: contractState.dueDate?.toISOString() || undefined,
        amount: total,
        currency: "USD",
        status: TransactionStatus.Upcoming,
      },
    });
  };

  return (
    <DialogContent>
      <h4 className="flex text-xl items-center gap-2">
        {!invoiceToUpdate ? "Add One-Time Invoice" : "Edit Invoice"}
        {invoiceToUpdate && (
          <span className="text-base text-[#12121280] !w-[120px] truncate">
            {invoiceToUpdate.id}
          </span>
        )}
      </h4>
      <div className="flex items-center justify-between">
        <h6 className="text-xs font-medium">INVOICE DETAILS</h6>
        <StatusBadge variant="pending" />
      </div>
      <div className="flex flex-col gap-1.5">
        <div className="bg-gray-100 py-3 px-4 rounded-xl w-full flex flex-col items-center text-sm gap-3">
          <div className="flex justify-between w-full items-center">
            <p className="font-semibold">Due date</p>
            <DatePicker
              value={contractState.dueDate || invoiceToUpdate?.issuedAt}
              onChange={handleChangeDate}
              valueFormat="LLL d, yyyy"
              className="!bg-white !py-0 max-h-[38px]"
              disabled={!!invoiceToUpdate && additionalTime !== "Custom"}
            />
          </div>
          {invoiceToUpdate && (
            <div className="flex flex-col w-full gap-3">
              <p>
                Give Stark more time to process the invoice with then new date?
              </p>
              <div className="flex gap-2 w-full">
                {[
                  {
                    label: "No",
                    value: undefined,
                  },
                  {
                    label: "3 Days",
                    value: 3,
                  },
                  {
                    label: "7 days",
                    value: 7,
                  },
                  {
                    label: (
                      <>
                        <span>Custom</span>
                        <CalendarIcon className="!w-[18px] !h-[18px]" />
                      </>
                    ),
                    value: "Custom",
                  },
                ].map(({ label, value }, idx) => (
                  <button
                    key={idx}
                    className={`flex items-center justify-center gap-1 w-full !rounded-sm cursor-pointer ${
                      additionalTime == value
                        ? "confirm-button"
                        : "py-2 px-[17px] bg-white"
                    }`}
                    onClick={() => handleChangeDateAndUpdate(value)}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
        <div className="bg-gray-100 py-4 px-4 rounded-xl w-full flex flex-col gap-1">
          <InfoList
            label={<p className="text-sm font-semibold">Invoice total</p>}
            value={
              <CashDisplay
                amount={total}
                className="text-base"
                decimalClassName="text-xs"
              />
            }
          />
          <div className="flex flex-col gap-1.5">
            {contractState.invoiceDetail.map(
              ({ amount, feeName, isConfirmed }, idx) => (
                <div className="flex items-center gap-2" key={idx}>
                  <DownStairArrowIcon />
                  {isConfirmed ? (
                    <InfoList
                      label={<p className="text-sm capitalize">{feeName}</p>}
                      value={
                        <div className="flex gap-2">
                          <CashDisplay
                            amount={amount}
                            decimalClassName="text-xs"
                          />
                          <div
                            className="flex items-center"
                            onClick={() => handleConfirmFee(idx)}
                          >
                            <PencilIcon fill="red" fillOpacity={0.5} />
                          </div>
                        </div>
                      }
                    />
                  ) : (
                    <>
                      <div className="flex-1 grid grid-cols-2 gap-2">
                        <FormInput
                          placeholder="Add fee name"
                          containerClassName="col-span-1"
                          className="!bg-white !h-10"
                          value={feeName}
                          onChange={(e) =>
                            handleChangeFeeName(idx, e.target.value)
                          }
                        />
                        <FormInput
                          placeholder="00.00"
                          containerClassName="col-span-1"
                          className="!bg-white !h-10"
                          value={amount}
                          onChange={(e) =>
                            handleChangeAmount(idx, e.target.value)
                          }
                        />
                      </div>
                      <Button
                        variant="secondary"
                        className="!h-full bg-white !px-3"
                        disabled={contractState.invoiceDetail.length === 1}
                        onClick={() => handleRemoveFee(idx)}
                      >
                        <Trash className="fill-red-600 text-red-600" />
                      </Button>
                      <Button
                        onClick={() => handleConfirmFee(idx)}
                        variant="secondary"
                        className="!h-full bg-white !px-3"
                      >
                        <Check />
                      </Button>
                    </>
                  )}
                </div>
              )
            )}
            <div className="flex items-center gap-2 mt-2">
              <DownStairArrowIcon />
              <Button
                className="!bg-white flex items-center justify-center flex-1 h-auto py-3"
                variant={"secondary"}
                onClick={() => {
                  setFormData({
                    ...contractState,
                    invoiceDetail: [
                      ...contractState.invoiceDetail,
                      { amount: 0, feeName: "", isConfirmed: false },
                    ],
                  });
                }}
              >
                <PlusIcon />
                <span>Add invoice item</span>
              </Button>
            </div>
          </div>
        </div>
        <div className="bg-gray-100 py-4 px-4 rounded-xl w-full flex gap-1 items-center justify-between text-sm">
          <p className="font-medium">Receiving Account</p>
          <div className="flex items-center gap-1 text-xs">
            <span>Manual Checking</span>
            <div className="w-1 h-1 rounded-full bg-black"></div>
            <span>445898949334</span>
          </div>
        </div>
        {!invoiceToUpdate ? (
          <div className="w-full grid grid-cols-2 gap-3 mt-4">
            <Button variant={"secondary"} onClick={handleClose}>
              Cancel
            </Button>
            <Button
              onClick={handleCreateInvoice}
              disabled={total === 0 || !contractState.dueDate}
            >
              Create Invoice
            </Button>
          </div>
        ) : (
          <Button onClick={handleUpdateInvoice} disabled={total === 0}>
            Save
          </Button>
        )}
      </div>
    </DialogContent>
  );
};
