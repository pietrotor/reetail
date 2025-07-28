import {
  GetMonthlyMrrEndpointApiV1TransactionsAggregatedMonthlyMrrGet200,
  GetTransactionAggregatedDataClientEndpointApiV1TransactionsAggregatedClientGet200,
  useGetMonthlyMrrEndpointApiV1TransactionsAggregatedMonthlyMrrGet,
  useGetTransactionAggregatedDataClientEndpointApiV1TransactionsAggregatedClientGet,
  useGetTransactionAggregatedDataVendorEndpointApiV1TransactionsAggregatedVendorGet,
} from "@/api";
import { useCurrentUserStore } from "@/store/use-current-user";

type UseInvoicesKPIs = {
  sumData: GetTransactionAggregatedDataClientEndpointApiV1TransactionsAggregatedClientGet200;
  countData: GetTransactionAggregatedDataClientEndpointApiV1TransactionsAggregatedClientGet200;
  monthlyMrrData?: GetMonthlyMrrEndpointApiV1TransactionsAggregatedMonthlyMrrGet200;
  isLoading: boolean;
  isFetching: boolean;
};

const getFirstOrLastDayOfMonth = (neededDay: "first" | "last"): string => {
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth();

  return (
    neededDay === "first"
      ? new Date(year, month, 1)
      : new Date(year, month + 1, 0)
  )
    .toISOString()
    .split("T")[0];
};

export const useInvoicesKPIs = (): UseInvoicesKPIs => {
  const { isClient } = useCurrentUserStore();

  const dateParams = {
    start_date: getFirstOrLastDayOfMonth("first"),
    end_date: getFirstOrLastDayOfMonth("last"),
  };

  const {
    data: clientSumData,
    isLoading: clientSumIsLoading,
    isFetching: clientSumIsFetching,
  } = useGetTransactionAggregatedDataClientEndpointApiV1TransactionsAggregatedClientGet(
    dateParams,
    {
      query: {
        enabled: isClient,
      },
    }
  );

  const {
    data: clientCountData,
    isLoading: clientCountIsLoading,
    isFetching: clientCountIsFetching,
  } = useGetTransactionAggregatedDataClientEndpointApiV1TransactionsAggregatedClientGet(
    {
      ...dateParams,
      aggregation: "count",
    },
    {
      query: {
        enabled: isClient,
      },
    }
  );

  const {
    data: vendorSumData,
    isLoading: vendorSumIsLoading,
    isFetching: vendorSumIsFetching,
  } = useGetTransactionAggregatedDataVendorEndpointApiV1TransactionsAggregatedVendorGet(
    dateParams,
    {
      query: {
        enabled: !isClient,
      },
    }
  );

  const {
    data: vendorCountData,
    isLoading: vendorCountIsLoading,
    isFetching: vendorCountIsFetching,
  } = useGetTransactionAggregatedDataVendorEndpointApiV1TransactionsAggregatedVendorGet(
    {
      ...dateParams,
      aggregation: "count",
    },
    {
      query: {
        enabled: !isClient,
      },
    }
  );

  const {
    data: monthlyMrrData,
    isLoading: monthlyMrrIsLoading,
    isFetching: monthlyMrrIsFetching,
  } = useGetMonthlyMrrEndpointApiV1TransactionsAggregatedMonthlyMrrGet({
    query: {
      enabled: !isClient,
    },
  });

  return {
    sumData: (isClient ? clientSumData : vendorSumData) || {},
    countData: (isClient ? clientCountData : vendorCountData) || {},
    monthlyMrrData: monthlyMrrData,
    isLoading: isClient
      ? clientSumIsLoading || clientCountIsLoading
      : vendorSumIsLoading || vendorCountIsLoading || monthlyMrrIsLoading,
    isFetching: isClient
      ? clientSumIsFetching || clientCountIsFetching
      : vendorSumIsFetching || vendorCountIsFetching || monthlyMrrIsFetching,
  };
};
