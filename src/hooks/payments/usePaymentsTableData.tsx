import { useCallback, useMemo, useState } from "react";

import {
  GetPaymentTermsByVendorEndpointApiV1PaymentTermsGetParams,
  HTTPValidationError,
  PaymentTermRead,
  PaymentTermStatus,
  useGetPaymentTermsByVendorEndpointApiV1PaymentTermsGet,
} from "@/api";
import { useCurrentUserStore } from "@/store/use-current-user";

type PaymentsTableFilters = {
  status?: PaymentTermStatus;
};

interface UsePaymentsTableData {
  data: PaymentTermRead[];
  isLoading: boolean;
  error: HTTPValidationError | null;
  isFetching: boolean;

  filters: PaymentsTableFilters;
  updateFilters: (newFilters: Partial<PaymentsTableFilters>) => void;
  clearFilters: () => void;

  refreshData: () => void;
}

export const usePaymentsTableData = (
  initialFilters: PaymentsTableFilters
): UsePaymentsTableData => {
  const { isClient } = useCurrentUserStore();

  const [filters, setFilters] = useState<PaymentsTableFilters>({
    status: undefined,
    ...initialFilters,
  });

  const apiParams = useMemo<
    GetPaymentTermsByVendorEndpointApiV1PaymentTermsGetParams | undefined
  >(() => {
    const params: GetPaymentTermsByVendorEndpointApiV1PaymentTermsGetParams =
      {};

    if (filters.status) {
      params.status = filters.status;
    }

    return params;
  }, [filters]);

  const { data, isLoading, error, refetch, isFetching } =
    useGetPaymentTermsByVendorEndpointApiV1PaymentTermsGet(
      {
        ...apiParams,
        isClient: isClient,
      },
      {
        query: {
          refetchOnWindowFocus: false,
          retry: 2,
        },
      }
    );

  const updateFilters = useCallback(
    (newFilters: Partial<PaymentsTableFilters>) => {
      setFilters((prev) => ({
        ...prev,
        ...newFilters,
      }));
    },
    []
  );

  const clearFilters = useCallback(() => {
    setFilters({
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

    filters,
    updateFilters,
    clearFilters,

    refreshData,
  };
};
