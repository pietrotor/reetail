import { PaymentTermStatus, TransactionStatus } from "@/api";
import { TPaymentStatus } from "@/components/status-badge";

export const PaymentTermStatusBadge: Record<PaymentTermStatus, TPaymentStatus> =
  {
    [PaymentTermStatus.Pending]: "pending",
    [PaymentTermStatus.Signed]: "completed",
    [PaymentTermStatus.Processing]: "processing",
    [PaymentTermStatus.Expired]: "overdue",
  };

export const TransactionStatusBadge: Record<TransactionStatus, TPaymentStatus> =
  {
    [TransactionStatus.Processing]: "processing",
    [TransactionStatus.Overdue]: "overdue",
    [TransactionStatus.Upcoming]: "pending",
    [TransactionStatus.Completed]: "completed",
  };
