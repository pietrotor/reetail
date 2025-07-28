import {
  GetTransactionsEndpointApiV1TransactionsGetParams,
  HTTPValidationError,
  TransactionRead,
  useGetTransactionsEndpointApiV1TransactionsGet,
} from "@/api";
import { useCallback, useState } from "react";

type UseGetInvoicesPagination = Omit<
  GetTransactionsEndpointApiV1TransactionsGetParams,
  "payment_term_id"
>;

type UseGetInvoicesProps = {
  paymentTermId: string;
  initialPaginationValues?: UseGetInvoicesPagination;
};

type UseGetInvoices = {
  data: TransactionRead[];
  isLoading: boolean;
  error: HTTPValidationError | null;
  isFetching: boolean;
  pagination: UseGetInvoicesPagination;
  updatePagination: (newPagination: Partial<UseGetInvoicesPagination>) => void;
  clearPagination: () => void;
  refreshData: () => void;
};

export const useGetInvoices = ({
  paymentTermId,
  initialPaginationValues,
}: UseGetInvoicesProps): UseGetInvoices => {
  const [pagination, setPagination] = useState<UseGetInvoicesPagination>({
    skip: initialPaginationValues?.skip,
    limit: initialPaginationValues?.limit,
    order_by: initialPaginationValues?.order_by,
    order_direction: initialPaginationValues?.order_direction,
    status: initialPaginationValues?.status,
  });

  const { data, isLoading, error, refetch, isFetching } =
    useGetTransactionsEndpointApiV1TransactionsGet(
      {
        payment_term_id: paymentTermId,
        ...Object.fromEntries(
          Object.entries(pagination).filter(([, value]) => value !== undefined)
        ),
      },
      {
        query: {
          refetchOnWindowFocus: false,
          retry: 2,
        },
      }
    );

  const updatePagination = useCallback(
    (newPagination: Partial<UseGetInvoicesPagination>) => {
      setPagination((prev) => ({
        ...prev,
        ...newPagination,
      }));
    },
    []
  );

  const clearPagination = useCallback(() => {
    setPagination({
      skip: undefined,
      limit: undefined,
      order_by: undefined,
      order_direction: undefined,
      status: undefined,
    });
  }, []);

  const refreshData = useCallback(() => {
    refetch();
  }, [refetch]);

  return {
    data: data || [],
    isLoading,
    error,
    isFetching,

    pagination,
    updatePagination,
    clearPagination,
    refreshData,
  };
};
