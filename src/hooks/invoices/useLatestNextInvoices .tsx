import { useGetInvoices } from "./useGetInvoices";
import { TransactionRead, HTTPValidationError, TransactionStatus } from "@/api";

type UseLatestNextInvoicesReturn = {
  latestInvoice: TransactionRead | null;
  nextInvoice: TransactionRead | null;
  processingInvoice: TransactionRead | null;
  isLoading: boolean;
  error: HTTPValidationError | null;
  isFetching: boolean;
  refreshData: () => void;
};

export const useLatestNextInvoices = (
  paymentTermId: string
): UseLatestNextInvoicesReturn => {
  const latestInvoiceQuery = useGetInvoices({
    paymentTermId,
    initialPaginationValues: {
      skip: 0,
      limit: 1,
      order_by: "issued_at",
      order_direction: "desc",
      status: TransactionStatus.Completed,
    },
  });

  const nextInvoiceQuery = useGetInvoices({
    paymentTermId,
    initialPaginationValues: {
      skip: 0,
      limit: 1,
      order_by: "issued_at",
      order_direction: "asc",
      status: TransactionStatus.Upcoming,
    },
  });

  const processingInvoice = useGetInvoices({
    paymentTermId,
    initialPaginationValues: {
      skip: 0,
      limit: 1,
      order_by: "issued_at",
      order_direction: "asc",
      status: TransactionStatus.Processing,
    },
  });

  const isLoading =
    latestInvoiceQuery.isLoading ||
    nextInvoiceQuery.isLoading ||
    processingInvoice.isLoading;
  const error =
    latestInvoiceQuery.error ||
    nextInvoiceQuery.error ||
    processingInvoice.error;
  const isFetching =
    latestInvoiceQuery.isFetching ||
    nextInvoiceQuery.isFetching ||
    processingInvoice.isFetching;

  const refreshData = () => {
    latestInvoiceQuery.refreshData();
    nextInvoiceQuery.refreshData();
    processingInvoice.refreshData();
  };

  return {
    latestInvoice: latestInvoiceQuery.data[0] || null,
    nextInvoice: nextInvoiceQuery.data[0] || null,
    processingInvoice: processingInvoice.data[0] || null,
    isLoading,
    error,
    isFetching,
    refreshData,
  };
};
