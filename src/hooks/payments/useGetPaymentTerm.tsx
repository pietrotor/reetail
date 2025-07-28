import {
  HTTPValidationError,
  PaymentTermRead,
  useGetPaymentTermEndpointApiV1PaymentTermsPaymentTermIdGet,
} from "@/api";

interface UseGetPaymentTerm {
  data?: PaymentTermRead,
  isLoading: boolean;
  error: HTTPValidationError | null;
}

export const useGetPaymentTerm = (id: string): UseGetPaymentTerm => {
  const { data, isLoading, error } =
    useGetPaymentTermEndpointApiV1PaymentTermsPaymentTermIdGet(id, {
      query: {
        refetchOnWindowFocus: false,
        retry: 2,
      },
    });

  return {
    data,
    isLoading,
    error,
  };
};
